import { describe, it, expect } from 'vitest';
import {
  fmt,
  kcalFromMacros,
  scaleNutrients,
  sumMealNutrients,
  nutrientsPer100,
  buildCustomFood,
  ACTIVITY,
  nutrifitFoods,
} from './nutrifitNutrition';

describe('nutrifitNutrition - Utility Functions', () => {
  describe('fmt', () => {
    it('should format number with default 1 decimal place', () => {
      expect(fmt(3.14159)).toBe(3.1);
      expect(fmt(2.95)).toBe(3.0);
    });

    it('should format number with custom decimal places', () => {
      expect(fmt(3.14159, 2)).toBe(3.14);
      expect(fmt(123.456, 0)).toBe(123);
      expect(fmt(0.123456, 3)).toBe(0.123);
    });

    it('should handle edge cases', () => {
      expect(fmt(0)).toBe(0);
      expect(fmt(-5.555, 1)).toBe(-5.6);
    });
  });

  describe('kcalFromMacros', () => {
    it('should calculate calories from macros correctly', () => {
      const result = kcalFromMacros({ protein: 10, carbs: 20, fat: 5 });
      // (10 * 4) + (20 * 4) + (5 * 9) = 40 + 80 + 45 = 165
      expect(result).toBe(165);
    });

    it('should handle zero macros', () => {
      expect(kcalFromMacros({ protein: 0, carbs: 0, fat: 0 })).toBe(0);
    });

    it('should handle decimal macros', () => {
      const result = kcalFromMacros({ protein: 5.5, carbs: 10.2, fat: 2.3 });
      // (5.5 * 4) + (10.2 * 4) + (2.3 * 9) = 22 + 40.8 + 20.7 = 83.5
      expect(result).toBeCloseTo(83.5, 1);
    });
  });

  describe('ACTIVITY', () => {
    it('should have all activity levels with correct multipliers', () => {
      expect(ACTIVITY.sedentary).toBe(1.2);
      expect(ACTIVITY.light).toBe(1.375);
      expect(ACTIVITY.moderate).toBe(1.55);
      expect(ACTIVITY.active).toBe(1.725);
      expect(ACTIVITY.very).toBe(1.9);
    });
  });

  describe('scaleNutrients', () => {
    const testFood = {
      id: 'test',
      name: 'Test Food',
      protein: 10,
      carbs: 20,
      fat: 5,
      fiber: 2,
    };

    it('should scale nutrients correctly for 100g (no scale)', () => {
      const result = scaleNutrients(testFood, 100);
      // (10 * 4) + (20 * 4) + (5 * 9) = 40 + 80 + 45 = 165
      expect(result).toEqual({
        kcal: 165,
        protein: 10,
        carbs: 20,
        fat: 5,
        fiber: 2,
      });
    });

    it('should scale nutrients for 50g', () => {
      const result = scaleNutrients(testFood, 50);
      // (5 * 4) + (10 * 4) + (2.5 * 9) = 20 + 40 + 22.5 = 82.5
      expect(result).toEqual({
        kcal: 82.5,
        protein: 5,
        carbs: 10,
        fat: 2.5,
        fiber: 1,
      });
    });

    it('should return zero nutrients for invalid inputs', () => {
      const zero = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
      
      expect(scaleNutrients(null, 100)).toEqual(zero);
      expect(scaleNutrients(testFood, 0)).toEqual(zero);
      expect(scaleNutrients(testFood, -10)).toEqual(zero);
    });

    it('should round macros to 1 decimal place', () => {
      const food = {
        id: 'test',
        protein: 3.333,
        carbs: 7.777,
        fat: 1.666,
        fiber: 0.5,
      };
      const result = scaleNutrients(food, 33);
      expect(result.protein).toBeCloseTo(1.1, 0);
      expect(result.carbs).toBeCloseTo(2.6, 0);
    });
  });

  describe('sumMealNutrients', () => {
    const food1 = {
      id: 'frango',
      name: 'Frango',
      protein: 32,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
    };
    const food2 = {
      id: 'arroz',
      name: 'Arroz',
      protein: 2.5,
      carbs: 28,
      fat: 0.2,
      fiber: 1.6,
    };

    it('should sum meal nutrients correctly', () => {
      const meal = [
        { food: food1, grams: 100 },
        { food: food2, grams: 150 },
      ];
      const { total } = sumMealNutrients(meal);
      
      expect(total).toHaveProperty('kcal');
      expect(total).toHaveProperty('protein');
      expect(total).toHaveProperty('carbs');
      expect(total).toHaveProperty('fat');
      expect(total).toHaveProperty('fiber');
      expect(total.protein).toBeGreaterThan(0);
    });

    it('should return items with calculated nutrients', () => {
      const meal = [{ food: food1, grams: 100 }];
      const { items } = sumMealNutrients(meal);
      
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveProperty('nutrients');
      expect(items[0].nutrients.kcal).toBeGreaterThan(0);
    });

    it('should handle empty meal', () => {
      const { total } = sumMealNutrients([]);
      
      expect(total.protein).toBe(0);
      expect(total.carbs).toBe(0);
      expect(total.fat).toBe(0);
      expect(total.fiber).toBe(0);
      expect(total.kcal).toBe(0);
    });

    it('should calculate meal total calories from macros', () => {
      const meal = [{ food: food1, grams: 100 }];
      const { total } = sumMealNutrients(meal);
      
      const expected = kcalFromMacros({
        protein: total.protein,
        carbs: total.carbs,
        fat: total.fat,
      });
      expect(total.kcal).toBe(fmt(expected, 0));
    });
  });

  describe('nutrientsPer100', () => {
    it('should return nutrients scaled to 100g', () => {
      const food = {
        id: 'test',
        protein: 10,
        carbs: 20,
        fat: 5,
        fiber: 2,
      };
      const result = nutrientsPer100(food);
      
      expect(result.protein).toBe(10);
      expect(result.carbs).toBe(20);
      expect(result.fat).toBe(5);
      expect(result.fiber).toBe(2);
    });
  });

  describe('buildCustomFood', () => {
    it('should build custom food with all valid inputs', () => {
      const food = buildCustomFood({
        name: 'Meu Alimento',
        category: 'proteina',
        protein: '20',
        carbs: '10',
        fat: '5',
        fiber: '2',
      });

      expect(food).toBeTruthy();
      expect(food.id).toMatch(/^custom-\d+$/);
      expect(food.name).toBe('Meu Alimento');
      expect(food.category).toBe('proteina');
      expect(food.protein).toBe(20);
      expect(food.custom).toBe(true);
    });

    it('should return null for empty name', () => {
      const food = buildCustomFood({
        name: '',
        category: 'outro',
        protein: '10',
        carbs: '20',
        fat: '5',
        fiber: '1',
      });
      expect(food).toBeNull();
    });

    it('should return null for whitespace-only name', () => {
      const food = buildCustomFood({
        name: '   ',
        category: 'outro',
        protein: '10',
        carbs: '20',
        fat: '5',
        fiber: '1',
      });
      expect(food).toBeNull();
    });

    it('should handle negative macros by converting to 0', () => {
      const food = buildCustomFood({
        name: 'Teste',
        category: 'outro',
        protein: '-5',
        carbs: '-10',
        fat: '-2',
        fiber: '-1',
      });

      expect(food.protein).toBe(0);
      expect(food.carbs).toBe(0);
      expect(food.fat).toBe(0);
      expect(food.fiber).toBe(0);
    });

    it('should parse float strings correctly', () => {
      const food = buildCustomFood({
        name: 'Teste',
        category: 'outro',
        protein: '15.5',
        carbs: '25.3',
        fat: '8.7',
        fiber: '3.2',
      });

      expect(food.protein).toBe(15.5);
      expect(food.carbs).toBe(25.3);
      expect(food.fat).toBe(8.7);
      expect(food.fiber).toBe(3.2);
    });

    it('should use default category if not provided', () => {
      const food = buildCustomFood({
        name: 'Teste',
        protein: '10',
        carbs: '20',
        fat: '5',
        fiber: '1',
      });

      expect(food.category).toBe('outro');
    });

    it('should calculate kcal correctly for custom food', () => {
      const food = buildCustomFood({
        name: 'Teste',
        category: 'outro',
        protein: '10',
        carbs: '20',
        fat: '5',
        fiber: '1',
      });

      const expectedKcal = Math.round(kcalFromMacros({
        protein: 10,
        carbs: 20,
        fat: 5,
      }));
      expect(food.kcal).toBe(expectedKcal);
    });

    it('should trim whitespace from food name', () => {
      const food = buildCustomFood({
        name: '  Meu Alimento  ',
        category: 'outro',
        protein: '10',
        carbs: '20',
        fat: '5',
        fiber: '1',
      });

      expect(food.name).toBe('Meu Alimento');
    });

    it('should handle non-numeric string inputs', () => {
      const food = buildCustomFood({
        name: 'Teste',
        category: 'outro',
        protein: 'abc',
        carbs: 'def',
        fat: 'ghi',
        fiber: 'jkl',
      });

      expect(food.protein).toBe(0);
      expect(food.carbs).toBe(0);
      expect(food.fat).toBe(0);
      expect(food.fiber).toBe(0);
    });
  });

  describe('nutrifitFoods', () => {
    it('should export foods array', () => {
      expect(Array.isArray(nutrifitFoods)).toBe(true);
      expect(nutrifitFoods.length).toBeGreaterThan(0);
    });

    it('should have foods with required properties', () => {
      nutrifitFoods.slice(0, 5).forEach(food => {
        expect(food).toHaveProperty('id');
        expect(food).toHaveProperty('name');
        expect(food).toHaveProperty('category');
        expect(food).toHaveProperty('kcal');
        expect(food).toHaveProperty('protein');
        expect(food).toHaveProperty('carbs');
        expect(food).toHaveProperty('fat');
        expect(food).toHaveProperty('fiber');
      });
    });
  });
});
