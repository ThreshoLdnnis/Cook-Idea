import { useMemo, useState } from 'react';
import { Filter, Refrigerator, Search, Sparkles, Star } from 'lucide-react';
import {
  getPopularIngredients,
  getRecommendedIngredients,
  graphRelations,
  ingredientGroups,
  personalFridgeGroups,
  searchIngredients,
} from '../data/mockIngredients';
import type { Ingredient, IngredientCategory, SearchMode } from '../types';
import { categoryLabel, getIngredientColor } from '../utils/ingredientHelpers';
import { IngredientTag } from './IngredientTag';

type FridgePanelProps = {
  visibleCatalysts: Ingredient[];
  selectedIngredients: Ingredient[];
  recentIngredients: Ingredient[];
  favoriteIngredients: Ingredient[];
  onAdd: (ingredient: Ingredient) => void;
  onRandomAdd: () => void;
  onToggleFavorite: (ingredient: Ingredient) => void;
};

const categoryOptions: Array<{ id: IngredientCategory | 'all'; label: string }> = [
  { id: 'all', label: '全部' },
  ...ingredientGroups.map((group) => ({ id: group.id, label: categoryLabel[group.id] })),
];

const modeOptions: Array<{ id: SearchMode; label: string }> = [
  { id: 'all', label: '热门' },
  { id: 'recommended', label: '推荐' },
  { id: 'recent', label: '最近' },
  { id: 'favorite', label: '收藏' },
];

