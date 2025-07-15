/**
 * Simple validation test to ensure components can be imported
 * This test validates that the glassmorphism components are properly exported
 * and can be imported without errors.
 */

describe('Glass Components Validation', () => {
  it('should import GlassCard without errors', () => {
    expect(() => {
      const { GlassCard } = require('../GlassCard');
      expect(GlassCard).toBeDefined();
    }).not.toThrow();
  });

  it('should import GlassButton without errors', () => {
    expect(() => {
      const { GlassButton } = require('../GlassButton');
      expect(GlassButton).toBeDefined();
    }).not.toThrow();
  });

  it('should import GlassInput without errors', () => {
    expect(() => {
      const { GlassInput } = require('../GlassInput');
      expect(GlassInput).toBeDefined();
    }).not.toThrow();
  });

  it('should import all components from index', () => {
    expect(() => {
      const components = require('../index');
      expect(components.GlassCard).toBeDefined();
      expect(components.GlassButton).toBeDefined();
      expect(components.GlassInput).toBeDefined();
    }).not.toThrow();
  });
});