import { AnimatePresence, motion } from 'framer-motion';
import { Clipboard, Trash2, X } from 'lucide-react';
import type { SavedRecipe } from '../types';

type FavoritesDrawerProps = {
  open: boolean;
  favorites: SavedRecipe[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onCopy: (recipe: SavedRecipe) => void;
};

export function FavoritesDrawer({ open, favorites, onClose, onDelete, onCopy }: FavoritesDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 bg-stone-950/35 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-cream p-5 shadow-2xl"
            aria-label="已收藏菜谱"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-ink">已收藏菜谱</h2>
                <p className="text-sm font-semibold text-stone-500">{favorites.length} 份私房菜单</p>
              </div>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm" type="button" aria-label="关闭收藏列表">
                <X size={18} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {favorites.length === 0 ? (
                <div className="grid h-full place-items-center rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-6 text-center">
                  <div>
                    <p className="text-lg font-black text-ink">私房菜单还空着</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-stone-500">翻炒出满意方案后，点收藏就能存到这里。</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((item) => (
                    <article key={`${item.id}-${item.savedAt}`} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-orange-100">
                      <h3 className="text-base font-black text-ink">
                        {item.emoji} {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-stone-600">{item.tagline}</p>
                      <p className="mt-2 text-xs font-bold text-stone-400">
                        {new Date(item.savedAt).toLocaleString()} · {item.usedIngredients.map((ingredient) => ingredient.name).join('、')}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => onCopy(item)}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-black text-orange-800"
                          type="button"
                          aria-label={`复制收藏菜谱 ${item.title}`}
                        >
                          <Clipboard size={14} />
                          复制
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-700"
                          type="button"
                          aria-label={`删除收藏菜谱 ${item.title}`}
                        >
                          <Trash2 size={14} />
                          删除
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
