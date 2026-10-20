import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Refrigerator,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { getAllAvailableIngredients, matchRecipesByIngredients } from '../../utils/recipeMatcher';

export const PantryAssistant = ({ recipes, onSelectRecipe }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([
    'Poulet',
    'Tomates',
    'Oignon'
  ]);
  const [customInput, setCustomInput] = useState('');

  // Liste de tous les ingrédients uniques disponibles
  const allIngredients = useMemo(() => {
    return getAllAvailableIngredients(recipes);
  }, [recipes]);

  // Suggestions courantes pour le clic rapide
  const popularIngredients = [
    'Poulet', 'Œufs', 'Tomates', 'Oignon', 'Ail',
    'Riz', 'Pâtes', 'Parmesan', 'Citron', 'Champignons',
    'Beurre', 'Crème', 'Aubergines', 'Poivrons'
  ];

  // Calcul du matching en temps réel
  const matchResults = useMemo(() => {
    return matchRecipesByIngredients(recipes, selectedIngredients);
  }, [recipes, selectedIngredients]);

  const addIngredient = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!selectedIngredients.some(i => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients(prev => [...prev, clean]);
    }
    setCustomInput('');
  };

  const removeIngredient = (name) => {
    setSelectedIngredients(prev => prev.filter(i => i !== name));
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-brand-600 via-orange-600 to-amber-700 text-white p-5 sm:p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Refrigerator className="w-3.5 h-3.5 text-orange-200" />
            <span>Assistant Anti-Gaspillage & Frigo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Que cuisiner avec ce que vous avez ?
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl leading-relaxed">
            Sélectionnez les ingrédients présents dans vos placards et votre réfrigérateur. Notre algorithme analyse la base pour trouver les recettes réalisables immédiatement.
          </p>
        </div>
      </div>

      {/* Information sur la nature de l'assistant (Transparence & Sécurité) */}
      <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-2xl flex items-start space-x-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Fonctionnement du moteur de suggestion :</p>
          <p className="text-amber-800/90 mt-0.5">
            Ce mode utilise un algorithme local d'appariement d'ingrédients précis, rapide et fonctionnant 100% hors-ligne sans transmettre vos données. 
            <em> (L'intégration d'un modèle d'IA générative externe est prévue ultérieurement via une passerelle serveur sécurisée sans exposition de clés API dans le navigateur).</em>
          </p>
        </div>
      </div>

      {/* Selected Ingredients Box */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-center space-x-2">
            <span>Mes ingrédients sélectionnés</span>
            <span className="bg-brand-100 text-brand-800 text-xs px-2 py-0.5 rounded-full font-extrabold">
              {selectedIngredients.length}
            </span>
          </h3>
          {selectedIngredients.length > 0 && (
            <button
              onClick={clearAllIngredients}
              className="text-xs text-stone-400 hover:text-stone-600 font-medium"
            >
              Tout effacer
            </button>
          )}
        </div>

        {/* Chips */}
        {selectedIngredients.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold shadow-2xs animate-in zoom-in-95 duration-150"
              >
                <span>{ing}</span>
                <button
                  onClick={() => removeIngredient(ing)}
                  className="p-0.5 hover:bg-brand-200 rounded-full text-brand-700 transition-colors"
                  aria-label={`Retirer ${ing}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic">
            Aucun ingrédient sélectionné. Cliquez sur un ingrédient ci-dessous ou ajoutez le vôtre.
          </p>
        )}

        {/* Input to add custom ingredient */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addIngredient(customInput);
          }}
          className="flex items-center space-x-2 pt-2"
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ex : Citron, Courgettes, Saumon..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1 active:scale-95 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </form>

        {/* Quick popular ingredients buttons */}
        <div className="pt-2 border-t border-stone-100">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
            Suggestions rapides à ajouter :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularIngredients.map((item) => {
              const isAlreadySelected = selectedIngredients.some(
                i => i.toLowerCase() === item.toLowerCase()
              );
              return (
                <button
                  key={item}
                  onClick={() => !isAlreadySelected && addIngredient(item)}
                  disabled={isAlreadySelected}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isAlreadySelected
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 active:scale-95'
                  }`}
                >
                  + {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
            Recettes correspondantes ({matchResults.length})
          </h3>
          <span className="text-xs text-stone-500">
            Classées par % d'ingrédients disponibles
          </span>
        </div>

        {matchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchResults.map(({ recipe, matchPercentage, matchCount, totalIngredients, matchedItems, missingItems }) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{recipe.flag}</span>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm group-hover:text-brand-600 transition-colors line-clamp-1">
                          {recipe.title}
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          {recipe.country} • {recipe.category}
                        </span>
                      </div>
                    </div>

                    {/* Percentage pill */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                          matchPercentage >= 70
                            ? 'bg-emerald-100 text-emerald-800'
                            : matchPercentage >= 40
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {matchPercentage}%
                      </span>
                      <span className="text-[10px] text-stone-400 mt-0.5">
                        {matchCount}/{totalIngredients} ingrédients
                      </span>
                    </div>
                  </div>

                  {/* Ingredients breakdown */}
                  <div className="space-y-1.5 my-3 text-xs">
                    <div className="text-emerald-700 bg-emerald-50/70 p-2 rounded-xl">
                      <span className="font-bold block text-[10px] uppercase text-emerald-800 tracking-wider mb-0.5">
                        Vous avez ({matchedItems.length}) :
                      </span>
                      <p className="line-clamp-2">{matchedItems.join(', ')}</p>
                    </div>

                    {missingItems.length > 0 && (
                      <div className="text-stone-600 bg-stone-50 p-2 rounded-xl">
                        <span className="font-bold block text-[10px] uppercase text-stone-500 tracking-wider mb-0.5">
                          Il vous manque ({missingItems.length}) :
                        </span>
                        <p className="line-clamp-1 text-stone-500">{missingItems.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-brand-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Consulter la recette</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center space-y-3">
            <Refrigerator className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-bold text-stone-700">Aucune recette trouvée</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Essayez d'ajouter d'autres ingrédients de base comme l'oignon, le riz, le poulet ou les tomates pour voir des suggestions !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
