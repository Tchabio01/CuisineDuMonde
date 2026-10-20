import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';

export const SponsoredCard = () => {
  return (
    <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 my-4 flex items-center justify-between text-xs text-stone-600">
      <div className="flex items-center space-x-3">
        <span className="bg-stone-200 text-stone-600 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          Partenariat
        </span>
        <span className="font-medium text-stone-700">
          Épices du Monde & Coffrets Découverte artisanaux
        </span>
      </div>
      <div className="flex items-center space-x-1 text-brand-600 font-semibold cursor-pointer hover:underline">
        <span className="hidden sm:inline">Encart démonstration</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
