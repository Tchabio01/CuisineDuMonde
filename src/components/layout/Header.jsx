import React from 'react';
import { Compass, Sparkles, ChefHat } from 'lucide-react';

export const Header = ({ onOpenFridge }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-stone-900 leading-none">
              Cuisine du Monde
            </h1>
            <p className="text-[11px] font-medium text-stone-500 flex items-center mt-0.5">
              <span>Saveurs authentiques & voyages culinaires</span>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFridge}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors shadow-xs active:scale-95"
          title="Ouvrir l'assistant frigo"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span className="hidden sm:inline">Assistant</span>
          <span>Mon Frigo</span>
        </button>
      </div>
    </header>
  );
};
