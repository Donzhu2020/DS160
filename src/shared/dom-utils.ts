// DOM操作工具函数

/**
 * 通过多种选择器策略查找元素
 */
export function findElementBySelectors(selectors: string[]): Element | null {
  for (const selector of selectors) {
    try {
      // 处理文本选择器 "text:xxxxx"
      if (selector.startsWith('text:')) {
        const text = selector.substring(5);
        // 查找所有可能包含文本的元素
        const elements = document.querySelectorAll('*');
        let exactMatch = null;
        let bestMatch = null;
        
        for (const el of elements) {
          // 确保元素可见且有文本内容
          if (el.textContent && el.offsetParent !== null) {
            const textContent = el.textContent.trim();
            
            // 精确匹配 - 最高优先级
            if (textContent === text) {
              console.log(`✅ Found exact text match for "${text}":`, el.tagName, el.id, el.className);
              exactMatch = el;
              break;
            }
            
            // 查找直接包含目标文本的最小元素（通常是标签）
            if (textContent.includes(text)) {
              // 优先选择较小的元素（更可能是直接的标签）
              if (!bestMatch || textContent.length < bestMatch.textContent.length) {
                // 排除过大的父容器
                if (textContent.length < text.length * 2.5) {
                  console.log(`📍 Found smaller container for "${text}":`, el.tagName, el.className, `"${textContent.substring(0, 50)}"`);
                  bestMatch = el;
                }
              }
            }
          }
        }
        
        if (exactMatch) return exactMatch;
        if (bestMatch) {
          console.log(`⚡ Using best match for "${text}":`, bestMatch.tagName, bestMatch.className);
          return bestMatch;
        }
        console.log(`No element found for text: "${text}"`);
        continue;
      }

      // 处理 :contains() 选择器
      if (selector.includes(':contains(')) {
        const match = selector.match(/^(.*?):contains\(['"]?(.*?)['"]?\)$/);
        if (match) {
          const [, baseSelector, containsText] = match;
          const baseElements = baseSelector === '*' ? 
            document.querySelectorAll('*') : 
            document.querySelectorAll(baseSelector || '*');
          
          for (const el of baseElements) {
            if (el.textContent?.includes(containsText)) {
              return el;
            }
          }
        }
        continue;
      }

      // 处理属性包含选择器 [attr*='value']
      if (selector.includes('[') && selector.includes('*=')) {
        const element = document.querySelector(selector);
        if (element) {
          return element;
        }
        continue;
      }

      // 标准CSS选择器
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
    }
  }
  return null;
}

/**
 * 创建翻译注释元素
 */
export function createTranslationElement(
  zh: string, 
  note: string, 
  showNote: boolean,
  position: 'right' | 'below'
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'ds160-translation-container';
  
  // 使用Shadow DOM隔离样式
  const shadow = container.attachShadow({ mode: 'open' });
  
  // 创建样式
  const style = document.createElement('style');
  style.textContent = `
    .translation-wrapper {
      display: inline !important;
      margin-left: 8px !important;
      margin-top: 0 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.4;
      vertical-align: baseline !important;
      position: static !important;
      float: none !important;
      clear: none !important;
    }
    
    .translation-text {
      color: #666;
      font-weight: 500;
      background: rgba(59, 130, 246, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid rgba(59, 130, 246, 0.2);
      display: inline;
      white-space: normal;
      word-wrap: break-word;
      max-width: 300px;
      font-size: 12px;
    }
    
    .translation-note {
      color: #888;
      font-size: 11px;
      margin-top: 2px;
      padding: 2px 4px;
      background: rgba(156, 163, 175, 0.1);
      border-radius: 3px;
      border-left: 2px solid #e5e7eb;
      display: ${showNote ? 'block' : 'none'};
    }
    
    .translation-wrapper:hover .translation-note {
      display: block;
    }
  `;
  
  // 创建内容
  const wrapper = document.createElement('div');
  wrapper.className = 'translation-wrapper';
  
  const textSpan = document.createElement('span');
  textSpan.className = 'translation-text';
  textSpan.textContent = zh;
  
  const noteDiv = document.createElement('div');
  noteDiv.className = 'translation-note';
  noteDiv.textContent = note;
  
  shadow.appendChild(style);
  shadow.appendChild(wrapper);
  wrapper.appendChild(textSpan);
  if (note) {
    wrapper.appendChild(noteDiv);
  }
  
  return container;
}

/**
 * 检查元素是否已经注入翻译
 */
export function hasTranslation(element: Element): boolean {
  // 检查元素是否有特定的翻译标记
  if (element.hasAttribute('data-ds160-translated')) {
    return true;
  }
  
  const elementText = element.textContent?.trim() || '';
  if (!elementText) return false;
  
  // 检查紧邻的下一个兄弟元素是否是翻译容器
  const nextSibling = element.nextElementSibling;
  if (nextSibling && nextSibling.classList.contains('ds160-translation-container')) {
    return true;
  }
  
  // 检查父元素中所有翻译容器
  const parent = element.parentElement;
  if (parent) {
    const existingTranslations = parent.querySelectorAll('.ds160-translation-container');
    for (const translation of existingTranslations) {
      const forElement = (translation as HTMLElement).getAttribute('data-for-element');
      if (forElement && forElement.includes(elementText.substring(0, 15))) {
        return true;
      }
    }
  }
  
  // 检查周围的翻译包装器（用于绝对定位的情况）
  const wrapper = element.closest('span[style*="position: relative"]');
  if (wrapper && wrapper.querySelector('.ds160-translation-container')) {
    return true;
  }
  
  return false;
}

/**
 * 移除已注入的翻译
 */
export function removeTranslation(element: Element): void {
  // 移除翻译标记
  element.removeAttribute('data-ds160-translated');
  
  const elementText = element.textContent?.trim() || '';
  if (!elementText) return;
  
  // 检查紧邻的下一个兄弟元素
  const nextSibling = element.nextElementSibling;
  if (nextSibling && nextSibling.classList.contains('ds160-translation-container')) {
    nextSibling.remove();
  }
  
  // 检查父元素中的所有翻译容器
  const parent = element.parentElement;
  if (parent) {
    const translationContainers = parent.querySelectorAll('.ds160-translation-container');
    for (const container of translationContainers) {
      const forElement = (container as HTMLElement).getAttribute('data-for-element');
      if (forElement && forElement.includes(elementText.substring(0, 15))) {
        container.remove();
      }
    }
  }
  
  // 检查绝对定位包装器中的翻译
  const wrapper = element.closest('span[style*="position: relative"]');
  if (wrapper) {
    const translationsInWrapper = wrapper.querySelectorAll('.ds160-translation-container');
    translationsInWrapper.forEach(t => t.remove());
  }
  
  // 清理可能在元素内部的翻译
  const internalTranslations = element.querySelectorAll('.ds160-translation-container');
  internalTranslations.forEach(t => t.remove());
}

/**
 * 等待DOM加载完成
 */
export function waitForDOM(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else {
      resolve();
    }
  });
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
}
