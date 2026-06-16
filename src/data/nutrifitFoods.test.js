import { describe, it, expect } from 'vitest';
import { nutrifitFoods } from '../data/nutrifitFoods';

describe('Nutrition Data - nutrifitFoods', () => {
  it('should have substantial food database', () => {
    expect(nutrifitFoods.length).toBeGreaterThan(40);
  });

  it('should have foods from main categories', () => {
    const categories = new Set(nutrifitFoods.map(f => f.category));
    expect(categories).toContain('carboidrato');
    expect(categories).toContain('proteina');
    expect(categories).toContain('fruta');
    expect(categories).toContain('lacteo');
    expect(categories).toContain('legume');
    expect(categories).toContain('gordura');
  });

  it('should have proteins in database', () => {
    const proteins = nutrifitFoods.filter(f => f.category === 'proteina');
    expect(proteins.length).toBeGreaterThan(0);
    expect(proteins.map(f => f.name)).toEqual(
      expect.arrayContaining(['Peito de frango grelhado', 'Atum em água'])
    );
  });

  it('should have carbs in database', () => {
    const carbs = nutrifitFoods.filter(f => f.category === 'carboidrato');
    expect(carbs.length).toBeGreaterThan(0);
    expect(carbs.map(f => f.name)).toEqual(
      expect.arrayContaining(['Arroz branco cozido', 'Aveia em flocos'])
    );
  });

  it('should have fruits in database', () => {
    const fruits = nutrifitFoods.filter(f => f.category === 'fruta');
    expect(fruits.length).toBeGreaterThan(0);
  });

  it('should have all required food properties', () => {
    nutrifitFoods.slice(0, 10).forEach(food => {
      expect(food).toHaveProperty('id');
      expect(food).toHaveProperty('name');
      expect(food).toHaveProperty('category');
      expect(food).toHaveProperty('kcal');
      expect(food).toHaveProperty('protein');
      expect(food).toHaveProperty('carbs');
      expect(food).toHaveProperty('fat');
      expect(food).toHaveProperty('fiber');

      expect(typeof food.id).toBe('string');
      expect(typeof food.name).toBe('string');
      expect(typeof food.kcal).toBe('number');
      expect(typeof food.protein).toBe('number');
      expect(typeof food.carbs).toBe('number');
      expect(typeof food.fat).toBe('number');
      expect(typeof food.fiber).toBe('number');
    });
  });

  it('should have unique food IDs', () => {
    const ids = nutrifitFoods.map(f => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have foods with reasonable nutritional values', () => {
    nutrifitFoods.forEach(food => {
      expect(food.kcal).toBeGreaterThanOrEqual(0);
      expect(food.kcal).toBeLessThanOrEqual(1000);
      expect(food.protein).toBeGreaterThanOrEqual(0);
      expect(food.carbs).toBeGreaterThanOrEqual(0);
      expect(food.fat).toBeGreaterThanOrEqual(0);
      expect(food.fiber).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have diverse foods per category', () => {
    const proteins = nutrifitFoods.filter(f => f.category === 'proteina');
    const carbs = nutrifitFoods.filter(f => f.category === 'carboidrato');
    const fruits = nutrifitFoods.filter(f => f.category === 'fruta');

    expect(proteins.length).toBeGreaterThanOrEqual(5);
    expect(carbs.length).toBeGreaterThanOrEqual(5);
    expect(fruits.length).toBeGreaterThanOrEqual(5);
  });

  it('should calculate reasonable kcal values', () => {
    nutrifitFoods.slice(0, 10).forEach(food => {
      expect(food.kcal).toBeGreaterThanOrEqual(0);
      expect(food.kcal).toBeLessThanOrEqual(1000);
    });
  });

  it('should have proper category values', () => {
    const validCategories = [
      'carboidrato',
      'proteina',
      'fruta',
      'lacteo',
      'legume',
      'gordura',
      'outro',
    ];

    nutrifitFoods.forEach(food => {
      expect(validCategories).toContain(food.category);
    });
  });

  it('should find specific common foods', () => {
    const names = nutrifitFoods.map(f => f.name);

    const hasChicken = names.some(n => n.includes('frango'));
    const hasRice = names.some(n => n.includes('Arroz'));
    
    expect(hasChicken || hasRice).toBe(true);
  });
});
