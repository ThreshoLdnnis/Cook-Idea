import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import type { Ingredient } from '../types';

type IngredientTagProps = {
  ingredient: Ingredient;
  className: string;
  compact?: boolean;
  floating?: boolean;
  onAdd?: (ingredient: Ingredient) => void;
};

export function IngredientTag({ ingredient, className, compact = false, floating = false, onAdd }: IngredientTagProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ingredient.id,
    data: { ingredient },
    disabled: floating,
  });

  const style = { transform: CSS.Translate.toString(transform) };
  const label = `${ingredient.name}，${ingredient.category} 标签`;

  const content = (
    <span
      className={`group inline-flex max-w-full select-none items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-sm font-black shadow-sticker transition ${
        compact ? 'px-2.5 py-1.5 text-xs' : ''
      } ${className} ${isDragging ? 'scale-105 opacity-70' : 'hover:-translate-y-0.5 hover:scale-[1.02]'}`}
    >
      <span aria-hidden="true">{ingredient.emoji}</span>
      <span className="truncate">{ingredient.name}</span>
    </span>
  );

  if (floating) {
    return (
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1, 1.5, -1] }}
        transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      className="touch-none cursor-grab text-left active:cursor-grabbing"
      onClick={() => onAdd?.(ingredient)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onAdd?.(ingredient);
      }}
      aria-label={`加入食材 ${label}`}
      type="button"
      {...listeners}
      {...attributes}
    >
      {content}
    </button>
  );
}
