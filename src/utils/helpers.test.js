import { describe, it, expect } from 'vitest';
import {
  profileLines,
  buildCalorieAiPrompt,
  buildDietAiPrompt,
  calculateBmr,
  calculateTdee,
  calculateTarget,
} from './helpers';
import { ACTIVITY } from '../lib/nutrifitNutrition';

describe('Helper Functions', () => {
  describe('profileLines', () => {
    const mockLabels = {
      male: 'Masculino',
      female: 'Feminino',
      activityLevels: {
        sedentary: 'Sedentário',
        light: 'Leve',
        moderate: 'Moderado',
        active: 'Ativo',
        very: 'Muito ativo',
      },
      goals: {
        maintain: 'Manter',
        lose: 'Perder',
        gain: 'Ganhar',
      },
    };

    it('should generate Portuguese profile lines', () => {
      const result = profileLines({
        sex: 'male',
        age: 30,
        weight: 80,
        height: 180,
        activity: 'moderate',
        goal: 'maintain',
        labels: mockLabels,
        lang: 'pt',
      });

      expect(result).toContain('Sexo: Masculino');
      expect(result).toContain('Idade: 30 anos');
      expect(result).toContain('Peso: 80 kg');
      expect(result).toContain('Altura: 180 cm');
    });

    it('should generate English profile lines', () => {
      const result = profileLines({
        sex: 'female',
        age: 25,
        weight: 65,
        height: 165,
        activity: 'light',
        goal: 'lose',
        labels: mockLabels,
        lang: 'en',
      });

      expect(result).toContain('Sex: Feminino');
      expect(result).toContain('Age: 25 years');
      expect(result).toContain('Weight: 65 kg');
      expect(result).toContain('Height: 165 cm');
    });

    it('should include activity level in Portuguese', () => {
      const result = profileLines({
        sex: 'male',
        age: 30,
        weight: 80,
        height: 180,
        activity: 'very',
        goal: 'gain',
        labels: mockLabels,
        lang: 'pt',
      });

      expect(result).toContain('Atividade: Muito ativo');
    });

    it('should include goal in Portuguese', () => {
      const result = profileLines({
        sex: 'female',
        age: 25,
        weight: 65,
        height: 165,
        activity: 'moderate',
        goal: 'lose',
        labels: mockLabels,
        lang: 'pt',
      });

      expect(result).toContain('Objetivo: Perder');
    });
  });

  describe('buildCalorieAiPrompt', () => {
    const mockLabels = {
      male: 'Masculino',
      female: 'Feminino',
      activityLevels: {
        moderate: 'Moderado',
      },
      goals: {
        maintain: 'Manter',
      },
    };

    it('should build Portuguese calorie prompt', () => {
      const result = buildCalorieAiPrompt({
        sex: 'male',
        age: 30,
        weight: 80,
        height: 180,
        activity: 'moderate',
        goal: 'maintain',
        labels: mockLabels,
        lang: 'pt',
      });

      expect(result).toContain('Por favor, analise');
      expect(result).toContain('TMB');
      expect(result).toContain('GET');
    });

    it('should build English calorie prompt', () => {
      const result = buildCalorieAiPrompt({
        sex: 'female',
        age: 25,
        weight: 65,
        height: 165,
        activity: 'moderate',
        goal: 'lose',
        labels: mockLabels,
        lang: 'en',
      });

      expect(result).toContain('Please analyze');
      expect(result).toContain('BMR');
      expect(result).toContain('TDEE');
    });
  });

  describe('buildDietAiPrompt', () => {
    const mockLabels = {
      male: 'Masculino',
      female: 'Feminino',
      activityLevels: {
        moderate: 'Moderado',
      },
      goals: {
        lose: 'Perder',
      },
    };

    it('should build Portuguese diet prompt', () => {
      const result = buildDietAiPrompt({
        sex: 'female',
        age: 25,
        weight: 65,
        height: 165,
        activity: 'moderate',
        goal: 'lose',
        labels: mockLabels,
        lang: 'pt',
      });

      expect(result).toContain('Com base');
      expect(result).toContain('plano alimentar');
      expect(result).toContain('café da manhã');
    });

    it('should build English diet prompt', () => {
      const result = buildDietAiPrompt({
        sex: 'male',
        age: 30,
        weight: 80,
        height: 180,
        activity: 'moderate',
        goal: 'maintain',
        labels: mockLabels,
        lang: 'en',
      });

      expect(result).toContain('Based on');
      expect(result).toContain('meal plan');
      expect(result).toContain('breakfast');
    });
  });

  describe('calculateBmr', () => {
    it('should calculate male BMR correctly', () => {
      const bmr = calculateBmr('male', 80, 180, 30);
      // 10 * 80 + 6.25 * 180 - 5 * 30 + 5 = 800 + 1125 - 150 + 5 = 1780
      expect(bmr).toBeCloseTo(1780, 0);
    });

    it('should calculate female BMR correctly', () => {
      const bmr = calculateBmr('female', 65, 165, 25);
      // 10 * 65 + 6.25 * 165 - 5 * 25 - 161 = 650 + 1031.25 - 125 - 161 = 1395.25
      expect(bmr).toBeCloseTo(1395, 0);
    });

    it('should handle different values', () => {
      const bmr = calculateBmr('male', 70, 170, 25);
      expect(bmr).toBeGreaterThan(1600);
      expect(bmr).toBeLessThan(1700);
    });
  });

  describe('calculateTdee', () => {
    it('should calculate TDEE correctly for moderate activity', () => {
      const bmr = 1700;
      const tdee = calculateTdee(bmr, ACTIVITY.moderate);
      expect(tdee).toBeCloseTo(2635, 0);
    });

    it('should calculate TDEE for sedentary lifestyle', () => {
      const bmr = 1700;
      const tdee = calculateTdee(bmr, ACTIVITY.sedentary);
      expect(tdee).toBeCloseTo(2040, 0);
    });

    it('should calculate TDEE for very active lifestyle', () => {
      const bmr = 1700;
      const tdee = calculateTdee(bmr, ACTIVITY.very);
      expect(tdee).toBeCloseTo(3230, 0);
    });
  });

  describe('calculateTarget', () => {
    it('should calculate target for weight loss', () => {
      const target = calculateTarget(2500, 'lose');
      expect(target).toBe(2000);
    });

    it('should calculate target for weight gain', () => {
      const target = calculateTarget(2500, 'gain');
      expect(target).toBe(2800);
    });

    it('should calculate target for maintenance', () => {
      const target = calculateTarget(2500, 'maintain');
      expect(target).toBe(2500);
    });

    it('should work with different TDEE values', () => {
      expect(calculateTarget(1800, 'lose')).toBe(1300);
      expect(calculateTarget(1800, 'maintain')).toBe(1800);
      expect(calculateTarget(1800, 'gain')).toBe(2100);
    });
  });
});
