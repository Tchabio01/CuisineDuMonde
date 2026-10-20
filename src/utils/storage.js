const FAVORITES_KEY = 'cdm_favorites_v1';
const CART_KEY = 'cdm_shopping_cart_v1';

export const loadFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erreur lecture favoris:', e);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Erreur sauvegarde favoris:', e);
  }
};

export const loadShoppingCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erreur lecture liste de courses:', e);
    return [];
  }
};

export const saveShoppingCart = (cartItems) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.error('Erreur sauvegarde liste de courses:', e);
  }
};
