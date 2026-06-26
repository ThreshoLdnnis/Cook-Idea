import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CookingLog } from './components/CookingLog';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FridgePanel } from './components/FridgePanel';
import { Header } from './components/Header';
import { HeatControl } from './components/HeatControl';
import { IdeaPot } from './components/IdeaPot';
import { IngredientTag } from './components/IngredientTag';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { RecipePanel } from './components/RecipePanel';
import { Toast } from './components/Toast';
import { useCookIdea } from './hooks/useCookIdea';
import type { Ingredient } from './types';
import { getIngredientColor } from './utils/ingredientHelpers';

export default function App() {
  const cook = useCookIdea();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const ingredient = event.active.data.current?.ingredient as Ingredient | undefined;
    if (event.over?.id === 'idea-pot' && ingredient) cook.addIngredient(ingredient);
    cook.setActiveIngredient(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => cook.setActiveIngredient(cook.findIngredientById(String(event.active.id)) ?? null)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => cook.setActiveIngredient(null)}
    >
      <div className="min-h-screen bg-cream text-ink">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(249,115,22,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(34,197,94,0.13),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.10),transparent_27%),linear-gradient(135deg,#fff8ec_0%,#fff3df_46%,#fffbf3_100%)]" />
        <Header
          favoritesCount={cook.favorites.length}
          onSave={() => cook.saveRecipe()}
          onOpenFavorites={() => cook.setFavoritesOpen(true)}
        />

        <div className="mx-auto grid max-w-[1600px] gap-5 px-4 py-5 lg:grid-cols-[310px_minmax(430px,1fr)_410px] xl:grid-cols-[340px_minmax(500px,1fr)_430px]">
          <div className="order-3 lg:order-1">
            <FridgePanel
              visibleCatalysts={cook.visibleCatalysts}
              selectedIngredients={cook.state.potIngredients}
              recentIngredients={cook.recentIngredients}
              favoriteIngredients={cook.favoriteIngredients}
              onAdd={cook.addIngredient}
              onRandomAdd={cook.randomAdd}
              onToggleFavorite={cook.toggleFavoriteIngredient}
            />
          </div>

          <div className="order-1 flex min-w-0 flex-col gap-5 lg:order-2">
            <IdeaPot
              ingredients={cook.state.potIngredients}
              heatLevel={cook.state.heatLevel}
              isCooking={cook.state.isCooking}
              stage={cook.state.stage}
              status={cook.state.status}
              canUndo={cook.state.history.length > 0}
              onCook={cook.cook}
              onClear={cook.clear}
              onUndo={cook.undo}
              onRandomAdd={cook.randomAdd}
            />
            <HeatControl value={cook.state.heatLevel} onChange={cook.setHeatLevel} />
            <div className="lg:hidden">
              <CookingLog
                logs={cook.state.cookingLogs}
                stage={cook.state.stage}
                isCooking={cook.state.isCooking}
                maturity={cook.state.maturity}
              />
            </div>
          </div>

          <div className="order-2 flex min-h-0 flex-col gap-5 lg:order-3">
            <div className="hidden lg:block">
              <CookingLog
                logs={cook.state.cookingLogs}
                stage={cook.state.stage}
                isCooking={cook.state.isCooking}
                maturity={cook.state.maturity}
              />
            </div>
            <RecipePanel
              recipes={cook.state.recipes}
              isCooking={cook.state.isCooking}
              onSave={cook.saveRecipe}
              onCopy={cook.copyRecipe}
              onContinue={cook.continueSeasoning}
              onOpenDetail={cook.setSelectedRecipe}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {cook.activeIngredient ? (
          <IngredientTag ingredient={cook.activeIngredient} className={getIngredientColor(cook.activeIngredient)} />
        ) : null}
      </DragOverlay>

      <RecipeDetailModal recipe={cook.selectedRecipe} onClose={() => cook.setSelectedRecipe(null)} />
      <FavoritesDrawer
        open={cook.favoritesOpen}
        favorites={cook.favorites}
        onClose={() => cook.setFavoritesOpen(false)}
        onDelete={cook.deleteFavorite}
        onCopy={cook.copyRecipe}
      />
      <Toast toasts={cook.toasts} onDismiss={cook.dismissToast} />
    </DndContext>
  );
}
