import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Flame, Gauge, RotateCcw, Sparkles, Undo2 } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { heatOptions } from '../data/mockIngredients';
import type { CookingStage, HeatLevel, Ingredient } from '../types';
import { hasWebGLSupport, ThreeErrorBoundary, ThreeFallback } from './ThreeFallback';

const IdeaPot3D = lazy(() => import('./IdeaPot3D'));

type IdeaPotProps = {
  ingredients: Ingredient[];
  heatLevel: HeatLevel;
  isCooking: boolean;
  stage: CookingStage;
  status: string;
  canUndo: boolean;
  onCook: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRandomAdd: () => void;
};

const stageHint: Record<CookingStage, string> = {
  idle: '等待食材下锅',
  identify: 'AI 正在闻香识材',
  gap: 'AI 正在找缺口',
  seasoning: 'AI 正在加调料',
  compose: 'AI 正在摆盘',
  done: '创意出锅完成',
};

export function IdeaPot({
  ingredients,
  heatLevel,
  isCooking,
  stage,
  status,
  canUndo,
  onCook,
  onClear,
  onUndo,
  onRandomAdd,
}: IdeaPotProps) {
  const { isOver, setNodeRef } = useDroppable({ id: 'idea-pot' });
  const [performanceMode, setPerformanceMode] = useState(false);
  const [webglAvailable] = useState(() => (typeof document === 'undefined' ? false : hasWebGLSupport()));
  const heat = heatOptions.find((item) => item.id === heatLevel) ?? heatOptions[1];
  const canCook = ingredients.length >= 3 && !isCooking;
  const empty = ingredients.length === 0;
  const lowIngredients = ingredients.length > 0 && ingredients.length < 2;

  return (
    <main className="relative flex min-h-[590px] flex-col rounded-[2rem] border border-white/80 bg-white/60 p-4 shadow-soft backdrop-blur-xl md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">Idea Pot</h2>
          <p className="text-xs font-bold text-stone-500">
            {ingredients.length} 份食材 · 当前火候 {heat.heat} {heat.label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <IconButton label="撤回上一步" onClick={onUndo} disabled={!canUndo || isCooking} icon={<Undo2 size={16} />} />
          <IconButton label="清空锅" onClick={onClear} disabled={empty || isCooking} icon={<RotateCcw size={16} />} />
          <IconButton
            label={performanceMode ? '关闭性能模式' : '开启性能模式'}
            onClick={() => setPerformanceMode((current) => !current)}
            icon={<Gauge size={16} />}
          />
          <button
            onClick={onRandomAdd}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-orange-700 shadow-sm ring-1 ring-orange-100 transition active:scale-95 hover:-translate-y-0.5"
            type="button"
            aria-label={empty ? '帮我开个脑洞' : '随机加料'}
            disabled={isCooking}
          >
            <Sparkles size={15} />
            {empty ? '帮我开个脑洞' : '随机加料'}
          </button>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`relative grid min-h-[460px] flex-1 place-items-center overflow-hidden rounded-[1.75rem] transition ${
          isOver ? 'ring-4 ring-orange-300' : 'ring-1 ring-white/70'
        } bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.78),transparent_32%),linear-gradient(180deg,rgba(255,247,232,0.86),rgba(255,235,204,0.7))]`}
      >
        {webglAvailable ? (
          <div className="absolute inset-0 z-0">
            <ThreeErrorBoundary fallback={<ThreeFallback />}>
              <Suspense
                fallback={
                  <div className="grid h-full w-full place-items-center text-sm font-black text-orange-700">
                    正在预热 3D 创意锅……
                  </div>
                }
              >
                <IdeaPot3D ingredients={ingredients} heatLevel={heatLevel} isCooking={isCooking} performanceMode={performanceMode} />
              </Suspense>
            </ThreeErrorBoundary>
          </div>
        ) : (
          <ThreeFallback />
        )}
        {empty && (
          <div className="pointer-events-none absolute inset-x-6 top-6 z-40 rounded-3xl bg-white/72 p-4 text-center shadow-sticker backdrop-blur">
            <p className="text-lg font-black text-stone-800">把你的能力、目标、痛点丢进锅里。</p>
            <p className="mt-1 text-sm font-semibold text-stone-500">拖拽或点击左侧食材，3D 食材会在锅里漂浮融合</p>
          </div>
        )}
        <motion.div
          className="absolute top-4 z-40 flex items-center gap-2 rounded-full bg-white/88 px-5 py-3 text-sm font-black text-orange-700 shadow-sticker ring-1 ring-orange-100"
          animate={isCooking ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 0.8, repeat: isCooking ? Infinity : 0 }}
          aria-live="polite"
        >
          <Flame size={17} />
          {status || (lowIngredients ? '再加一点食材，创意会更有味道。' : stageHint[stage])}
        </motion.div>
      </div>

      <button
        onClick={onCook}
        disabled={isCooking}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black text-white shadow-soft transition active:scale-[0.98] disabled:cursor-not-allowed ${
          canCook
            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:-translate-y-0.5'
            : 'bg-orange-400 hover:bg-orange-500 disabled:bg-stone-300'
        }`}
        type="button"
        aria-label="开始翻炒"
      >
        {isCooking ? '正在翻炒你的创意食材……' : '开始翻炒'}
      </button>
    </main>
  );
}

function IconButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center rounded-full bg-white text-stone-600 shadow-sm ring-1 ring-orange-100 transition active:scale-95 hover:-translate-y-0.5 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
      title={label}
      aria-label={label}
      type="button"
    >
      {icon}
    </button>
  );
}
