import { nutrifitFoods, kcalFromMacros, fmt } from '../lib/nutrifitNutrition';

export function profileLines({ sex, age, weight, height, activity, goal, labels, lang }) {
  const sexLabel = sex === 'male' ? labels.male : labels.female;
  const activityLabel = labels.activityLevels[activity];
  const goalLabel = labels.goals[goal];

  if (lang === 'en') {
    return `- Sex: ${sexLabel}
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Activity: ${activityLabel}
- Goal: ${goalLabel}`;
  }

  return `- Sexo: ${sexLabel}
- Idade: ${age} anos
- Peso: ${weight} kg
- Altura: ${height} cm
- Atividade: ${activityLabel}
- Objetivo: ${goalLabel}`;
}

export function buildCalorieAiPrompt(fields) {
  const { lang } = fields;
  const profile = profileLines(fields);

  if (lang === 'en') {
    return `Please analyze my nutritional profile:
${profile}

Calculate my BMR, TDEE and daily calorie target, and give practical diet recommendations.`;
  }

  return `Por favor, analise meu perfil nutricional:
${profile}

Calcule minha TMB, GET e meta calórica diária, e dê recomendações práticas de dieta.`;
}

export function buildDietAiPrompt(fields) {
  const { lang } = fields;
  const profile = profileLines(fields);

  if (lang === 'en') {
    return `Based on my nutritional profile:
${profile}

Create a 1-day meal plan with breakfast, lunch, dinner and 1–2 snacks, using basic affordable dishes and ingredients (rice, chicken, eggs, vegetables, fruit, etc.). For each meal, suggest specific dishes, approximate portions and estimated calories. Also include general nutrition tips suited to my goal.`;
  }

  return `Com base no meu perfil nutricional:
${profile}

Crie um plano alimentar de 1 dia com café da manhã, almoço, jantar e 1–2 lanches, usando pratos básicos e ingredientes acessíveis (arroz, frango, ovos, legumes, frutas etc.). Para cada refeição, sugira pratos específicos, porções aproximadas e calorias estimadas. Inclua também dicas gerais de nutrição adequadas ao meu objetivo.`;
}

export function calculateBmr(sex, weight, height, age) {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTdee(bmr, activity) {
  return bmr * activity;
}

export function calculateTarget(tdee, goal) {
  const offset = goal === 'lose' ? -500 : goal === 'gain' ? 300 : 0;
  return tdee + offset;
}
