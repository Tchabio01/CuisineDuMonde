/**
 * Moteur de suggestion basé sur les ingrédients disponibles dans le frigo.
 * Algorithme d'analyse d'intersection textuelle et de calcul de score de pertinence.
 * 100% exécuté en local sans appel réseau ni clé API.
 */

// Normalise une chaîne (minuscules, sans accents) pour des comparaisons robustes
export const normalizeText = (text) => {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * Extrait la liste ordonnée des ingrédients distincts de la base
 */
export const getAllAvailableIngredients = (recipes) => {
  const map = new Map();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(item => {
      const norm = normalizeText(item.name);
      if (!map.has(norm)) {
        map.set(norm, {
          name: item.name,
          category: item.category || 'Autre'
        });
      }
    });
  });
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
};

/**
 * Compare une liste d'ingrédients utilisateur avec les recettes
 */
export const matchRecipesByIngredients = (recipes, selectedIngredients) => {
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return [];
  }

  const normalizedSelected = selectedIngredients.map(normalizeText);

  const scored = recipes.map(recipe => {
    const totalIngredients = recipe.ingredients.length;
    let matchCount = 0;
    const matchedItems = [];
    const missingItems = [];

    recipe.ingredients.forEach(ing => {
      const normName = normalizeText(ing.name);
      // Vérifie si un des ingrédients sélectionnés correspond (inclus ou exact)
      const isMatched = normalizedSelected.some(sel => 
        normName.includes(sel) || sel.includes(normName)
      );

      if (isMatched) {
        matchCount++;
        matchedItems.push(ing.name);
      } else {
        missingItems.push(ing.name);
      }
    });

    const matchPercentage = Math.round((matchCount / totalIngredients) * 100);

    return {
      recipe,
      matchCount,
      totalIngredients,
      matchPercentage,
      matchedItems,
      missingItems
    };
  });

  // Ne garder que les recettes ayant au moins 1 ingrédient en commun
  return scored
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchCount - a.matchCount);
};
