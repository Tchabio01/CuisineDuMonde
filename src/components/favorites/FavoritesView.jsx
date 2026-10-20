import React from 'react';
import { Heart, Compass } from 'lucide-react';
import { RecipeCard } from '../recipes/RecipeCard';
import { useFavorites } from '../../context/FavoritesContext';

export const FavoritesView = ({ recipes, onSelectRecipe, onExploreClick }) => {
  const { favorites } = useFavorites();

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center space-x-2">
            <span>Mes Recettes Favorites</span>
            <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
              {favoriteRecipes.length}
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Vos carnets culinaires favoris enregistrés localement sur cet appareil.
          </p>
        </div>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favoriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-800 text-base">Aucun coup de cœur pour l'instant</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Cliquez sur le petit cœur sur les cartes des recettes pour les retrouver instantanément ici même sans connexion internet.
          </p>
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold rounded-2xl inline-flex items-center space-x-2 shadow-xs transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explorer les recettes du monde</span>
          </button>
        </div>
      )}
    </div>
  );
};
