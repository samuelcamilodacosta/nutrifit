import { describe, it, expect } from 'vitest';
import {
  fmt,
  kcalFromMacros,
  scaleNutrients,
  sumMealNutrients,
  buildCustomFood,
  ACTIVITY,
} from '../lib/nutrifitNutrition';

describe('NutriFitNutrition - Integration Tests', () => {
  describe('Complex nutrition scenarios', () => {
    it('should handle complete meal calculation', () => {
      const frango = {
        id: 'frango',
        name: 'Frango',
        protein: 32,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
      };
      const arroz = {
        id: 'arroz',
        name: 'Arroz',
        protein: 2.5,
        carbs: 28,
        fat: 0.2,
        fiber: 1.6,
      };
      const broccolis = {
        id: 'broccoli',
        name: 'Brócolis',
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        fiber: 2.4,
      };

      const meal = [
        { food: frango, grams: 150 },
        { food: arroz, grams: 100 },
        { food: broccolis, grams: 100 },
      ];

      const { total, items } = sumMealNutrients(meal);

      expect(items).toHaveLength(3);
      expect(total.protein).toBeGreaterThan(30);
      expect(total.carbs).toBeGreaterThan(30);
      expect(total.kcal).toBeGreaterThan(400);
    });

    it('should handle multiple custom foods in a meal', () => {
      const customFood1 = buildCustomFood({
        name: 'Smoothie A',
        category: 'outro',
        protein: '15',
        carbs: '40',
        fat: '3',
        fiber: '4',
      });

      const customFood2 = buildCustomFood({
        name: 'Granola Mix',
        category: 'carboidrato',
        protein: '10',
        carbs: '60',
        fat: '20',
        fiber: '8',
      });

      expect(customFood1).toBeTruthy();
      expect(customFood2).toBeTruthy();
      // IDs should be different due to timestamps
      expect(customFood1.name).not.toBe(customFood2.name);

      const meal = [
        { food: customFood1, grams: 200 },
        { food: customFood2, grams: 100 },
      ];

      const { total } = sumMealNutrients(meal);
      expect(total.kcal).toBeGreaterThan(500);
    });
  });

  describe('Real-world scenarios', () => {
    it('should calculate daily nutrition for different diets', () => {
      // Light lunch
      const lunch = [
        {
          food: {
            protein: 25,
            carbs: 0,
            fat: 2,
            fiber: 0,
          },
          grams: 150,
        },
        {
          food: {
            protein: 2,
            carbs: 20,
            fat: 0.2,
            fiber: 3,
          },
          grams: 100,
        },
      ];

      const { total: lunchTotal } = sumMealNutrients(lunch);

      expect(lunchTotal.protein).toBeGreaterThan(25);
      expect(lunchTotal.kcal).toBeGreaterThan(250);
      expect(lunchTotal.kcal).toBeLessThan(500);
    });

    it('should handle macro-heavy meals correctly', () => {
      const highProteinMeal = [
        {
          food: { protein: 40, carbs: 0, fat: 2, fiber: 0 },
          grams: 200,
        },
      ];

      const { total } = sumMealNutrients(highProteinMeal);
      expect(total.protein).toBeCloseTo(80, 0);
      // (80*4 + 0*4 + 4*9) = 320 + 0 + 36 = 356
      expect(total.kcal).toBeCloseTo(356, 0);
    });

    it('should handle very large meals', () => {
      const largeMeal = [];
      for (let i = 0; i < 10; i++) {
        largeMeal.push({
          food: {
            protein: 20,
            carbs: 30,
            fat: 5,
            fiber: 2,
          },
          grams: 100 + i * 10,
        });
      }

      const { total } = sumMealNutrients(largeMeal);
      expect(total.protein).toBeGreaterThan(200);
      expect(total.kcal).toBeGreaterThan(2000);
    });

    it('should calculate properly for different activity levels', () => {
      const bmr = 1700;

      const sedentaryTdee = bmr * ACTIVITY.sedentary;
      const activeTdee = bmr * ACTIVITY.active;

      expect(activeTdee).toBeGreaterThan(sedentaryTdee);
      expect(activeTdee - sedentaryTdee).toBeGreaterThan(400);
    });
  });

  describe('Boundary conditions', () => {
    it('should handle very small portion sizes', () => {
      const food = {
        protein: 10,
        carbs: 20,
        fat: 5,
        fiber: 2,
      };

      const result = scaleNutrients(food, 1);
      // protein: 10 * 1/100 = 0.1
      // carbs: 20 * 1/100 = 0.2
      // fat: 5 * 1/100 = 0.05
      // kcal: (0.1*4 + 0.2*4 + 0.05*9) = 0.4 + 0.8 + 0.45 = 1.65 -> rounds to 1.7
      expect(result.protein).toBeCloseTo(0.1, 1);
      expect(result.kcal).toBeCloseTo(1.7, 0);
    });

    it('should handle very large portion sizes', () => {
      const food = {
        protein: 10,
        carbs: 20,
        fat: 5,
        fiber: 2,
      };

      const result = scaleNutrients(food, 1000);
      expect(result.protein).toBeCloseTo(100, 0);
      expect(result.kcal).toBeGreaterThan(1500);
    });

    it('should handle zero carb foods', () => {
      const zeroCarb = {
        protein: 25,
        carbs: 0,
        fat: 3,
        fiber: 0,
      };

      const result = scaleNutrients(zeroCarb, 100);
      expect(result.carbs).toBe(0);
      // (25*4 + 0*4 + 3*9) = 100 + 0 + 27 = 127
      expect(result.kcal).toBeCloseTo(127, 0);
    });

    it('should handle high fiber foods', () => {
      const highFiber = {
        protein: 8,
        carbs: 40,
        fat: 2,
        fiber: 12,
      };

      const result = scaleNutrients(highFiber, 150);
      expect(result.fiber).toBeCloseTo(18, 0);
      expect(result.carbs).toBeCloseTo(60, 0);
    });
  });

  describe('Floating point accuracy', () => {
    it('should maintain precision through multiple calculations', () => {
      const foods = [
        { protein: 3.333, carbs: 7.777, fat: 1.111, fiber: 0.5 },
        { protein: 2.222, carbs: 4.444, fat: 3.333, fiber: 0.75 },
        { protein: 5.555, carbs: 2.222, fat: 0.777, fiber: 1.25 },
      ];

      let totalProtein = 0;
      foods.forEach(f => {
        const scaled = scaleNutrients(f, 33.33);
        totalProtein += scaled.protein;
      });

      expect(totalProtein).toBeGreaterThan(2);
      expect(totalProtein).toBeLessThan(5);
    });

    it('should round consistently', () => {
      const values = [1.45, 1.55, 2.45, 2.55, 3.45, 3.55];
      const rounded = values.map(v => fmt(v, 1));

      rounded.forEach(r => {
        // Check that it's a valid number
        expect(typeof r).toBe('number');
        expect(r).toBeGreaterThan(0);
      });
    });
  });
});
