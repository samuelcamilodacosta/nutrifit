import { describe, it, expect } from 'vitest';
import { AppContext } from './AppContext';

describe('AppContext', () => {
  it('should create context', () => {
    expect(AppContext).toBeDefined();
  });

  it('should be a valid React context', () => {
    expect(AppContext.Provider).toBeDefined();
    expect(AppContext.Consumer).toBeDefined();
  });

  it('should have Provider component', () => {
    expect(typeof AppContext.Provider).toBe('object');
  });
});
