import type { TranslationData, TranslationField, TranslationSettings } from '@/shared/types';
import { 
  findElementBySelectors, 
  createTranslationElement, 
  hasTranslation, 
  removeTranslation,
  throttle 
} from '@/shared/dom-utils';

export class TranslationInjector {
  private translationData: TranslationData | null = null;
  private settings: TranslationSettings;
  private observer: MutationObserver | null = null;
  private injectedElements = new Set<Element>();

  constructor(settings: TranslationSettings) {
    this.settings = settings;
    this.setupMutationObserver();
  }

  /**
   * 设置翻译数据
   */
  setTranslationData(data: TranslationData): void {
    this.translationData = data;
  }

  /**
   * 更新设置
   */
  updateSettings(settings: TranslationSettings): void {
    this.settings = settings;
    
    if (settings.enabled) {
      this.injectTranslations();
    } else {
      this.removeAllTranslations();
    }
  }

  /**
   * 注入所有翻译
   */
  injectTranslations(): void {
    if (!this.translationData || !this.settings.enabled) {
      return;
    }

    let injectedCount = 0;
    const startTime = performance.now();

    for (const field of this.translationData.fields) {
      // 检查字段级别是否匹配当前模式
      if (!this.shouldInjectField(field)) {
        continue;
      }

      try {
        const success = this.injectFieldTranslation(field);
        if (success) {
          injectedCount++;
        }
      } catch (error) {
        console.warn(`Failed to inject translation for field ${field.key}:`, error);
      }
    }

    const duration = performance.now() - startTime;
    console.log(`Injected ${injectedCount} translations in ${duration.toFixed(2)}ms`);
  }

  /**
   * 注入单个字段的翻译
   */
  private injectFieldTranslation(field: TranslationField): boolean {
    const targetElement = findElementBySelectors(field.selectors);
    if (!targetElement) {
      return false;
    }

    // 检查是否已经注入
    if (hasTranslation(targetElement)) {
      return false;
    }

    // 根据当前模式选择翻译文本和注释，支持新旧格式
    const currentMode = this.settings.mode;
    let translationText: string;
    let noteText: string;

    // 处理翻译文本（支持新旧格式）
    if (typeof field.zh === 'object') {
      // 新格式：对象形式，优先使用当前模式，如果为空则使用另一个模式
      translationText = field.zh[currentMode];
      if (!translationText || translationText.trim() === '') {
        translationText = currentMode === 'brief' ? field.zh.detailed : field.zh.brief;
      }
    } else {
      // 旧格式：字符串形式
      translationText = field.zh;
    }

    // 处理注释文本（支持新旧格式）
    if (field.note && typeof field.note === 'object') {
      // 新格式：对象形式
      noteText = field.note[currentMode] || field.note.brief;
    } else {
      // 旧格式：字符串形式或undefined
      noteText = field.note || '';
    }

    // 如果翻译文本为空，跳过该字段
    if (!translationText || translationText.trim() === '') {
      return false;
    }

    // 创建翻译元素
    const translationElement = createTranslationElement(
      translationText,
      noteText,
      this.settings.showNotes && noteText.trim() !== '',
      this.settings.position
    );

    // 注入翻译
    this.insertTranslationElement(targetElement, translationElement);
    this.injectedElements.add(targetElement);

    return true;
  }

  /**
   * 插入翻译元素到适当位置
   */
  private insertTranslationElement(targetElement: Element, translationElement: HTMLElement): void {
    const parent = targetElement.parentElement;
    if (!parent) {
      return;
    }

    // 特殊处理：对于包含标签文本的DIV，尝试在文本后面内联插入
    const tagName = targetElement.tagName.toLowerCase();
    if (tagName === 'div' && targetElement.classList.contains('field')) {
      // 查找DIV内的文本节点
      const textNodes = Array.from(targetElement.childNodes).filter(node => 
        node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );
      
      if (textNodes.length > 0) {
        const lastTextNode = textNodes[textNodes.length - 1];
        if (lastTextNode.textContent?.trim()) {
          try {
            // 在文本节点后插入翻译，实现内联效果
            const textSpan = document.createElement('span');
            textSpan.textContent = lastTextNode.textContent;
            
            translationElement.style.cssText = `
              display: inline !important;
              margin-left: 4px !important;
              background: rgba(34, 197, 94, 0.1) !important;
              color: #059669 !important;
              padding: 1px 3px !important;
              border-radius: 2px !important;
              font-size: 10px !important;
              font-weight: 500 !important;
              white-space: nowrap !important;
            `;
            
            // 替换文本节点为 文本+翻译
            lastTextNode.replaceWith(textSpan, translationElement);
            console.log('🎯 Inline text replacement for field div');
            return;
          } catch (error) {
            console.warn('Failed to insert inline translation:', error);
          }
        }
      }
    }

    if (this.settings.position === 'right') {
      // 在目标元素后插入
      targetElement.insertAdjacentElement('afterend', translationElement);
    } else {
      // 在父容器末尾插入
      parent.appendChild(translationElement);
    }

    // 为可访问性添加关联
    if (targetElement.id) {
      translationElement.setAttribute('aria-labelledby', targetElement.id);
    }
  }

  /**
   * 判断是否应该注入字段翻译
   */
  private shouldInjectField(field: TranslationField): boolean {
    // 根据设置模式过滤字段
    if (this.settings.mode === 'brief' && field.level === 'detailed') {
      return false;
    }
    return true;
  }

  /**
   * 移除所有翻译
   */
  removeAllTranslations(): void {
    for (const element of this.injectedElements) {
      removeTranslation(element);
    }
    this.injectedElements.clear();
  }

  /**
   * 设置DOM变化监听器
   */
  private setupMutationObserver(): void {
    const throttledInject = throttle(() => {
      if (this.settings.enabled) {
        this.injectTranslations();
      }
    }, 100);

    this.observer = new MutationObserver((mutations) => {
      let shouldReinject = false;

      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // 检查是否有新的表单元素被添加
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (this.isFormElement(element) || element.querySelector('input, label, select')) {
                shouldReinject = true;
                break;
              }
            }
          }
        }
        
        if (shouldReinject) break;
      }

      if (shouldReinject) {
        throttledInject();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * 检查是否为表单相关元素
   */
  private isFormElement(element: Element): boolean {
    const formTags = ['INPUT', 'LABEL', 'SELECT', 'TEXTAREA', 'FORM', 'FIELDSET'];
    return formTags.includes(element.tagName);
  }

  /**
   * 销毁注入器
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.removeAllTranslations();
    this.injectedElements.clear();
  }
}