export function FridgePanel({
  visibleCatalysts,
  selectedIngredients,
  recentIngredients,
  favoriteIngredients,
  onAdd,
  onRandomAdd,
  onToggleFavorite,
}: FridgePanelProps) {
  const [tab, setTab] = useState<'fridge' | 'library'>('fridge');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<IngredientCategory | 'all'>('all');
  const [mode, setMode] = useState<SearchMode>('all');
  const activeCategory = category === 'all' ? undefined : category;

  const searchResults = useMemo(() => {
    if (tab === 'fridge') return [];
    if (mode === 'recent') return recentIngredients.filter((ingredient) => !activeCategory || ingredient.category === activeCategory);
    if (mode === 'favorite') return favoriteIngredients.filter((ingredient) => !activeCategory || ingredient.category === activeCategory);
    if (mode === 'recommended') return getRecommendedIngredients(selectedIngredients, 80).filter((ingredient) => !activeCategory || ingredient.category === activeCategory);
    if (query.trim()) return searchIngredients(query, activeCategory, 100);
    return getPopularIngredients(80, activeCategory);
  }, [activeCategory, favoriteIngredients, mode, query, recentIngredients, selectedIngredients, tab]);

  return (
    <aside className="flex min-h-0 flex-col rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Refrigerator size={20} className="text-orange-600" />
            <h2 className="text-lg font-black text-ink">Ingredient Graph</h2>
          </div>
          <p className="mt-1 text-xs font-semibold text-stone-500">700+ 个图谱节点，点击或拖拽下锅</p>
        </div>
        <button
          onClick={onRandomAdd}
          className="grid h-10 w-10 place-items-center rounded-full bg-butter text-orange-700 shadow-sm transition active:scale-95 hover:-translate-y-0.5 hover:bg-orange-200"
          title="随机加料"
          aria-label="随机加入食材"
          type="button"
        >
          <Sparkles size={18} />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-full bg-orange-50 p-1">
        <TabButton active={tab === 'fridge'} onClick={() => setTab('fridge')} label="我的冰箱" />
        <TabButton active={tab === 'library'} onClick={() => setTab('library')} label="食材库" />
      </div>

      {tab === 'library' && (
        <div className="mb-4 space-y-3">
          <label className="flex items-center gap-2 rounded-2xl bg-white/85 px-3 py-2 text-stone-500 ring-1 ring-orange-100">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 Python / 获客 / SaaS / xiaohongshu..."
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-stone-700 outline-none placeholder:text-stone-400"
              aria-label="搜索食材"
            />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={15} className="shrink-0 text-stone-400" />
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setCategory(option.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black transition ${
                  category === option.id ? 'bg-ink text-white' : 'bg-white text-stone-600 ring-1 ring-orange-100 hover:text-orange-700'
                }`}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1 rounded-2xl bg-orange-50 p-1">
            {modeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setMode(option.id)}
                className={`rounded-xl px-2 py-1.5 text-xs font-black transition ${
                  mode === option.id ? 'bg-white text-orange-700 shadow-sm' : 'text-stone-500 hover:text-stone-800'
                }`}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 overflow-auto pr-1">
        {tab === 'fridge' ? (
          personalFridgeGroups.map((group) => (
            <IngredientSection
              key={group.id}
              title={group.title}
              subtitle={group.subtitle}
              items={group.items}
              favorites={favoriteIngredients}
              onAdd={onAdd}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <>
            <div className="rounded-3xl bg-stone-900 p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-orange-200">Knowledge Graph</p>
                  <p className="text-lg font-black">{searchResults.length} 个可见节点</p>
                </div>
                <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{ingredientGroups.reduce((sum, group) => sum + group.items.length, 0)} nodes</p>
              </div>
              <div className="mt-3 rounded-2xl bg-white/10 p-3">
                <p className="text-xs font-black text-stone-300">{graphRelations.length} weighted relations</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-stone-300">
                  Python → Automation → AI Agent → SaaS → Subscription
                </p>
              </div>
            </div>
            <IngredientSection
              title={mode === 'recommended' ? '智能推荐' : mode === 'recent' ? '最近使用' : mode === 'favorite' ? '收藏标签' : '热门食材'}
              subtitle="默认只渲染当前筛选结果，保持交互流畅"
              items={searchResults}
              favorites={favoriteIngredients}
              onAdd={onAdd}
              onToggleFavorite={onToggleFavorite}
            />
            {visibleCatalysts.length > 0 && (
              <IngredientSection
                title="AI 刚刚推荐的调料"
                subtitle="来自本轮翻炒的图谱补全"
                items={visibleCatalysts}
                favorites={favoriteIngredients}
                onAdd={onAdd}
                onToggleFavorite={onToggleFavorite}
              />
            )}
          </>
        )}
      </div>
    </aside>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-sm font-black transition ${active ? 'bg-white text-orange-700 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
      type="button"
    >
      {label}
    </button>
  );
}

function IngredientSection({
  title,
  subtitle,
  items,
  favorites,
  onAdd,
  onToggleFavorite,
}: {
  title: string;
  subtitle: string;
  items: Ingredient[];
  favorites: Ingredient[];
  onAdd: (ingredient: Ingredient) => void;
  onToggleFavorite: (ingredient: Ingredient) => void;
}) {
  return (
    <section className="rounded-3xl bg-white/76 p-3 ring-1 ring-orange-50">
      <div className="mb-3">
        <h3 className="text-sm font-black text-ink">{title}</h3>
        <p className="mt-0.5 text-xs font-semibold text-stone-500">{subtitle}</p>
      </div>
      {items.length === 0 ? (
        <p className="rounded-2xl bg-orange-50 p-3 text-sm font-bold text-stone-500">这层冰箱暂时空着，换个筛选试试。</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((ingredient) => (
            <div key={ingredient.id} className="group relative">
              <IngredientTag ingredient={ingredient} className={getIngredientColor(ingredient)} onAdd={onAdd} />
              <button
                onClick={() => onToggleFavorite(ingredient)}
                className={`absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[10px] shadow-sm transition ${
                  favorites.some((item) => item.id === ingredient.id) ? 'bg-yellow-300 text-yellow-900' : 'bg-white text-stone-400 opacity-0 group-hover:opacity-100'
                }`}
                type="button"
                aria-label={`收藏食材 ${ingredient.name}`}
              >
                <Star size={11} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
