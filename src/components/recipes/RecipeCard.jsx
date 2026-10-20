import React from 'react';
import { Clock, Users, Heart, Sparkles, ChefHat } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export const RecipeCard = ({ recipe, onSelect, onOpenPremium }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleCardClick = () => {
    if (recipe.isPremium && onOpenPremium) {
      onOpenPremium(recipe);
    } else {
      onSelect(recipe);
    }
  };

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 active:scale-[0.99] cursor-pointer flex flex-col"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Country Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold shadow-xs">
          <span>{recipe.flag}</span>
          <span>{recipe.country}</span>
        </div>

        {/* Premium Badge */}
        {recipe.isPremium && (
          <div className="absolute top-3 right-12 flex items-center space-x-1 bg-amber-500/95 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>Premium</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 backdrop-blur-md transition-all duration-200 active:scale-90 shadow-sm"
          aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite ? 'fill-red-500 text-red-500' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium">
          <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md">
            {recipe.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
            {recipe.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{totalTime} min</span>
          </div>

          <div className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-stone-400" />
            <span>{recipe.baseServings} pers.</span>
          </div>

          <div className="flex items-center space-x-1">
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                recipe.difficulty === 'Facile'
                  ? 'bg-emerald-50 text-emerald-700'
                  : recipe.difficulty === 'Moyen'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
