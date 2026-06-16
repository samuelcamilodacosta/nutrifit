import { describe, it, expect } from 'vitest';
import { t } from './translations';

describe('translations', () => {
  it('should export translations object with pt and en', () => {
    expect(t).toHaveProperty('pt');
    expect(t).toHaveProperty('en');
  });

  describe('Portuguese translations', () => {
    const pt = t.pt;

    it('should have all top-level keys', () => {
      expect(pt).toHaveProperty('headline');
      expect(pt).toHaveProperty('sub');
      expect(pt).toHaveProperty('badge');
      expect(pt).toHaveProperty('tabs');
      expect(pt).toHaveProperty('features');
      expect(pt).toHaveProperty('menu');
      expect(pt).toHaveProperty('calorie');
      expect(pt).toHaveProperty('nutrition');
      expect(pt).toHaveProperty('chat');
    });

    it('should have valid headline', () => {
      expect(typeof pt.headline).toBe('string');
      expect(pt.headline).toBe('NutriFit');
    });

    it('should have calorie section with all required keys', () => {
      const calorie = pt.calorie;
      expect(calorie).toHaveProperty('title');
      expect(calorie).toHaveProperty('desc');
      expect(calorie).toHaveProperty('sex');
      expect(calorie).toHaveProperty('male');
      expect(calorie).toHaveProperty('female');
      expect(calorie).toHaveProperty('goals');
      expect(calorie).toHaveProperty('activityLevels');
    });

    it('should have activity levels', () => {
      const levels = pt.calorie.activityLevels;
      expect(levels).toHaveProperty('sedentary');
      expect(levels).toHaveProperty('light');
      expect(levels).toHaveProperty('moderate');
      expect(levels).toHaveProperty('active');
      expect(levels).toHaveProperty('very');
    });

    it('should have goals', () => {
      const goals = pt.calorie.goals;
      expect(goals).toHaveProperty('maintain');
      expect(goals).toHaveProperty('lose');
      expect(goals).toHaveProperty('gain');
    });

    it('should have nutrition section', () => {
      const nutrition = pt.nutrition;
      expect(nutrition).toHaveProperty('categories');
      expect(nutrition.categories).toHaveProperty('all');
      expect(nutrition.categories).toHaveProperty('fruta');
      expect(nutrition.categories).toHaveProperty('proteina');
    });

    it('should have chat section with suggestions', () => {
      const chat = pt.chat;
      expect(chat).toHaveProperty('title');
      expect(chat).toHaveProperty('suggestions');
      expect(Array.isArray(chat.suggestions)).toBe(true);
      expect(chat.suggestions.length).toBeGreaterThan(0);
    });

    it('should have menu options', () => {
      const menu = pt.menu;
      expect(menu).toHaveProperty('theme');
      expect(menu).toHaveProperty('dark');
      expect(menu).toHaveProperty('light');
      expect(menu).toHaveProperty('language');
    });
  });

  describe('English translations', () => {
    const en = t.en;

    it('should have all top-level keys', () => {
      expect(en).toHaveProperty('headline');
      expect(en).toHaveProperty('sub');
      expect(en).toHaveProperty('badge');
      expect(en).toHaveProperty('tabs');
      expect(en).toHaveProperty('features');
      expect(en).toHaveProperty('menu');
      expect(en).toHaveProperty('calorie');
      expect(en).toHaveProperty('nutrition');
      expect(en).toHaveProperty('chat');
    });

    it('should have valid headline', () => {
      expect(typeof en.headline).toBe('string');
      expect(en.headline).toBe('NutriFit');
    });

    it('should have same activity levels structure as Portuguese', () => {
      const ptLevels = t.pt.calorie.activityLevels;
      const enLevels = t.en.calorie.activityLevels;

      Object.keys(ptLevels).forEach(key => {
        expect(enLevels).toHaveProperty(key);
      });
    });

    it('should have same goals structure as Portuguese', () => {
      const ptGoals = t.pt.calorie.goals;
      const enGoals = t.en.calorie.goals;

      Object.keys(ptGoals).forEach(key => {
        expect(enGoals).toHaveProperty(key);
      });
    });

    it('should have same categories structure as Portuguese', () => {
      const ptCat = t.pt.nutrition.categories;
      const enCat = t.en.nutrition.categories;

      Object.keys(ptCat).forEach(key => {
        expect(enCat).toHaveProperty(key);
      });
    });
  });

  describe('Translation consistency', () => {
    it('should have features array in both languages', () => {
      expect(t.pt.features).toHaveLength(t.en.features.length);
      expect(t.pt.features).toHaveLength(3);
    });

    it('should have same tabs in both languages', () => {
      const ptTabs = Object.keys(t.pt.tabs);
      const enTabs = Object.keys(t.en.tabs);

      ptTabs.forEach(tab => {
        expect(enTabs).toContain(tab);
      });
    });

    it('should have tabs value consistency', () => {
      expect(t.pt.tabs).toHaveProperty('calories');
      expect(t.pt.tabs).toHaveProperty('nutrition');
      expect(t.pt.tabs).toHaveProperty('chat');
    });
  });

  describe('Feature structures', () => {
    it('should have features with icon, title, desc', () => {
      t.pt.features.forEach(feature => {
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('title');
        expect(feature).toHaveProperty('desc');
      });
    });

    it('should have valid icons (emoji)', () => {
      t.pt.features.forEach(feature => {
        expect(typeof feature.icon).toBe('string');
        expect(feature.icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Chat suggestions', () => {
    it('should have suggestions with label and prompt', () => {
      const suggestions = t.pt.chat.suggestions;
      suggestions.forEach(s => {
        expect(s).toHaveProperty('label');
        expect(s).toHaveProperty('prompt');
        expect(typeof s.label).toBe('string');
        expect(typeof s.prompt).toBe('string');
      });
    });

    it('should have minimum number of suggestions', () => {
      expect(t.pt.chat.suggestions.length).toBeGreaterThanOrEqual(3);
      expect(t.en.chat.suggestions.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Nutrient rows and units', () => {
    it('should have consistent rows structure', () => {
      const ptRows = t.pt.nutrition.rows;
      const enRows = t.en.nutrition.rows;

      expect(ptRows).toHaveProperty('kcal');
      expect(ptRows).toHaveProperty('protein');
      expect(ptRows).toHaveProperty('carbs');
      expect(ptRows).toHaveProperty('fat');
      expect(ptRows).toHaveProperty('fiber');

      Object.keys(ptRows).forEach(key => {
        expect(enRows).toHaveProperty(key);
      });
    });

    it('should have units defined', () => {
      const ptUnit = t.pt.nutrition.unit;
      const enUnit = t.en.nutrition.unit;

      expect(ptUnit).toHaveProperty('kcal');
      expect(ptUnit).toHaveProperty('g');

      expect(enUnit).toHaveProperty('kcal');
      expect(enUnit).toHaveProperty('g');
    });
  });
});
