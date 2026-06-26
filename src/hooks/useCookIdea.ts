import { useMemo, useReducer, useState } from 'react';
import { allIngredients, catalystIngredients } from '../data/mockIngredients';
import type { CookingLogItem, CookingStage, HeatLevel, Ingredient, MaturityScore, Recipe, SavedRecipe } from '../types';
import { findIngredientById, uniqueIngredients } from '../utils/ingredientHelpers';
import { generateCookIdea } from '../utils/recipeGenerator';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';

type CookState = {
  potIngredients: Ingredient[];
  heatLevel: HeatLevel;
  isCooking: boolean;
  stage: CookingStage;
  status: string;
  cookingLogs: CookingLogItem[];
  recipes: Recipe[];
  maturity: MaturityScore | null;
  visibleCatalysts: Ingredient[];
  history: Ingredient[][];
};

type CookAction =
  | { type: 'ADD_INGREDIENT'; ingredient: Ingredient }
  | { type: 'ADD_MANY'; ingredients: Ingredient[] }
  | { type: 'UNDO' }
  | { type: 'CLEAR' }
  | { type: 'SET_HEAT'; heatLevel: HeatLevel }
  | { type: 'COOK_START' }
  | { type: 'SET_STAGE'; stage: CookingStage; status: string }
  | { type: 'ADD_CATALYSTS'; ingredients: Ingredient[] }
  | { type: 'COOK_DONE'; recipes: Recipe[]; logs: CookingLogItem[]; maturity: MaturityScore }
  | { type: 'COOK_STOP' };

const initialState: CookState = {
  potIngredients: [],
  heatLevel: 'medium',
  isCooking: false,
  stage: 'idle',
  status: '',
  cookingLogs: [],
  recipes: [],
  maturity: null,
  visibleCatalysts: [],
  history: [],
};

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function cookReducer(state: CookState, action: CookAction): CookState {
  switch (action.type) {
    case 'ADD_INGREDIENT': {
      if (state.potIngredients.some((item) => item.id === action.ingredient.id)) return state;
      return {
        ...state,
        potIngredients: [...state.potIngredients, action.ingredient],
        history: [...state.history, state.potIngredients],
      };
    }
    case 'ADD_MANY': {
      const next = uniqueIngredients([...state.potIngredients, ...action.ingredients]);
      if (next.length === state.potIngredients.length) return state;
      return { ...state, potIngredients: next, history: [...state.history, state.potIngredients] };
    }
    case 'UNDO': {
      const previous = state.history.at(-1);
      if (!previous) return state;
      return { ...state, potIngredients: previous, history: state.history.slice(0, -1), recipes: [], maturity: null };
    }
    case 'CLEAR':
      return { ...state, potIngredients: [], recipes: [], maturity: null, status: '', stage: 'idle', cookingLogs: [], history: [] };
    case 'SET_HEAT':
      return { ...state, heatLevel: action.heatLevel };
    case 'COOK_START':
      return { ...state, isCooking: true, recipes: [], maturity: null, cookingLogs: [], stage: 'identify' };
    case 'SET_STAGE':
      return { ...state, stage: action.stage, status: action.status };
    case 'ADD_CATALYSTS': {
      return {
        ...state,
        potIngredients: uniqueIngredients([...state.potIngredients, ...action.ingredients]),
        visibleCatalysts: uniqueIngredients([...state.visibleCatalysts, ...action.ingredients]),
      };
    }
    case 'COOK_DONE':
      return {
        ...state,
        isCooking: false,
        stage: 'done',
        status: '创意出锅完成。',
        recipes: action.recipes,
        cookingLogs: action.logs,
        maturity: action.maturity,
      };
    case 'COOK_STOP':
      return { ...state, isCooking: false };
    default:
      return state;
  }
}

