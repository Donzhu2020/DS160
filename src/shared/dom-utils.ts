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

/**
 * 保存表单数据到sessionStorage
 */
export function saveFormData(): void {
  const formData: { [key: string]: string } = {};
  
  try {
    // 保存所有表单元素的数据
    document.querySelectorAll('input, select, textarea').forEach((element) => {
      const formElement = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      // 使用多种策略生成唯一标识符
      const identifier = getElementIdentifier(formElement);
      if (!identifier) return;
      
      if (formElement instanceof HTMLInputElement) {
        if (formElement.type === 'checkbox' || formElement.type === 'radio') {
          formData[identifier] = formElement.checked ? 'checked' : 'unchecked';
        } else {
          formData[identifier] = formElement.value;
        }
      } else if (formElement instanceof HTMLSelectElement) {
        formData[identifier] = formElement.value;
        // 同时保存选中的索引，以备value不可用时使用
        formData[identifier + '_selectedIndex'] = formElement.selectedIndex.toString();
      } else if (formElement instanceof HTMLTextAreaElement) {
        formData[identifier] = formElement.value;
      }
    });
    
    // 保存到sessionStorage
    sessionStorage.setItem('ds160_form_data', JSON.stringify(formData));
    console.log('Form data saved successfully:', Object.keys(formData).length, 'fields');
    
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
}

/**
 * 从sessionStorage恢复表单数据
 */
export function restoreFormData(): void {
  try {
    const savedData = sessionStorage.getItem('ds160_form_data');
    if (!savedData) {
      console.log('No saved form data found');
      return;
    }
    
    const formData = JSON.parse(savedData);
    let restoredCount = 0;
    
    // 恢复所有表单元素的数据
    document.querySelectorAll('input, select, textarea').forEach((element) => {
      const formElement = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      const identifier = getElementIdentifier(formElement);
      if (!identifier || formData[identifier] === undefined) return;
      
      try {
        if (formElement instanceof HTMLInputElement) {
          if (formElement.type === 'checkbox' || formElement.type === 'radio') {
            formElement.checked = formData[identifier] === 'checked';
          } else {
            formElement.value = formData[identifier];
          }
          restoredCount++;
        } else if (formElement instanceof HTMLSelectElement) {
          // 优先使用value，失败时使用selectedIndex
          if (formData[identifier]) {
            formElement.value = formData[identifier];
          } else if (formData[identifier + '_selectedIndex']) {
            const selectedIndex = parseInt(formData[identifier + '_selectedIndex']);
            if (selectedIndex >= 0 && selectedIndex < formElement.options.length) {
              formElement.selectedIndex = selectedIndex;
            }
          }
          restoredCount++;
        } else if (formElement instanceof HTMLTextAreaElement) {
          formElement.value = formData[identifier];
          restoredCount++;
        }
        
        // 触发change事件，确保页面逻辑能正确响应
        formElement.dispatchEvent(new Event('change', { bubbles: true }));
        
      } catch (error) {
        console.warn('Failed to restore data for element:', identifier, error);
      }
    });
    
    console.log('Form data restored successfully:', restoredCount, 'fields');
    
    // 恢复完成后清理旧数据
    sessionStorage.removeItem('ds160_form_data');
    
  } catch (error) {
    console.error('Failed to restore form data:', error);
  }
}

/**
 * 为表单元素生成唯一标识符
 */
function getElementIdentifier(element: HTMLElement): string | null {
  // 优先使用name属性
  if (element.getAttribute('name')) {
    return `name:${element.getAttribute('name')}`;
  }
  
  // 使用id属性
  if (element.id) {
    return `id:${element.id}`;
  }
  
  // 使用data-*属性
  for (const attr of element.attributes) {
    if (attr.name.startsWith('data-') && attr.value) {
      return `${attr.name}:${attr.value}`;
    }
  }
  
  // 使用标签名和文本内容组合
  const label = findLabelForElement(element);
  if (label) {
    return `label:${label}`;
  }
  
  // 使用相对位置（最后的备选方案）
  const parent = element.parentElement;
  if (parent) {
    const siblings = Array.from(parent.children).filter(el => el.tagName === element.tagName);
    const index = siblings.indexOf(element);
    return `position:${element.tagName.toLowerCase()}_${index}`;
  }
  
  return null;
}

/**
 * 查找与表单元素关联的标签文本
 */
function findLabelForElement(element: HTMLElement): string | null {
  // 查找通过for属性关联的label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label && label.textContent) {
      return label.textContent.trim();
    }
  }
  
  // 查找父级label
  const parentLabel = element.closest('label');
  if (parentLabel && parentLabel.textContent) {
    return parentLabel.textContent.trim();
  }
  
  // 查找前面的兄弟元素中的标签文本
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === 'LABEL' && sibling.textContent) {
      return sibling.textContent.trim();
    }
    if (sibling.textContent && sibling.textContent.trim().length < 100) {
      return sibling.textContent.trim();
    }
    sibling = sibling.previousElementSibling;
  }
  
  return null;
}

/**
 * 清理已保存的表单数据
 */
export function clearSavedFormData(): void {
  try {
    sessionStorage.removeItem('ds160_form_data');
    console.log('Saved form data cleared');
  } catch (error) {
    console.error('Failed to clear saved form data:', error);
  }
}
