import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Copy,
  Check,
  Tag
} from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export const ShoppingListView = () => {
  const {
    cartItems,
    addCustomItem,
    toggleItemCompleted,
    removeCartItem,
    clearCompleted,
    clearAll
  } = useShoppingCart();

  const [newItemName, setNewItemName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addCustomItem(newItemName.trim());
      setNewItemName('');
    }
  };

  const handleShare = () => {
    if (cartItems.length === 0) return;
    const text = [
      '🛒 Liste de courses - Cuisine du Monde',
      '------------------------------------',
      ...cartItems.map(item =>
        `[${item.completed ? 'X' : ' '}] ${item.name}${
          item.amount ? ` (${item.amount} ${item.unit || ''})` : ''
        }`
      )
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Group items by recipe or category
  const activeItems = cartItems.filter(item => !item.completed);
  const completedItems = cartItems.filter(item => item.completed);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center space-x-2">
            <span>Ma Liste de Courses</span>
            <span className="text-xs font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
              {activeItems.length} à acheter
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Ingrédients ajoutés depuis vos recettes favorites ou saisis manuellement.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center space-x-1 text-xs font-semibold"
              title="Copier la liste"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copié !' : 'Partager'}</span>
            </button>
            <button
              onClick={clearAll}
              className="p-2 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-400 transition-colors"
              title="Vider la liste"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Input to add custom item */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Ajouter un article (ex : Lait, Pain, Basilic...)"
          className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-2xs"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-2xl flex items-center space-x-1 shadow-xs active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </button>
      </form>

      {/* Main Items List */}
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {/* Active Items */}
          {activeItems.length > 0 && (
            <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs divide-y divide-stone-100 overflow-hidden">
              {activeItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItemCompleted(item.id)}
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Circle className="w-5 h-5 text-stone-300 group-hover:text-brand-500 transition-colors flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block leading-tight">
                        {item.name}
                      </span>
                      {item.recipeTitle && (
                        <span className="text-[11px] text-stone-400">
                          {item.recipeTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.amount && (
                      <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                        {item.amount} {item.unit || ''}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCartItem(item.id);
                      }}
                      className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Items */}
          {completedItems.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Acheté ({completedItems.length})
                </span>
                <button
                  onClick={clearCompleted}
                  className="text-xs text-brand-600 font-semibold hover:underline"
                >
                  Supprimer les cochés
                </button>
              </div>

              <div className="bg-stone-50/80 rounded-3xl border border-stone-200/60 divide-y divide-stone-100/60 overflow-hidden">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItemCompleted(item.id)}
                    className="p-3 flex items-center justify-between hover:bg-stone-100/60 cursor-pointer transition-colors opacity-60 group"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-medium line-through text-stone-500">
                        {item.name}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCartItem(item.id);
                      }}
                      className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center space-y-3">
          <ShoppingCart className="w-10 h-10 text-stone-300 mx-auto" />
          <h4 className="font-bold text-stone-700">Votre liste de courses est vide</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Ouvrez n'importe quelle fiche recette et cliquez sur « Ajouter tous les ingrédients » pour remplir votre panier automatiquement !
          </p>
        </div>
      )}
    </div>
  );
};
