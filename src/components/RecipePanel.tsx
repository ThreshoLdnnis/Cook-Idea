import { BookOpen, CookingPot } from 'lucide-react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

type RecipePanelProps = {
  recipes: Recipe[];
  isCooking: boolean;
  onSave: (recipe: Recipe) => void;
  onCopy: (recipe: Recipe) => void;
  onContinue: (recipe: Recipe) => void;
  onOpenDetail: (recipe: Recipe) => void;
};

export function RecipePanel({ recipes, isCooking, onSave, onCopy, onContinue, onOpenDetail }: RecipePanelProps) {
  return (
    <aside className="flex min-h-0 flex-col rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-100 text-carrot">
          <BookOpen size={21} />
        </div>
        <div>
          <h2 className="text-lg font-black text-ink">Recipe Output</h2>
          <p className="text-xs font-semibold text-stone-500">可执行的菜谱式方案</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto pr-1">
        {recipes.length === 0 ? (
          <div className="grid h-full min-h-[360px] place-items-center rounded-[1.75rem] border border-dashed border-orange-200 bg-orange-50/65 p-6 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white text-carrot shadow-sticker">
                <CookingPot size={30} />
              </div>
              <p className="text-base font-black text-ink">
                {isCooking ? '菜谱正在摆盘中...' : '锅里还空空的，先放点灵感进去吧。'}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-stone-500">
                翻炒后会生成 3 份菜谱卡，包含指数、MVP 路径和下一步行动。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onSave={onSave}
                onCopy={onCopy}
                onContinue={onContinue}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
