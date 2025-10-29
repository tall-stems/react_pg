/**
 * Accessibility utilities for better user experience
 */

/**
 * Announces content to screen readers using a live region
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.setAttribute('class', 'sr-only');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';

  document.body.appendChild(liveRegion);
  liveRegion.textContent = message;

  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 1000);
};

/**
 * Focus management utility for better keyboard navigation
 */
export const focusElement = (selector: string, delay = 0) => {
  setTimeout(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, delay);
};

/**
 * Generates unique IDs for ARIA relationships
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * High contrast mode detection
 */
export const isHighContrastMode = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Creates accessible error message
 */
export const createErrorId = (fieldId: string): string => {
  return `${fieldId}-error`;
};

/**
 * Creates accessible description
 */
export const createDescriptionId = (fieldId: string): string => {
  return `${fieldId}-description`;
};

/**
 * Keyboard event helpers
 */
export const isEnterOrSpace = (event: React.KeyboardEvent): boolean => {
  return event.key === 'Enter' || event.key === ' ';
};

export const isEscapeKey = (event: React.KeyboardEvent): boolean => {
  return event.key === 'Escape';
};

export const isArrowKey = (event: React.KeyboardEvent): boolean => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
};
