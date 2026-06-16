import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NutriFit from './NutriFit';
import { AppContext } from '../AppContext';

const mockContextValue = {
  lang: 'pt',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  tr: {
    headline: 'NutriFit',
    sub: 'Plataforma de nutrição',
    badge: 'Badge',
    tabs: { calories: 'Calorias', nutrition: 'Nutrição', chat: 'IA' },
    features: [
      { icon: '🔥', title: 'Calculadora', desc: 'Calcular' },
      { icon: '🥗', title: 'Tabela', desc: 'Nutrientes' },
      { icon: '✨', title: 'IA', desc: 'Assistente' },
    ],
    footer: 'Footer',
    menu: {
      theme: 'Tema',
      dark: 'Escuro',
      light: 'Claro',
      language: 'Idioma',
      portuguese: 'Português',
      english: 'English',
    },
    calorie: {
      title: 'Calculadora',
      desc: 'Descrição',
      sex: 'Sexo',
      male: 'Masculino',
      female: 'Feminino',
      age: 'Idade',
      weight: 'Peso',
      height: 'Altura',
      activity: 'Atividade',
      activityLevels: {
        sedentary: 'Sedentário',
        light: 'Leve',
        moderate: 'Moderado',
        active: 'Ativo',
        very: 'Muito ativo',
      },
      goal: 'Objetivo',
      goals: { maintain: 'Manter', lose: 'Perder', gain: 'Ganhar' },
      calculate: 'Calcular',
      askAi: 'Analisar com IA',
      generateDiet: 'Gerar plano',
      results: 'Resultados',
      bmr: 'TMB',
      tdee: 'GET',
      target: 'Meta',
      kcalDay: 'kcal/dia',
      disclaimer: 'Aviso',
    },
    nutrition: {
      title: 'Tabela Nutricional',
      desc: 'Descrição',
      search: 'Buscar',
      category: 'Categoria',
      categories: {
        all: 'Todos',
        fruta: 'Frutas',
        proteina: 'Proteínas',
        carboidrato: 'Carboidratos',
        legume: 'Legumes',
        lacteo: 'Laticínios',
        gordura: 'Gorduras',
        outro: 'Outro',
      },
      food: 'Alimento',
      selectFood: 'Selecione',
      selected: 'Selecionado',
      addFood: 'Adicionar',
      addFoodDesc: 'Descrição',
      foodName: 'Nome',
      foodNamePlaceholder: 'Ex.',
      saveFood: 'Salvar',
      previewKcal: 'Calorias',
      errorName: 'Erro',
      customBadge: 'Personalizado',
      quantity: 'Quantidade',
      per100: 'Por 100g',
      calculated: 'Calculado',
      add: 'Adicionar',
      meal: 'Refeição',
      empty: 'Vazio',
      clear: 'Limpar',
      remove: 'Remover',
      noResults: 'Nenhum',
      total: 'Total',
      kcalNote: 'Nota',
      mealNote: 'Nota refeição',
      cols: { nutrient: 'Nutriente', value: 'Valor' },
      rows: {
        kcal: 'Calorias',
        protein: 'Proteína',
        carbs: 'Carbos',
        fat: 'Gordura',
        fiber: 'Fibra',
      },
      unit: { kcal: 'kcal', g: 'g' },
    },
    chat: {
      title: 'Chat',
      desc: 'Chat desc',
    },
  },
};

describe('NutriFit Page Component', () => {
  const renderWithContext = () => {
    return render(
      <AppContext.Provider value={mockContextValue}>
        <NutriFit />
      </AppContext.Provider>
    );
  };

  it('should render without crashing', () => {
    const { container } = renderWithContext();
    expect(container.querySelector('.nf-app')).toBeInTheDocument();
  });

  it('should render main app structure', () => {
    const { container } = renderWithContext();
    expect(container.querySelector('.nf-app')).toBeTruthy();
    expect(container.querySelector('.nf-header')).toBeTruthy();
    expect(container.querySelector('.nf-hero')).toBeTruthy();
    expect(container.querySelector('.nf-footer')).toBeTruthy();
  });

  it('should render hero section with features', () => {
    const { container } = renderWithContext();
    const features = container.querySelectorAll('.nf-feature');
    expect(features.length).toBe(3);
  });

  it('should render tabs navigation', () => {
    const { container } = renderWithContext();
    const tabs = container.querySelectorAll('.nf-tab');
    expect(tabs.length).toBe(3);
  });

  it('should render main content', () => {
    const { container } = renderWithContext();
    expect(container.querySelector('.nf-main')).toBeInTheDocument();
  });

  it('should have accessible structure', () => {
    const { container } = renderWithContext();
    const nav = container.querySelector('[aria-label="Ferramentas NutriFit"]');
    expect(nav).toBeInTheDocument();
  });
});
