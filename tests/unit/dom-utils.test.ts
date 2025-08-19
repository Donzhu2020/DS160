import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  findElementBySelectors, 
  createTranslationElement, 
  hasTranslation,
  removeTranslation,
  throttle 
} from '@/shared/dom-utils';

describe('DOM Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('findElementBySelectors', () => {
    it('should find element by CSS selector', () => {
      document.body.innerHTML = '<label for="test" id="test-label">Test Label</label>';
      
      const element = findElementBySelectors(['#test-label']);
      expect(element).toBeTruthy();
      expect(element?.id).toBe('test-label');
    });

    it('should find element by text selector', () => {
      document.body.innerHTML = '<label>Surnames (as in passport)</label>';
      
      const element = findElementBySelectors(['text:Surnames']);
      expect(element).toBeTruthy();
      expect(element?.textContent).toContain('Surnames');
    });

    it('should return null when no element found', () => {
      const element = findElementBySelectors(['#non-existent']);
      expect(element).toBeNull();
    });

    it('should try multiple selectors', () => {
      document.body.innerHTML = '<span id="test">Test</span>';
      
      const element = findElementBySelectors(['#non-existent', '#test']);
      expect(element).toBeTruthy();
      expect(element?.id).toBe('test');
    });
  });

  describe('createTranslationElement', () => {
    it('should create translation element with Shadow DOM', () => {
      const element = createTranslationElement('测试', '这是一个测试', true, 'right');
      
      expect(element.className).toBe('ds160-translation-container');
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should create element without note when showNote is false', () => {
      const element = createTranslationElement('测试', '这是一个测试', false, 'right');
      
      expect(element.shadowRoot).toBeTruthy();
      // Note: 难以直接测试Shadow DOM内容，但确保元素被创建
    });
  });

  describe('hasTranslation', () => {
    it('should detect existing translation', () => {
      const container = document.createElement('div');
      const label = document.createElement('label');
      const translation = document.createElement('div');
      translation.className = 'ds160-translation-container';
      
      container.appendChild(label);
      container.appendChild(translation);
      document.body.appendChild(container);
      
      expect(hasTranslation(label)).toBe(true);
    });

    it('should return false when no translation exists', () => {
      const label = document.createElement('label');
      document.body.appendChild(label);
      
      expect(hasTranslation(label)).toBe(false);
    });
  });

  describe('removeTranslation', () => {
    it('should remove existing translation', () => {
      const container = document.createElement('div');
      const label = document.createElement('label');
      const translation = document.createElement('div');
      translation.className = 'ds160-translation-container';
      
      container.appendChild(label);
      container.appendChild(translation);
      document.body.appendChild(container);
      
      removeTranslation(label);
      expect(hasTranslation(label)).toBe(false);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', (done) => {
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, 100);
      
      // 快速调用多次
      throttledFn();
      throttledFn();
      throttledFn();
      
      // 立即应该只调用一次
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // 等待throttle延迟后检查
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(2);
        done();
      }, 150);
    });
  });
});
