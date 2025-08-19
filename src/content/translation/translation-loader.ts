import type { TranslationData } from '@/shared/types';

// 翻译数据缓存
const translationCache = new Map<string, TranslationData>();

/**
 * 加载翻译数据
 */
export async function loadTranslationData(pageId: string): Promise<TranslationData | null> {
  // 检查缓存
  if (translationCache.has(pageId)) {
    return translationCache.get(pageId)!;
  }

  try {
    // 根据页面ID确定数据文件
    const dataFile = getDataFileForPage(pageId);
    if (!dataFile) {
      console.warn(`No translation data file for page: ${pageId}`);
      return null;
    }

    // 加载数据文件
    const response = await fetch(chrome.runtime.getURL(`assets/data/${dataFile}`));
    if (!response.ok) {
      throw new Error(`Failed to load translation data: ${response.status}`);
    }

    const data: TranslationData = await response.json();
    
    // 验证数据格式
    if (!validateTranslationData(data)) {
      throw new Error('Invalid translation data format');
    }

    // 缓存数据
    translationCache.set(pageId, data);
    return data;
  } catch (error) {
    console.error('Error loading translation data:', error);
    return null;
  }
}

/**
 * 根据页面特征确定数据文件
 */
function getDataFileForPage(pageId: string): string | null {
  // 检查URL和页面内容确定数据文件
  const url = window.location.href;
  const pageContent = document.body.textContent || '';

  // 个人信息页面
  if (pageContent.includes('Surnames') && pageContent.includes('Given Names')) {
    return 'translation-personal-info.json';
  }

  // 联系信息页面
  if (pageContent.includes('Home Address') || pageContent.includes('Phone Number')) {
    return 'translation-contact-info.json';
  }

  // 可以根据更多页面特征添加其他数据文件
  // TODO: 添加更多页面的翻译数据文件

  return null;
}

/**
 * 验证翻译数据格式
 */
function validateTranslationData(data: any): data is TranslationData {
  return (
    data &&
    typeof data.version === 'string' &&
    typeof data.pageId === 'string' &&
    Array.isArray(data.fields) &&
    data.fields.every((field: any) => 
      field.key &&
      Array.isArray(field.selectors) &&
      field.en &&
      field.zh &&
      ['brief', 'detailed'].includes(field.level)
    )
  );
}

/**
 * 自动检测当前页面类型
 */
export function detectCurrentPage(): string {
  const url = window.location.href;
  const title = document.title;
  const pageContent = document.body.textContent || '';

  // 基于内容特征检测页面类型
  if (pageContent.includes('Surnames') && pageContent.includes('Given Names')) {
    return 'personalInfo';
  }
  
  if (pageContent.includes('Home Address')) {
    return 'contactInfo';
  }

  // 基于URL路径检测
  if (url.includes('personal')) {
    return 'personalInfo';
  }
  
  if (url.includes('contact')) {
    return 'contactInfo';
  }

  // 默认返回通用页面类型
  return 'general';
}

/**
 * 清空翻译数据缓存
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}
