import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, ChevronDown, Clipboard, Layers3, PlusCircle } from 'lucide-react';
import type { Recipe } from '../types';

type RecipeCardProps = {
  recipe: Recipe;
  index: number;
  onSave: (recipe: Recipe) => void;
  onCopy: (recipe: Recipe) => void;
  onContinue: (recipe: Recipe) => void;
  onOpenDetail: (recipe: Recipe) => void;
};

export function RecipeCard({ recipe, index, onSave, onCopy, onContinue, onOpenDetail }: RecipeCardProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-soft"
    >
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition hover:bg-orange-50/60"
        type="button"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {recipe.emoji}
            </span>
            <h3 className="text-lg font-black leading-tight text-ink">{recipe.title}</h3>
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">{recipe.tagline}</p>
        </div>
        <ChevronDown className={`mt-1 shrink-0 text-stone-500 transition ${open ? 'rotate-180' : ''}`} size={19} />
      </button>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          <Score label="创新" value={recipe.innovationScore} tone="bg-violet-500" />
          <Score label="执行" value={recipe.feasibilityScore} tone="bg-green-500" />
          <Score label="风险" value={recipe.riskScore} tone="bg-red-500" inverse />
        </div>

        <div className="mt-3 rounded-2xl bg-orange-50 p-3">
          <p className="text-xs font-black text-orange-800">MVP 摘要</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-stone-700">{recipe.mvpPath.slice(0, 2).join(' → ')}</p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden border-t border-orange-100"
          >
            <div className="space-y-4 p-4">
              <Info label="为什么能组合" value={recipe.why} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Info label="目标用户" value={recipe.targetUser} />
                <Info label="核心痛点" value={recipe.painPoint} />
                <Info label="产品形态" value={recipe.productForm} />
                <Info label="商业模式" value={recipe.businessModel} />
              </div>
              <List label="核心功能" items={recipe.coreFeatures} />
              <List label="MVP 落地路径" items={recipe.mvpPath} ordered />
              <List label="推荐工具栈" items={recipe.tools} />
              <List label="风险提醒" items={recipe.risks} />
              <List label="下一步行动" items={recipe.nextActions} ordered />

              <div className="grid grid-cols-2 gap-2">
                <Action icon={<Bookmark size={15} />} label="收藏菜谱" onClick={() => onSave(recipe)} />
                <Action icon={<Clipboard size={15} />} label="复制方案" onClick={() => onCopy(recipe)} />
                <Action icon={<PlusCircle size={15} />} label="继续加料" onClick={() => onContinue(recipe)} />
                <Action icon={<Layers3 size={15} />} label="拆解 MVP" onClick={() => onOpenDetail(recipe)} primary />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Score({ label, value, tone, inverse = false }: { label: string; value: number; tone: string; inverse?: boolean }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-2">
      <div className="flex items-center justify-between text-xs font-black text-stone-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${inverse ? 100 - value : value}%` }} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-stone-700">{value}</p>
    </div>
  );
}

function List({ label, items, ordered = false }: { label: string; items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <div>
      <p className="text-xs font-black text-stone-500">{label}</p>
      <Tag className="mt-2 space-y-1 text-sm font-semibold leading-6 text-stone-700">
        {items.map((item, index) => (
          <li key={`${label}-${item}`} className="flex gap-2">
            <span className="font-black text-orange-600">{ordered ? `${index + 1}.` : '•'}</span>
            <span>{item}</span>
          </li>
        ))}
      </Tag>
    </div>
  );
}

function Action({ icon, label, onClick, primary = false }: { icon: React.ReactNode; label: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-black transition active:scale-95 ${
        primary ? 'bg-ink text-white hover:bg-stone-800' : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
      }`}
      type="button"
      aria-label={label}
    >
      {icon}
      {label}
    </button>
  );
}
