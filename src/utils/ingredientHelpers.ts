import { allIngredients, ingredientGroups, personalFridgeGroups } from '../data/mockIngredients';
import type { Ingredient, IngredientCategory } from '../types';

export const categoryLabel: Record<IngredientCategory, string> = {
  asset: '原料',
  skill: '技能',
  audience: '食客',
  pain: '痛点',
  goal: '目标',
  constraint: '限制',
  scenario: '场景',
  technology: '技术',
  business: '商业模式',
  growth: '增长',
  catalyst: '调料',
};

export const findIngredientById = (id: string) => allIngredients.find((ingredient) => ingredient.id === id);

export const getIngredientColor = (ingredient: Ingredient) => {
  const group = [...ingredientGroups, ...personalFridgeGroups].find((item) => item.id === ingredient.category);
  if (ingredient.category === 'constraint') return 'bg-amber-100 text-amber-950 border-amber-200';
  if (ingredient.category === 'goal') return 'bg-violet-100 text-violet-950 border-violet-200';
  if (ingredient.category === 'technology') return 'bg-slate-100 text-slate-950 border-slate-200';
  if (ingredient.category === 'business') return 'bg-lime-100 text-lime-950 border-lime-200';
  if (ingredient.category === 'growth') return 'bg-pink-100 text-pink-950 border-pink-200';
  if (ingredient.category === 'skill') return 'bg-cyan-100 text-cyan-950 border-cyan-200';
  return group?.color ?? 'bg-stone-100 text-stone-800 border-stone-200';
};

export const hasIngredientName = (ingredients: Ingredient[], names: string[]) =>
  ingredients.some((ingredient) => names.includes(ingredient.name));

export const ingredientNames = (ingredients: Ingredient[]) => ingredients.map((ingredient) => ingredient.name).join('、');

export const uniqueIngredients = (ingredients: Ingredient[]) => {
  const seen = new Set<string>();
  return ingredients.filter((ingredient) => {
    if (seen.has(ingredient.id)) return false;
    seen.add(ingredient.id);
    return true;
  });
};
