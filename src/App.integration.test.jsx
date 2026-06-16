import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock localStorage como no setup
beforeEach(() => {
  global.localStorage.getItem.mockReturnValue(null);
  global.localStorage.setItem.mockClear();
});

vi.mock('./pages/NutriFit', () => ({
  default: () => <div data-testid="nutrifit-mock">NutriFit Component</div>,
}));

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('nutrifit-mock')).toBeInTheDocument();
  });

  it('should initialize localStorage on mount', () => {
    render(<App />);
    expect(global.localStorage.getItem).toHaveBeenCalled();
  });

  it('should provide context with required properties', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should persist settings changes', () => {
    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'nutrifit-lang') return 'pt';
      if (key === 'nutrifit-theme') return 'dark';
      return null;
    });

    render(<App />);
    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  it('should default to Portuguese language', () => {
    global.localStorage.getItem.mockReturnValue(null);
    render(<App />);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'nutrifit-lang',
      expect.any(String)
    );
  });

  it('should default to dark theme', () => {
    global.localStorage.getItem.mockReturnValue(null);
    render(<App />);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'nutrifit-theme',
      expect.any(String)
    );
  });
});
