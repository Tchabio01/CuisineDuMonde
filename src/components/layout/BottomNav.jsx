import React from 'react';
import { Home, Compass, CalendarDays, Refrigerator, ShoppingCart, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const { favorites } = useFavorites();
  const { cartItems } = useShoppingCart();

  const uncompletedCartCount = cartItems.filter(item => !item.completed).length;

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'explore', label: 'Explorer', icon: Compass },
    { id: 'planner', label: 'Planning', icon: CalendarDays },
    { id: 'fridge', label: 'Mon Frigo', icon: Refrigerator, highlight: true },
    { id: 'cart', label: 'Courses', icon: ShoppingCart, badge: uncompletedCartCount },
    { id: 'favorites', label: 'Favoris', icon: Heart, badge: favorites.length },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 pb-safe shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-brand-600 font-bold scale-105'
                  : 'text-stone-500 hover:text-stone-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.highlight && !isActive ? 'text-brand-500' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center leading-tight shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-none">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