export function useCookIdea() {
  const [state, dispatch] = useReducer(cookReducer, initialState);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<SavedRecipe[]>('cookidea:favorites', []);
  const [favoriteIngredients, setFavoriteIngredients] = useLocalStorage<Ingredient[]>('cookidea:favorite-ingredients', []);
  const [recentIngredients, setRecentIngredients] = useLocalStorage<Ingredient[]>('cookidea:recent-ingredients', []);
  const toast = useToast();

  const visibleCatalysts = useMemo(
    () => catalystIngredients.filter((item) => state.visibleCatalysts.some((visible) => visible.id === item.id)),
    [state.visibleCatalysts],
  );

  const addIngredient = (ingredient: Ingredient) => {
    if (state.isCooking) return toast.pushToast('厨师正在翻锅，稍等这一轮出锅再加料。', 'warning');
    if (state.potIngredients.some((item) => item.id === ingredient.id)) {
      toast.pushToast('这份食材已经在锅里了，味道够足。', 'info');
      return;
    }
    setRecentIngredients((current) => [ingredient, ...current.filter((item) => item.id !== ingredient.id)].slice(0, 24));
    dispatch({ type: 'ADD_INGREDIENT', ingredient });
  };

  const addMany = (ingredients: Ingredient[]) => {
    if (state.isCooking) return;
    setRecentIngredients((current) => uniqueIngredients([...ingredients, ...current]).slice(0, 24));
    dispatch({ type: 'ADD_MANY', ingredients });
  };

  const randomAdd = () => {
    const available = allIngredients.filter((item) => !state.potIngredients.some((selected) => selected.id === item.id));
    const count = state.potIngredients.length === 0 ? 4 : 2 + Math.floor(Math.random() * 3);
    addMany([...available].sort(() => Math.random() - 0.5).slice(0, count));
    toast.pushToast(state.potIngredients.length === 0 ? '先帮你开个脑洞，已经下锅。' : '随机加料完成，锅里更香了。', 'success');
  };

  const undo = () => {
    if (state.history.length === 0) {
      toast.pushToast('还没有可以撤回的下锅动作。', 'info');
      return;
    }
    dispatch({ type: 'UNDO' });
  };

  const clear = () => {
    dispatch({ type: 'CLEAR' });
    toast.pushToast('锅已经洗干净，等下一份灵感。', 'info');
  };

  const cook = async () => {
    if (state.isCooking) return;
    if (state.potIngredients.length === 0) {
      toast.pushToast('锅里还空空的，先放点灵感进去吧。', 'warning');
      return;
    }
    if (state.potIngredients.length < 2) {
      toast.pushToast('这道菜还缺点食材，再加一点会更香。', 'warning');
    }

    const baseIngredients = state.potIngredients;
    const result = generateCookIdea(baseIngredients, state.heatLevel);

    dispatch({ type: 'COOK_START' });
    dispatch({ type: 'SET_STAGE', stage: 'identify', status: '正在识别你的核心优势……' });
    await sleep(760);
    dispatch({ type: 'SET_STAGE', stage: 'gap', status: '正在检查缺少的关键能力……' });
    await sleep(850);
    dispatch({
      type: 'SET_STAGE',
      stage: 'seasoning',
      status: `正在加入辅助调料：${result.recommendedCatalysts.map((item) => item.name).join('、')}……`,
    });
    dispatch({ type: 'ADD_CATALYSTS', ingredients: result.recommendedCatalysts });
    await sleep(940);
    dispatch({ type: 'SET_STAGE', stage: 'compose', status: '正在组合可落地的创意菜谱……' });
    await sleep(1050);
    dispatch({ type: 'COOK_DONE', recipes: result.recipes, logs: result.logs, maturity: result.maturity });
    toast.pushToast('创意出锅完成，三份菜谱已经摆盘。', 'success');
  };

  const saveRecipe = (recipe?: Recipe) => {
    const target = recipe ?? state.recipes[0];
    if (!target) {
      toast.pushToast('还没有菜谱可以保存，先翻炒一轮吧。', 'warning');
      return;
    }
    const saved: SavedRecipe = {
      ...target,
      savedAt: new Date().toISOString(),
      savedHeat: state.heatLevel,
    };
    setFavorites((current) => {
      if (current.some((item) => item.id === saved.id)) return current;
      return [saved, ...current];
    });
    toast.pushToast('菜谱已收藏到你的私房菜单。', 'success');
  };

  const deleteFavorite = (id: string) => {
    setFavorites((current) => current.filter((item) => item.id !== id));
    toast.pushToast('已从收藏里移除。', 'info');
  };

  const copyRecipe = async (recipe: Recipe) => {
    const text = `${recipe.emoji} ${recipe.title}\n${recipe.tagline}\nMVP: ${recipe.mvpPath.join(' / ')}`;
    await navigator.clipboard?.writeText(text);
    toast.pushToast('方案已复制，可以端去给伙伴看了。', 'success');
  };

  const continueSeasoning = (recipe: Recipe) => {
    addMany(recipe.recommendedAdditions);
    toast.pushToast('已把下一批推荐食材放进锅里，可以重新翻炒。', 'success');
  };

  const toggleFavoriteIngredient = (ingredient: Ingredient) => {
    setFavoriteIngredients((current) => {
      if (current.some((item) => item.id === ingredient.id)) return current.filter((item) => item.id !== ingredient.id);
      return [ingredient, ...current].slice(0, 80);
    });
  };

  return {
    state,
    visibleCatalysts,
    activeIngredient,
    setActiveIngredient,
    selectedRecipe,
    setSelectedRecipe,
    favoritesOpen,
    setFavoritesOpen,
    favorites,
    favoriteIngredients,
    recentIngredients,
    toasts: toast.toasts,
    dismissToast: toast.dismissToast,
    addIngredient,
    addMany,
    randomAdd,
    undo,
    clear,
    cook,
    saveRecipe,
    deleteFavorite,
    copyRecipe,
    continueSeasoning,
    toggleFavoriteIngredient,
    setHeatLevel: (heatLevel: HeatLevel) => dispatch({ type: 'SET_HEAT', heatLevel }),
    findIngredientById,
  };
}
