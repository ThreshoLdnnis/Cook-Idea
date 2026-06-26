import { CheckCircle2, Loader2 } from 'lucide-react';
import type { CookingLogItem, CookingStage, MaturityScore } from '../types';

type CookingLogProps = {
  logs: CookingLogItem[];
  stage: CookingStage;
  isCooking: boolean;
  maturity: MaturityScore | null;
};

const metrics = [
  ['食材互补性', 'complementarity'],
  ['市场清晰度', 'marketClarity'],
  ['技术可行性', 'technicalFeasibility'],
  ['商业化潜力', 'commercialPotential'],
  ['差异化程度', 'differentiation'],
] as const;

export function CookingLog({ logs, stage, isCooking, maturity }: CookingLogProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-ink">AI Cooking Log</h2>
          <p className="text-xs font-semibold text-stone-500">系统如何理解这锅灵感</p>
        </div>
        {isCooking && <Loader2 size={18} className="animate-spin text-orange-600" aria-label="正在分析" />}
      </div>

      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="rounded-2xl bg-orange-50 p-3 text-sm font-semibold leading-6 text-stone-600">
            翻炒开始后，这里会记录 AI 识别主食材、发现缺口和自动加调料的过程。
          </p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-2 rounded-2xl bg-white/80 p-3 ring-1 ring-orange-50">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-500" />
              <div>
                <p className="text-xs font-black text-stone-700">{log.label}</p>
                <p className="text-sm font-semibold leading-5 text-stone-600">{log.detail}</p>
              </div>
            </div>
          ))
        )}
        {isCooking && (
          <div className="rounded-2xl bg-orange-100 p-3 text-sm font-black text-orange-800" aria-live="polite">
            当前阶段：{stage}
          </div>
        )}
      </div>

      {maturity && (
        <div className="mt-4 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 p-4 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black text-orange-200">创意成熟度</p>
              <p className="text-3xl font-black">{maturity.total} / 100</p>
            </div>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black">出锅评分</span>
          </div>
          <div className="mt-4 space-y-3">
            {metrics.map(([label, key]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-xs font-bold text-stone-200">
                  <span>{label}</span>
                  <span>{maturity[key]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-300 to-green-300" style={{ width: `${maturity[key]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
