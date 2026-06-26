import { Bookmark, ChefHat, Menu } from 'lucide-react';

type HeaderProps = {
  favoritesCount: number;
  onSave: () => void;
  onOpenFavorites: () => void;
};

export function Header({ favoritesCount, onSave, onOpenFavorites }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-orange-100/80 bg-cream/82 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-soft">
            <ChefHat size={28} strokeWidth={2.3} />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black tracking-normal text-ink">CookIdea</h1>
            <p className="hidden text-sm font-semibold text-stone-600 sm:block">把灵感下锅，烹饪出可落地的创意</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFavorites}
            className="hidden items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-sm font-black text-stone-700 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:bg-white md:inline-flex"
            type="button"
            aria-label={`打开已收藏菜谱，当前 ${favoritesCount} 个`}
          >
            <Menu size={16} />
            已收藏 {favoritesCount}
          </button>
          <button
            onClick={onSave}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-black text-white shadow-soft transition active:scale-95 hover:-translate-y-0.5 hover:bg-stone-800 md:px-5"
            type="button"
            aria-label="保存当前菜谱"
          >
            <Bookmark size={17} />
            <span className="hidden sm:inline">保存菜谱</span>
          </button>
        </div>
      </div>
    </header>
  );
}
