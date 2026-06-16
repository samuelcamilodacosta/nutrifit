import { useState, useEffect } from 'react';
import { t } from './translations';
import { AppContext } from './AppContext';
import NutriFit from './pages/NutriFit';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('nutrifit-lang') || 'pt');
  const [theme, setTheme] = useState(() => localStorage.getItem('nutrifit-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('nutrifit-lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('nutrifit-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const tr = t[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, tr, theme, setTheme }}>
      <NutriFit />
    </AppContext.Provider>
  );
}

export default App;
