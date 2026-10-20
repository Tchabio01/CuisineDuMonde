import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { FilterBar } from './components/recipes/FilterBar';
import { RecipeCard } from './components/recipes/RecipeCard';
import { RecipeDetailModal } from './components/recipes/RecipeDetailModal';
import { PantryAssistant } from './components/assistant/PantryAssistant';
import { ShoppingListView } from './components/shopping/ShoppingListView';
import { FavoritesView } from './components/favorites/FavoritesView';
import { SponsoredCard } from './components/monetization/SponsoredCard';
import { PremiumModal } from './components/monetization/PremiumModal';
import { RECIPES } from './data/recipesData';
import { normalizeText } from './utils/recipeMatcher';
import { Sparkles, Compass, Flame, ChefHat } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [premiumModalRecipe, setPremiumModalRecipe] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all');

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      // Search text filter
      if (searchQuery.trim()) {
        const query = normalizeText(searchQuery);
        const inTitle = normalizeText(recipe.title).includes(query);
        const inCountry = normalizeText(recipe.country).includes(query);
        const inContinent = normalizeText(recipe.continent).includes(query);
        const inIngredients = recipe.ingredients.some(ing =>
          normalizeText(ing.name).includes(query)
        );
        if (!inTitle && !inCountry && !inContinent && !inIngredients) {
          return false;
        }
      }

      // Continent filter
      if (selectedContinent !== 'all' && recipe.continent !== selectedContinent) {
        return false;
      }

      // Country filter
      if (selectedCountry !== 'all' && recipe.country !== selectedCountry) {
        return false;
      }

      // Meal type filter
      if (selectedCategory !== 'all' && recipe.category !== selectedCategory) {
        return false;
      }

      // Diet filter
      if (selectedDiet !== 'all' && (!recipe.diet || !recipe.diet.includes(selectedDiet))) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedContinent, selectedCountry, selectedCategory, selectedDiet]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header onOpenFridge={() => setActiveTab('fridge')} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-24">
        {/* VIEW 1: ACCUEIL */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Welcome Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-5 sm:p-7 shadow-md">
              <div className="relative z-10 max-w-xl space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-orange-300 text-xs font-bold border border-brand-400/30">
                  <Flame className="w-3.5 h-3.5 text-brand-400" />
                  <span>Voyage culinaire du jour</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Les meilleures recettes du monde à portée de main
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Explorez les traditions gastronomiques d'Asie, d'Afrique, d'Europe et des Amériques. Cuisinez chez vous comme un grand chef.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('fridge')}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cuisiner avec mon frigo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all"
                  >
                    Parcourir par pays
                  </button>
                </div>
              </div>

              {/* Decorative culinary glow */}
              <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Filters Bar */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedContinent={selectedContinent}
              setSelectedContinent={setSelectedContinent}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDiet={selectedDiet}
              setSelectedDiet={setSelectedDiet}
              totalResults={filteredRecipes.length}
            />

            {/* Sponsored Partnership Spotlight */}
            <SponsoredCard />

            {/* Recipes Grid */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-stone-900 text-lg">
                  Nos sélections savoureuses
                </h3>
              </div>

              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredRecipes.map(recipe => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelect={(rec) => setSelectedRecipe(rec)}
                      onOpenPremium={(rec) => setPremiumModalRecipe(rec)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center space-y-2">
                  <p className="font-bold text-stone-700">Aucune recette ne correspond aux critères</p>
                  <p className="text-xs text-stone-400">
                    Modifiez vos filtres ou effectuez une recherche plus large.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW 2: EXPLORER (PAYS & CONTINENTS) */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Explorer les cuisines du monde
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Filtrer par continent, pays d'origine et spécialités locales.
              </p>
            </div>

            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedContinent={selectedContinent}
              setSelectedContinent={setSelectedContinent}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDiet={selectedDiet}
              setSelectedDiet={setSelectedDiet}
              totalResults={filteredRecipes.length}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={(rec) => setSelectedRecipe(rec)}
                  onOpenPremium={(rec) => setPremiumModalRecipe(rec)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ASSISTANT MON FRIGO */}
        {activeTab === 'fridge' && (
          <PantryAssistant
            recipes={RECIPES}
            onSelectRecipe={(rec) => setSelectedRecipe(rec)}
          />
        )}

        {/* VIEW 4: LISTE DE COURSES */}
        {activeTab === 'cart' && (
          <ShoppingListView />
        )}

        {/* VIEW 5: FAVORIS */}
        {activeTab === 'favorites' && (
          <FavoritesView
            recipes={RECIPES}
            onSelectRecipe={(rec) => setSelectedRecipe(rec)}
            onExploreClick={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Premium Preview Modal */}
      {premiumModalRecipe && (
        <PremiumModal
          recipe={premiumModalRecipe}
          onClose={() => setPremiumModalRecipe(null)}
          onUnlockPreview={(rec) => {
            setSelectedRecipe(rec);
            setPremiumModalRecipe(null);
          }}
        />
      )}

      {/* Bottom Mobile Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
