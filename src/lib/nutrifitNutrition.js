import { nutrifitFoods } from '../data/nutrifitFoods';

export const ACTIVITY = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

const KCAL_PER_G = { protein: 4, carbs: 4, fat: 9 };

export function fmt(n, d = 1) {
  return Number(n.toFixed(d));
}

function roundMacro(value, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function kcalFromMacros({ protein, carbs, fat }) {
  return protein * KCAL_PER_G.protein + carbs * KCAL_PER_G.carbs + fat * KCAL_PER_G.fat;
}

const ZERO_NUTRIENTS = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

export function scaleNutrients(food, grams) {
  if (!food || grams <= 0) return { ...ZERO_NUTRIENTS };

  const factor = grams / 100;
  const protein = food.protein * factor;
  const carbs = food.carbs * factor;
  const fat = food.fat * factor;
  const fiber = food.fiber * factor;

  return {
    kcal: roundMacro(kcalFromMacros({ protein, carbs, fat }), 1),
    protein: roundMacro(protein),
    carbs: roundMacro(carbs),
    fat: roundMacro(fat),
    fiber: roundMacro(fiber),
  };
}

export function sumMealNutrients(mealItems) {
  const items = mealItems.map(entry => ({
    ...entry,
    nutrients: scaleNutrients(entry.food, entry.grams),
  }));

  const summed = items.reduce(
    (acc, { nutrients: n }) => ({
      protein: acc.protein + n.protein,
      carbs: acc.carbs + n.carbs,
      fat: acc.fat + n.fat,
      fiber: acc.fiber + n.fiber,
    }),
    { protein: 0, carbs: 0, fat: 0, fiber: 0 },
  );

  const total = {
    kcal: roundMacro(kcalFromMacros(summed), 0),
    protein: roundMacro(summed.protein),
    carbs: roundMacro(summed.carbs),
    fat: roundMacro(summed.fat),
    fiber: roundMacro(summed.fiber),
  };

  return { items, total };
}

export function nutrientsPer100(food) {
  return scaleNutrients(food, 100);
}

export function buildCustomFood({ name, category, protein, carbs, fat, fiber }) {
  const trimmed = name?.trim();
  if (!trimmed) return null;

  const p = Math.max(0, parseFloat(protein) || 0);
  const c = Math.max(0, parseFloat(carbs) || 0);
  const f = Math.max(0, parseFloat(fat) || 0);
  const fib = Math.max(0, parseFloat(fiber) || 0);

  return {
    id: `custom-${Date.now()}`,
    name: trimmed,
    category: category || 'outro',
    kcal: Math.round(kcalFromMacros({ protein: p, carbs: c, fat: f })),
    protein: p,
    carbs: c,
    fat: f,
    fiber: fib,
    custom: true,
  };
}

export { nutrifitFoods };
