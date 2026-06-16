import { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { AppContext } from '../AppContext';
import NutriFitChat from '../components/NutriFitChat';
import {
  nutrifitFoods,
  scaleNutrients,
  sumMealNutrients,
  nutrientsPer100,
  buildCustomFood,
  kcalFromMacros,
  fmt,
  ACTIVITY,
} from '../lib/nutrifitNutrition';
import './nutrifit.css';

const GREEN = '#22c55e';

function profileLines({ sex, age, weight, height, activity, goal, labels, lang }) {
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

function buildCalorieAiPrompt(fields) {
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

function buildDietAiPrompt(fields) {
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

const TAB_KEYS = ['calories', 'nutrition', 'chat'];

export default function NutriFit() {
  const { tr, lang, setLang, theme, setTheme } = useContext(AppContext);
  const [tab, setTab] = useState('calories');
  const [pendingChatMessage, setPendingChatMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  const handleAskAi = (fields, mode = 'analyze') => {
    const payload = { ...fields, labels: tr.calorie, lang };
    const prompt = mode === 'diet' ? buildDietAiPrompt(payload) : buildCalorieAiPrompt(payload);
    setPendingChatMessage(prompt);
    setTab('chat');
  };

  const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="nf-app">
      <header className="nf-header">
        <div className="nf-header-inner">
          <div className="nf-brand">
            <div className="nf-logo">N</div>
            <span className="nf-brand-name">{tr.headline}</span>
          </div>
          <div className="nf-header-controls">
            <button 
              type="button" 
              className="nf-menu-btn"
              onClick={() => setShowMenu(!showMenu)}
              title="Preferências"
            >
              <span className="nf-menu-icon">⚙️</span>
            </button>
            {showMenu && (
              <div className="nf-menu-dropdown" ref={menuRef}>
                <div className="nf-menu-section">
                  <span className="nf-menu-label">{tr.menu.theme}</span>
                  <div className="nf-menu-options">
                    <button
                      type="button"
                      className={`nf-menu-option ${theme === 'dark' ? 'nf-menu-option--active' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <span className="nf-menu-option-icon">🌙</span>
                      <span>{tr.menu.dark}</span>
                    </button>
                    <button
                      type="button"
                      className={`nf-menu-option ${theme === 'light' ? 'nf-menu-option--active' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <span className="nf-menu-option-icon">☀️</span>
                      <span>{tr.menu.light}</span>
                    </button>
                  </div>
                </div>
                <div className="nf-menu-divider" />
                <div className="nf-menu-section">
                  <span className="nf-menu-label">{tr.menu.language}</span>
                  <div className="nf-menu-options">
                    <button
                      type="button"
                      className={`nf-menu-option ${lang === 'pt' ? 'nf-menu-option--active' : ''}`}
                      onClick={() => setLang('pt')}
                    >
                      <span className="nf-menu-option-icon">🇧🇷</span>
                      <span>{tr.menu.portuguese}</span>
                    </button>
                    <button
                      type="button"
                      className={`nf-menu-option ${lang === 'en' ? 'nf-menu-option--active' : ''}`}
                      onClick={() => setLang('en')}
                    >
                      <span className="nf-menu-option-icon">🇺🇸</span>
                      <span>{tr.menu.english}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="nf-hero">
        <div className="nf-hero-inner">
          <span className="nf-hero-badge">{tr.badge}</span>
          <h1 className="nf-hero-title">{tr.headline}</h1>
          <p className="nf-hero-sub">{tr.sub}</p>
          <div className="nf-features">
            {tr.features.map((feat, i) => (
              <button
                key={feat.title}
                type="button"
                className="nf-feature"
                onClick={() => setTab(TAB_KEYS[i])}
              >
                <div className="nf-feature-icon">{feat.icon}</div>
                <span className="nf-feature-title">{feat.title}</span>
                <span className="nf-feature-desc">{feat.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="nf-tabs-wrap">
        <nav className="nf-tabs" aria-label="Ferramentas NutriFit">
          {TAB_KEYS.map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`nf-tab${tab === key ? ' nf-tab--active' : ''}`}
            >
              {tr.tabs[key]}
            </button>
          ))}
        </nav>
      </div>

      <main className={`nf-main${tab === 'chat' ? ' nf-main--chat' : ''}`}>
        {tab === 'calories' && <CalorieCalculator labels={tr.calorie} onAskAi={handleAskAi} />}
        {tab === 'nutrition' && <NutritionCalculator labels={tr.nutrition} />}
        {tab === 'chat' && (
          <NutriFitChat
            labels={tr.chat}
            initialMessage={pendingChatMessage}
            onInitialMessageSent={() => setPendingChatMessage(null)}
          />
        )}
      </main>

      <footer className="nf-footer">
        <div className="nf-footer-inner">
          <span className="nf-footer-text">{tr.footer}</span>
        </div>
      </footer>
    </div>
  );
}

function CalorieCalculator({ labels, onAskAi }) {
  const [sex, setSex] = useState('female');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);

  const getFields = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return null;
    return { sex, age: a, weight: w, height: h, activity, goal };
  };

  const calculate = e => {
    e.preventDefault();
    const fields = getFields();
    if (!fields) return;

    const { weight: w, height: h, age: a } = fields;
    const bmr = sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * ACTIVITY[activity];
    const offset = goal === 'lose' ? -500 : goal === 'gain' ? 300 : 0;

    setResult({ bmr, tdee, target: tdee + offset });
  };

  const askAi = (e, mode = 'analyze') => {
    e.preventDefault();
    const fields = getFields();
    if (!fields) return;
    onAskAi(fields, mode);
  };

  return (
    <div className="nf-panel">
      <h2 className="nf-panel-title">{labels.title}</h2>
      <p className="nf-panel-desc">{labels.desc}</p>

      <form onSubmit={calculate} className="nf-form">
        <Field label={labels.sex}>
          <div className="nf-radio-row">
            {[['female', labels.female], ['male', labels.male]].map(([v, lbl]) => (
              <label key={v} className="nf-radio-label">
                <input type="radio" name="sex" value={v} checked={sex === v} onChange={() => setSex(v)} />
                {lbl}
              </label>
            ))}
          </div>
        </Field>

        <div className="nf-form-grid">
          <Field label={labels.age}>
            <input className="nf-input" type="number" min="10" max="100" value={age} onChange={e => setAge(e.target.value)} />
          </Field>
          <Field label={labels.weight}>
            <input className="nf-input" type="number" min="30" max="300" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} />
          </Field>
          <Field label={labels.height}>
            <input className="nf-input" type="number" min="100" max="250" value={height} onChange={e => setHeight(e.target.value)} />
          </Field>
        </div>

        <Field label={labels.activity}>
          <select className="nf-input" value={activity} onChange={e => setActivity(e.target.value)}>
            {Object.entries(labels.activityLevels).map(([k, lbl]) => (
              <option key={k} value={k}>{lbl}</option>
            ))}
          </select>
        </Field>

        <Field label={labels.goal}>
          <div className="nf-radio-row">
            {Object.entries(labels.goals).map(([k, lbl]) => (
              <label key={k} className="nf-radio-label">
                <input type="radio" name="goal" value={k} checked={goal === k} onChange={() => setGoal(k)} />
                {lbl}
              </label>
            ))}
          </div>
        </Field>

        <div className="nf-btn-row">
          <button type="submit" className="nf-btn">{labels.calculate}</button>
          <button type="button" className="nf-btn-secondary" onClick={e => askAi(e, 'analyze')}>{labels.askAi}</button>
          <button type="button" className="nf-btn-secondary" onClick={e => askAi(e, 'diet')}>{labels.generateDiet}</button>
        </div>
      </form>

      {result && (
        <div className="nf-results">
          <h3 className="nf-results-title">{labels.results}</h3>
          <div className="nf-results-grid">
            <ResultCard label={labels.bmr} value={fmt(result.bmr, 0)} unit={labels.kcalDay} accent={false} />
            <ResultCard label={labels.tdee} value={fmt(result.tdee, 0)} unit={labels.kcalDay} accent={false} />
            <ResultCard label={labels.target} value={fmt(result.target, 0)} unit={labels.kcalDay} accent />
          </div>
          <p className="nf-disclaimer">{labels.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

const CUSTOM_FOOD_DEFAULTS = {
  name: '',
  category: 'outro',
  protein: '',
  carbs: '',
  fat: '',
  fiber: '',
};

const FOOD_CATEGORIES = ['fruta', 'proteina', 'carboidrato', 'legume', 'lacteo', 'gordura', 'outro'];

function NutritionCalculator({ labels }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [foodId, setFoodId] = useState('');
  const [grams, setGrams] = useState('100');
  const [meal, setMeal] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState(CUSTOM_FOOD_DEFAULTS);
  const [customError, setCustomError] = useState('');

  const allFoods = useMemo(
    () => [...nutrifitFoods, ...customFoods],
    [customFoods],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allFoods.filter(f => {
      const matchesQuery = !q || f.name.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || f.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category, allFoods]);

  const selected = foodId ? allFoods.find(f => f.id === foodId) ?? null : null;
  const g = parseFloat(grams) || 0;
  const per100 = selected ? nutrientsPer100(selected) : null;
  const current = selected ? scaleNutrients(selected, g) : null;
  const { items: mealItems, total } = sumMealNutrients(meal);

  const addToMeal = () => {
    if (g <= 0 || !selected) return;
    setMeal(prev => [...prev, { food: selected, grams: g }]);
    setFoodId('');
    setGrams('100');
  };

  const removeFromMeal = index => {
    setMeal(prev => prev.filter((_, i) => i !== index));
  };

  const customPreviewKcal = kcalFromMacros({
    protein: parseFloat(customForm.protein) || 0,
    carbs: parseFloat(customForm.carbs) || 0,
    fat: parseFloat(customForm.fat) || 0,
  });

  const updateCustomForm = (key, value) => {
    setCustomForm(prev => ({ ...prev, [key]: value }));
    if (customError) setCustomError('');
  };

  const saveCustomFood = e => {
    e.preventDefault();
    const food = buildCustomFood(customForm);
    if (!food) {
      setCustomError(labels.errorName);
      return;
    }

    setCustomFoods(prev => [...prev, food]);
    setFoodId(food.id);
    setCategory(food.category);
    setQuery('');
    setCustomForm(CUSTOM_FOOD_DEFAULTS);
    setCustomError('');
    setShowCustomForm(false);
  };

  const nutrientRows = [
    ['kcal', labels.rows.kcal, labels.unit.kcal],
    ['protein', labels.rows.protein, labels.unit.g],
    ['carbs', labels.rows.carbs, labels.unit.g],
    ['fat', labels.rows.fat, labels.unit.g],
    ['fiber', labels.rows.fiber, labels.unit.g],
  ];

  return (
    <div className="nf-nutrition-layout">
      <div className="nf-panel nf-nutrition-panel">
        <header className="nf-nutrition-header">
          <h2 className="nf-panel-title">{labels.title}</h2>
          <p className="nf-panel-desc">{labels.desc}</p>
        </header>

        <section className="nf-nutrition-fields">
          <div className="nf-nutrition-row">
            <Field label={labels.category}>
              <select
                className="nf-input"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {Object.entries(labels.categories).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>

            <Field label={labels.quantity}>
              <input className="nf-input" type="number" min="1" max="2000" value={grams} onChange={e => setGrams(e.target.value)} />
            </Field>
          </div>

          <Field label={labels.food}>
            <div className="nf-food-search-row">
              <input
                className="nf-input"
                type="search"
                placeholder={labels.search}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <select
              className="nf-input nf-input--spaced"
              value={foodId}
              onChange={e => setFoodId(e.target.value)}
            >
              <option value="">{labels.selectFood}</option>
              {filtered.length === 0 ? (
                <option value="" disabled>{labels.noResults}</option>
              ) : (
                filtered.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.custom ? `${f.name} (${labels.customBadge})` : f.name}
                  </option>
                ))
              )}
            </select>
          </Field>
        </section>

        <section className="nf-custom-food">
          <button
            type="button"
            className="nf-custom-food-toggle"
            onClick={() => setShowCustomForm(prev => !prev)}
            aria-expanded={showCustomForm}
          >
            <span>{labels.addFood}</span>
            <span className="nf-custom-food-toggle-icon" aria-hidden>{showCustomForm ? '−' : '+'}</span>
          </button>

          {showCustomForm && (
            <form className="nf-custom-food-form" onSubmit={saveCustomFood}>
              <p className="nf-custom-food-desc">{labels.addFoodDesc}</p>

              <Field label={labels.foodName}>
                <input
                  className="nf-input"
                  type="text"
                  placeholder={labels.foodNamePlaceholder}
                  value={customForm.name}
                  onChange={e => updateCustomForm('name', e.target.value)}
                />
              </Field>

              <Field label={labels.category}>
                <select
                  className="nf-input"
                  value={customForm.category}
                  onChange={e => updateCustomForm('category', e.target.value)}
                >
                  {FOOD_CATEGORIES.map(k => (
                    <option key={k} value={k}>{labels.categories[k]}</option>
                  ))}
                </select>
              </Field>

              <div className="nf-custom-food-macros">
                <Field label={`${labels.rows.protein} (${labels.unit.g}/100 g)`}>
                  <input className="nf-input" type="number" min="0" step="0.1" value={customForm.protein} onChange={e => updateCustomForm('protein', e.target.value)} />
                </Field>
                <Field label={`${labels.rows.carbs} (${labels.unit.g}/100 g)`}>
                  <input className="nf-input" type="number" min="0" step="0.1" value={customForm.carbs} onChange={e => updateCustomForm('carbs', e.target.value)} />
                </Field>
                <Field label={`${labels.rows.fat} (${labels.unit.g}/100 g)`}>
                  <input className="nf-input" type="number" min="0" step="0.1" value={customForm.fat} onChange={e => updateCustomForm('fat', e.target.value)} />
                </Field>
                <Field label={`${labels.rows.fiber} (${labels.unit.g}/100 g)`}>
                  <input className="nf-input" type="number" min="0" step="0.1" value={customForm.fiber} onChange={e => updateCustomForm('fiber', e.target.value)} />
                </Field>
              </div>

              <div className="nf-custom-food-preview">
                <span className="nf-custom-food-preview-label">{labels.previewKcal}</span>
                <span className="nf-custom-food-preview-value">{fmt(customPreviewKcal, 0)} {labels.unit.kcal}</span>
              </div>

              {customError && <p className="nf-custom-food-error">{customError}</p>}

              <button type="submit" className="nf-btn-secondary nf-btn--save-food">
                {labels.saveFood}
              </button>
            </form>
          )}
        </section>

        <section className="nf-nutrition-preview">
          {selected ? (
            <>
              <div className="nf-selected-food">
                <span className="nf-selected-food-label">{labels.selected}</span>
                <span className="nf-selected-food-name">
                  {selected.name}
                  {selected.custom && (
                    <span className="nf-custom-badge">{labels.customBadge}</span>
                  )}
                </span>
                <span className="nf-selected-food-qty">{g} g</span>
              </div>

              <div className="nf-nutrition-tables">
                <NutrientTable title={labels.per100} labels={labels} nutrients={per100} rows={nutrientRows} />
                <NutrientTable title={labels.calculated} labels={labels} nutrients={current} rows={nutrientRows} highlight />
              </div>
            </>
          ) : (
            <p className="nf-nutrition-note nf-nutrition-note--center">{labels.selectFood}</p>
          )}
        </section>

        <section className="nf-nutrition-actions">
          <button
            type="button"
            className="nf-btn nf-btn--add"
            onClick={addToMeal}
            disabled={g <= 0 || !selected}
          >
            {labels.add}
          </button>
          <p className="nf-nutrition-note">{labels.kcalNote}</p>
        </section>
      </div>

      <div className="nf-panel nf-meal-panel">
        <div className="nf-meal-head">
          <h2 className="nf-panel-title">{labels.meal}</h2>
          {meal.length > 0 && (
            <button type="button" className="nf-clear-btn" onClick={() => setMeal([])}>{labels.clear}</button>
          )}
        </div>

        {meal.length === 0 ? (
          <div className="nf-meal-empty">
            <span className="nf-meal-empty-icon" aria-hidden>🥗</span>
            <p>{labels.empty}</p>
          </div>
        ) : (
          <div className="nf-meal-content">
            <ul className="nf-meal-list">
              {mealItems.map((entry, i) => (
                <li key={`${entry.food.id}-${i}`} className="nf-meal-item">
                  <div className="nf-meal-item-info">
                    <span className="nf-meal-item-name">{entry.food.name}</span>
                    <span className="nf-meal-meta">
                      {entry.grams} g · {fmt(entry.nutrients.kcal, 0)} {labels.unit.kcal} · {fmt(entry.nutrients.protein, 1)} {labels.unit.g} {labels.rows.protein.toLowerCase()}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="nf-meal-remove"
                    onClick={() => removeFromMeal(i)}
                    aria-label={labels.remove}
                  >
                    {labels.remove}
                  </button>
                </li>
              ))}
            </ul>

            <div className="nf-meal-total">
              <NutrientTable title={labels.total} labels={labels} nutrients={total} rows={nutrientRows} highlight />
              <p className="nf-nutrition-note">{labels.mealNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NutrientTable({ title, labels, nutrients, rows, highlight }) {
  return (
    <div className={`nf-table-wrap${highlight ? ' nf-table-wrap--highlight' : ''}`}>
      <div className="nf-table-title">{title}</div>
      <table className="nf-table">
        <thead>
          <tr>
            <th className="nf-th">{labels.cols.nutrient}</th>
            <th className="nf-th" style={{ textAlign: 'right' }}>{labels.cols.value}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([key, label, unit]) => (
            <tr key={key}>
              <td className="nf-td">{label}</td>
              <td className="nf-td" style={{ textAlign: 'right', fontWeight: 600 }}>
                {fmt(nutrients[key], key === 'kcal' ? 0 : 1)} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="nf-field">
      <span className="nf-label">{label}</span>
      {children}
    </label>
  );
}

function ResultCard({ label, value, unit, accent }) {
  return (
    <div className={`nf-result-card${accent ? ' nf-result-card--accent' : ''}`}>
      <div className="nf-result-label">{label}</div>
      <div className="nf-result-value" style={{ color: accent ? GREEN : 'var(--text-1)' }}>{value}</div>
      <div className="nf-result-unit">{unit}</div>
    </div>
  );
}
