import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Recipe } from '../types';

type RecipeDetailModalProps = {
  recipe: Recipe | null;
  onClose: () => void;
};

const plan = [
  '验证目标用户痛点',
  '制作 landing page',
  '用 no-code 搭建核心流程',
  '邀请 5 个用户试用',
  '收集反馈',
  '迭代功能',
  '发布第一版',
];

export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  useEffect(() => {
    if (!recipe) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, recipe]);

  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${recipe.title} 的 MVP 拆解`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="max-h-[88vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-cream p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-orange-700">MVP 7 天行动计划</p>
                <h2 className="mt-1 text-2xl font-black text-ink">
                  {recipe.emoji} {recipe.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-stone-600 shadow-sm transition hover:text-orange-700"
                type="button"
                aria-label="关闭菜谱详情"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-7">
              {plan.map((item, index) => (
                <div key={item} className="rounded-3xl bg-white p-3 shadow-sm ring-1 ring-orange-100">
                  <p className="text-xs font-black text-orange-700">Day {index + 1}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-stone-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Panel title="需要的工具" items={recipe.tools} />
              <Panel title="预计成本" items={['0-300 元完成验证版', '优先使用免费层工具', '付费前先验证留资率']} />
              <Panel title="最小功能集" items={recipe.coreFeatures.slice(0, 3)} />
              <Panel title="第一个用户从哪里来" items={['目标社群发 1 条验证帖', '邀请身边 5 个相似用户', '用 landing page 收集等待名单']} />
              <Panel title="可以暂时不做" items={['复杂账号体系', '完整支付闭环', '多语言和高级权限', '大而全的管理后台']} />
              <Panel title="第一周成功指标" items={['5 位用户完成试用', '2 位愿意继续沟通', '至少 1 个明确付费信号']} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-orange-100">
      <h3 className="text-sm font-black text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm font-semibold leading-6 text-stone-600">
            <span className="font-black text-orange-600">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
