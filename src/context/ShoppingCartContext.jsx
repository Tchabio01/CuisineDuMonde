import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadShoppingCart, saveShoppingCart } from '../utils/storage';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => loadShoppingCart());

  useEffect(() => {
    saveShoppingCart(cartItems);
  }, [cartItems]);

  const addIngredientsFromRecipe = (recipe, targetServings = recipe.baseServings) => {
    const ratio = targetServings / recipe.baseServings;
    const newItems = recipe.ingredients.map((ing, idx) => {
      const calculatedAmount = ing.amount ? Math.round(ing.amount * ratio * 10) / 10 : null;
      return {
        id: `${recipe.id}-${idx}-${Date.now()}`,
        name: ing.name,
        amount: calculatedAmount,
        unit: ing.unit,
        category: ing.category || 'Épicerie',
        recipeTitle: recipe.title,
        completed: false
      };
    });

    setCartItems(prev => [...prev, ...newItems]);
    return newItems.length;
  };

  const addCustomItem = (name, category = 'Autre') => {
    if (!name || !name.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      amount: null,
      unit: '',
      category,
      recipeTitle: 'Ajout manuel',
      completed: false
    };
    setCartItems(prev => [newItem, ...prev]);
  };

  const toggleItemCompleted = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setCartItems(prev => prev.filter(item => !item.completed));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addIngredientsFromRecipe,
        addCustomItem,
        toggleItemCompleted,
        removeCartItem,
        clearCompleted,
        clearAll
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
