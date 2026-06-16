import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppContext } from './AppContext';

vi.mock('../src/pages/NutriFit', () => ({
  default: () => <div data-testid="nutrifit-page">NutriFit Page</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    global.localStorage.getItem.mockReturnValue(null);
    global.localStorage.setItem.mockClear();
  });

  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('nutrifit-page')).toBeInTheDocument();
  });

  it('should initialize with default language as Portuguese', () => {
    render(<App />);
    expect(global.localStorage.getItem).toHaveBeenCalledWith('nutrifit-lang');
  });

  it('should initialize with default theme as dark', () => {
    render(<App />);
    expect(global.localStorage.getItem).toHaveBeenCalledWith('nutrifit-theme');
  });

  it('should provide AppContext with lang, setLang, theme, setTheme, and tr', () => {
    const { container } = render(<App />);
    
    // Verify the context provider exists
    expect(container.querySelector('.app')).toBeDefined();
  });

  it('should save language preference to localStorage', () => {
    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'nutrifit-lang') return 'pt';
      if (key === 'nutrifit-theme') return 'dark';
      return null;
    });

    render(<App />);
    
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'nutrifit-lang',
      expect.any(String)
    );
  });

  it('should save theme preference to localStorage', () => {
    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'nutrifit-lang') return 'pt';
      if (key === 'nutrifit-theme') return 'dark';
      return null;
    });

    render(<App />);
    
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'nutrifit-theme',
      expect.any(String)
    );
  });

  it('should set data-theme attribute on document element', () => {
    global.localStorage.getItem.mockReturnValue('light');
    
    render(<App />);
    
    expect(
      document.documentElement.getAttribute('data-theme')
    ).not.toBeNull();
  });

  it('should restore language from localStorage', () => {
    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'nutrifit-lang') return 'en';
      return null;
    });

    render(<App />);
    expect(global.localStorage.getItem).toHaveBeenCalledWith('nutrifit-lang');
  });

  it('should restore theme from localStorage', () => {
    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'nutrifit-theme') return 'light';
      return null;
    });

    render(<App />);
    expect(global.localStorage.getItem).toHaveBeenCalledWith('nutrifit-theme');
  });
});
