import React from 'react';
import { Search, X, SlidersHorizontal, Globe2 } from 'lucide-react';
import { CONTINENTS, COUNTRIES } from '../../data/countriesData';
import { MEAL_TYPES, DIET_FILTERS } from '../../data/categoriesData';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedContinent,
  setSelectedContinent,
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
  selectedDiet,
  setSelectedDiet,
  totalResults
}) => {
  const filteredCountries = selectedContinent === 'all'
    ? COUNTRIES
    : COUNTRIES.filter(c => c.id === 'all' || c.continent === selectedContinent);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedContinent !== 'all' ||
    selectedCountry !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDiet !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedContinent('all');
    setSelectedCountry('all');
    setSelectedCategory('all');
    setSelectedDiet('all');
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-3xl border border-stone-200/80 shadow-xs">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une recette, un ingrédient, un pays..."
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm placeholder:text-stone-400 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Continents horizontal chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {CONTINENTS.map((c) => {
          const isSelected = selectedContinent === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedContinent(c.id);
                setSelectedCountry('all'); // Reset country when continent changes
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs scale-102'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Countries dropdown or scroll chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountry === country.id;
          return (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-xl text-xs font-medium flex items-center space-x-1 border transition-all ${
                isSelected
                  ? 'border-brand-500 bg-brand-50 text-brand-800 font-bold'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filters: Meal Types & Diets */}
      <div className="flex items-center justify-between pt-1 gap-2 flex-wrap text-xs">
        {/* Meal categories */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {MEAL_TYPES.map((type) => {
            const isSelected = selectedCategory === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedCategory(type.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {type.name}
              </button>
            );
          })}
        </div>

        {/* Diet pills */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {DIET_FILTERS.map((diet) => {
            const isSelected = selectedDiet === diet.id;
            return (
              <button
                key={diet.id}
                onClick={() => setSelectedDiet(diet.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {diet.icon && <span>{diet.icon}</span>}
                <span>{diet.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count & reset */}
      <div className="flex items-center justify-between pt-1 text-xs text-stone-500 border-t border-stone-100">
        <span>
          <strong>{totalResults}</strong> recette{totalResults > 1 ? 's' : ''} trouvée{totalResults > 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-brand-600 font-semibold hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Réinitialiser les filtres</span>
          </button>
        )}
      </div>
    </div>
  );
};
