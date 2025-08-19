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
        const elements = document.querySelectorAll('label, span, div, p');
        for (const el of elements) {
          if (el.textContent?.toLowerCase().includes(text.toLowerCase())) {
            return el;
          }
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
      display: inline-block;
      margin-left: ${position === 'right' ? '8px' : '0'};
      margin-top: ${position === 'below' ? '4px' : '0'};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .translation-text {
      color: #666;
      font-weight: 500;
      background: rgba(59, 130, 246, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid rgba(59, 130, 246, 0.2);
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
  return element.parentElement?.querySelector('.ds160-translation-container') !== null;
}

/**
 * 移除已注入的翻译
 */
export function removeTranslation(element: Element): void {
  const container = element.parentElement?.querySelector('.ds160-translation-container');
  if (container) {
    container.remove();
  }
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
