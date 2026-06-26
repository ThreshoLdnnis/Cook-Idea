import { AnimatePresence, motion } from 'framer-motion';
import type { ToastMessage } from '../types';

type ToastProps = {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
};

const toneClass = {
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-orange-200 bg-orange-50 text-orange-950',
  info: 'border-blue-200 bg-blue-50 text-blue-950',
};

export function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex w-[min(92vw,360px)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            onClick={() => onDismiss(toast.id)}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className={`pointer-events-auto rounded-3xl border px-4 py-3 text-left text-sm font-black shadow-soft ${
              toneClass[toast.tone ?? 'info']
            }`}
            type="button"
            aria-label="关闭提示"
          >
            {toast.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
