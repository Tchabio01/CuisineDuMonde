import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Utensils, X } from 'lucide-react';

const STORAGE_KEY = 'cdm_meal_plan_v1';

const DAYS = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi',
  'Vendredi', 'Samedi', 'Dimanche'
];

const MEALS = [
  { id: 'lunch', label: 'Déjeuner' },
  { id: 'dinner', label: 'Dîner' }
];

function getMonday(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const day = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - day);
  return result;
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function displayDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short'
  }).format(date);
}

function loadPlan() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    console.error('Impossible de lire le planning :', error);
    return {};
  }
}

export function MealPlanner({ recipes, onSelectRecipe }) {
  const [plan, setPlan] = useState(loadPlan);
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch (error) {
      console.error('Impossible de sauvegarder le planning :', error);
    }
  }, [plan]);

  const weekDays = useMemo(
    () => DAYS.map((label, index) => ({
      label,
      date: addDays(weekStart, index)
    })),
    [weekStart]
  );

  const plannedCount = weekDays.reduce((count, day) => {
    return count + MEALS.filter(meal => plan[`${dateKey(day.date)}-${meal.id}`]).length;
  }, 0);

  const weekLabel = `${displayDate(weekStart)} – ${displayDate(addDays(weekStart, 6))}`;

  function changeMeal(date, mealId, recipeId) {
    const key = `${dateKey(date)}-${mealId}`;

    setPlan(previous => {
      const next = { ...previous };

      if (recipeId) {
        next[key] = recipeId;
      } else {
        delete next[key];
      }

      return next;
    });
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 to-amber-950 text-white p-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <CalendarDays className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-black">Mon planning repas</h2>
            <p className="text-sm text-stone-300">
              Organisez votre semaine, à votre rythme.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
          <button
            type="button"
            onClick={() => setWeekStart(date => addDays(date, -7))}
            className="rounded-xl p-2 hover:bg-white/10"
            aria-label="Semaine précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="font-bold">{weekLabel}</p>
            <p className="text-xs text-stone-300">
              {plannedCount}/14 repas planifiés
            </p>
          </div>

          <button
            type="button"
            onClick={() => setWeekStart(date => addDays(date, 7))}
            className="rounded-xl p-2 hover:bg-white/10"
            aria-label="Semaine suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setWeekStart(getMonday(new Date()))}
          className="mt-3 text-xs font-bold text-amber-300 underline underline-offset-4"
        >
          Revenir à cette semaine
        </button>
      </div>

      <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
        <Clock3 className="w-5 h-5 shrink-0 mt-0.5" />
        <p>Choisissez une recette pour chaque repas. Vos choix sont enregistrés sur cet appareil, même hors ligne.</p>
      </div>

      <div className="space-y-4">
        {weekDays.map(({ label, date }) => (
          <article
            key={dateKey(date)}
            className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-extrabold text-stone-900">{label}</h3>
              <span className="text-xs text-stone-500">{displayDate(date)}</span>
            </div>

            <div className="space-y-3">
              {MEALS.map(meal => {
                const key = `${dateKey(date)}-${meal.id}`;
                const recipeId = plan[key];
                const recipe = recipes.find(item => item.id === recipeId);

                return (
                  <div key={meal.id} className="rounded-xl bg-stone-50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-700">
                      <Utensils className="w-4 h-4 text-amber-700" />
                      {meal.label}
                    </div>

                    <select
                      value={recipeId || ''}
                      onChange={event => changeMeal(date, meal.id, event.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      aria-label={`${meal.label} du ${label}`}
                    >
                      <option value="">Choisir une recette…</option>
                      {recipes.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.flag ? `${item.flag} ` : ''}{item.title}
                        </option>
                      ))}
                    </select>

                    {recipe && (
                      <div className="mt-2 flex items-center gap-3">
                        {recipe.image && (
                          <img
                            src={recipe.image}
                            alt=""
                            loading="lazy"
                            className="h-14 w-14 rounded-xl object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-stone-800">{recipe.title}</p>
                          <p className="text-xs text-stone-500">
                            {recipe.country} · {recipe.prepTime + recipe.cookTime} min
                          </p>
                          <button
                            type="button"
                            onClick={() => onSelectRecipe(recipe)}
                            className="mt-1 text-xs font-bold text-amber-800 underline underline-offset-2"
                          >
                            Voir la recette
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => changeMeal(date, meal.id, '')}
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-200"
                          aria-label={`Retirer ${meal.label.toLowerCase()} du ${label}`}
                          title="Retirer ce repas"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <p className="pb-2 text-center text-xs text-stone-500">
        <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
        Planning enregistré sur cet appareil.
      </p>
    </section>
  );
}

export default MealPlanner;
