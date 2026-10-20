import React, { useState } from 'react';
import {
  X,
  Clock,
  Users,
  Heart,
  ShoppingCart,
  Check,
  Flame,
  Minus,
  Plus,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export const RecipeDetailModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addIngredientsFromRecipe } = useShoppingCart();

  const favorite = isFavorite(recipe.id);
  const [servings, setServings] = useState(recipe.baseServings || 4);
  const [addedToCart, setAddedToCart] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const servingRatio = servings / (recipe.baseServings || 4);

  const handleAddToCart = () => {
    addIngredientsFromRecipe(recipe, servings);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const toggleStep = (index) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative pb-20 sm:pb-8">
        {/* Header Image & Actions */}
        <div className="relative aspect-[16/9] w-full bg-stone-900">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          {/* Top Bar Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95 shadow-md"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95 shadow-md"
                aria-label="Favori"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorite ? 'fill-red-500 text-red-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Title & Origin in Header */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-xl">{recipe.flag}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-200 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                {recipe.country} • {recipe.continent}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-100 text-center">
            <div>
              <span className="text-[11px] text-stone-500 block font-medium">Préparation</span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.prepTime} min</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block font-medium">Cuisson</span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.cookTime} min</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block font-medium">Total</span>
              <span className="text-xs sm:text-sm font-bold text-brand-600">{totalTime} min</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block font-medium">Calories</span>
              <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.calories || '~450'} kcal</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              {recipe.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 text-stone-700">
              Niveau : {recipe.difficulty}
            </span>
            {recipe.diet && recipe.diet.map(d => (
              <span key={d} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                {d}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed">
            {recipe.description}
          </p>

          {/* Ingredients Section with dynamic Servings Adjuster */}
          <div className="border-t border-stone-100 pt-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-stone-900">
                  Ingrédients
                </h3>
                <span className="text-xs text-stone-500">
                  Quantités ajustées pour {servings} personne{servings > 1 ? 's' : ''}
                </span>
              </div>

              {/* Servings counter buttons */}
              <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="p-1 rounded-lg bg-white shadow-xs hover:bg-stone-50 text-stone-700 active:scale-95 disabled:opacity-40"
                  disabled={servings <= 1}
                  aria-label="Diminuer les portions"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-extrabold text-stone-800 min-w-[28px] text-center">
                  {servings}
                </span>
                <button
                  onClick={() => setServings(servings + 1)}
                  className="p-1 rounded-lg bg-white shadow-xs hover:bg-stone-50 text-stone-700 active:scale-95"
                  aria-label="Augmenter les portions"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Ingredients list */}
            <ul className="space-y-2 bg-stone-50/70 rounded-2xl p-3 border border-stone-100">
              {recipe.ingredients.map((ing, idx) => {
                const adjustedAmount = ing.amount
                  ? Math.round(ing.amount * servingRatio * 10) / 10
                  : null;

                return (
                  <li
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white transition-colors text-sm"
                  >
                    <span className="text-stone-800 font-medium">{ing.name}</span>
                    <span className="font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md border border-stone-100 text-xs shadow-2xs">
                      {adjustedAmount ? `${adjustedAmount} ` : ''}
                      {ing.unit}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Add to shopping list button */}
            <button
              onClick={handleAddToCart}
              className={`mt-3 w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200 active:scale-98 shadow-sm ${
                addedToCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-black text-white'
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>Ingrédients ajoutés aux courses !</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-orange-400" />
                  <span>Ajouter tous les ingrédients à la liste de courses</span>
                </>
              )}
            </button>
          </div>

          {/* Preparation steps */}
          <div className="border-t border-stone-100 pt-5">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 mb-3">
              Étapes de préparation
            </h3>
            <div className="space-y-3">
              {recipe.steps.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start space-x-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 opacity-60'
                        : 'bg-white border-stone-200/80 hover:border-brand-300 shadow-2xs'
                    }`}
                  >
                    <button
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-brand-100 text-brand-800'
                      }`}
                      aria-label={`Étape ${idx + 1}`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </button>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDone ? 'line-through text-stone-500' : 'text-stone-700'
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
