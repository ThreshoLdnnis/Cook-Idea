import type { HeatLevel } from '../types';
import { heatOptions } from '../data/mockIngredients';

type HeatControlProps = {
  value: HeatLevel;
  onChange: (value: HeatLevel) => void;
};

export function HeatControl({ value, onChange }: HeatControlProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/70 p-3 shadow-soft backdrop-blur-xl">
      <div className="mb-3 px-2">
        <h2 className="text-sm font-black text-ink">火候控制</h2>
        <p className="text-xs font-semibold text-stone-500">火候会影响标题、风险、MVP 和创新程度</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {heatOptions.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`rounded-3xl border p-3 text-left transition active:scale-[0.98] ${
                active
                  ? 'border-orange-300 bg-orange-100 text-orange-950 shadow-sticker'
                  : 'border-orange-100 bg-white text-stone-600 hover:-translate-y-0.5 hover:bg-orange-50'
              }`}
              type="button"
              aria-label={`选择${option.label}：${option.description}`}
            >
              <div className="min-h-6 text-sm">{option.heat}</div>
              <div className="mt-1 text-sm font-black">{option.label}</div>
              <div className="text-xs font-bold">{option.description}</div>
              <div className="mt-2 text-xs font-medium leading-5 text-stone-500">{option.detail}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
