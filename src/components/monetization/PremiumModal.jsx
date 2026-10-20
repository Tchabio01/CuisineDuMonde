import React from 'react';
import { X, Sparkles, Check, ShieldCheck, Lock } from 'lucide-react';

export const PremiumModal = ({ recipe, onClose, onUnlockPreview }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-stone-100 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-brand-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Aperçu Maquette Monétisation
          </span>
          <h3 className="text-xl font-black text-stone-900">
            Recette Exclusive : {recipe.title}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Cette fiche fait partie du catalogue de préparation aux recettes de chefs et partenariats futurs.
          </p>
        </div>

        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2 text-xs text-stone-700">
          <div className="flex items-center space-x-2 font-semibold text-stone-900 mb-1">
            <Lock className="w-4 h-4 text-brand-600" />
            <span>Futurs avantages de l'offre Premium (En cours de conception) :</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Accès aux masterclass vidéo de chefs internationaux</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Calculateur nutritionnel avancé et accords mets & vins</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Navigation 100% sans encarts publicitaires</span>
          </div>
        </div>

        {/* Note de transparence */}
        <div className="text-[11px] text-stone-500 text-center bg-stone-100/60 p-2.5 rounded-xl border border-stone-200/60">
          <em>Note : Aucun module de paiement réel n'est connecté. Vous pouvez déverrouiller la fiche en mode test pour l'examiner.</em>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              onUnlockPreview(recipe);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all text-center"
          >
            Débloquer l'aperçu test
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};
