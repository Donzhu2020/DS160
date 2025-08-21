import type { TranslationData, TranslationField } from '@/shared/types';

// 翻译数据缓存
const translationCache = new Map<string, TranslationData>();

// 合并翻译数据缓存
const mergedTranslationCache = new Map<string, TranslationData>();

// 页面关联映射 - 某个页面可能需要其他页面的翻译数据
const pageAssociations: Record<string, string[]> = {
  'page1': ['page1'], // 暂时只加载自己，减少干扰
  'page2': ['page2'], // 暂时只加载自己
  'page3': ['page3'], // 暂时只加载page3，确保精确度
  'page4': ['page4'], // 暂时只加载自己
  'page5': ['page5'], // 暂时只加载自己
  // 为其他页面添加默认关联（只加载自己）
  'page6': ['page6'], 'page7': ['page7'], 'page8': ['page8'],
  'page9': ['page9'], 'page10': ['page10'], 'page11': ['page11'],
  'page12': ['page12'], 'page13': ['page13'], 'page14': ['page14'],
  'page15': ['page15'], 'page16': ['page16'], 'page17': ['page17'],
  'page18': ['page18']
};

/**
 * 加载多页面合并的翻译数据（新的主要接口）
 */
export async function loadMergedTranslationData(pageId: string): Promise<TranslationData | null> {
  // 检查合并数据缓存
  if (mergedTranslationCache.has(pageId)) {
    return mergedTranslationCache.get(pageId)!;
  }

  try {
    // 获取关联页面列表
    const associatedPages = pageAssociations[pageId] || [pageId];
    console.log(`Loading translation data for ${pageId} and associated pages:`, associatedPages);

    // 加载所有关联页面的翻译数据
    const translationDataList: TranslationData[] = [];
    for (const pageToLoad of associatedPages) {
      const data = await loadTranslationData(pageToLoad);
      if (data) {
        translationDataList.push(data);
      }
    }

    if (translationDataList.length === 0) {
      console.warn(`No translation data loaded for page ${pageId} and its associations`);
      return null;
    }

    // 合并所有翻译数据
    const mergedData = mergeTranslationData(pageId, translationDataList);
    
    // 缓存合并后的数据
    mergedTranslationCache.set(pageId, mergedData);
    return mergedData;
  } catch (error) {
    console.error('Error loading merged translation data:', error);
    return null;
  }
}

/**
 * 加载单个页面的翻译数据
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
 * 合并多个页面的翻译数据
 */
function mergeTranslationData(primaryPageId: string, translationDataList: TranslationData[]): TranslationData {
  if (translationDataList.length === 0) {
    throw new Error('Cannot merge empty translation data list');
  }

  // 使用第一个（主要页面）作为基础
  const primaryData = translationDataList[0];
  const mergedFields: TranslationField[] = [...primaryData.fields];
  
  // 合并其他页面的字段，避免重复的key
  const existingKeys = new Set(primaryData.fields.map(field => field.key));
  
  for (let i = 1; i < translationDataList.length; i++) {
    const additionalData = translationDataList[i];
    for (const field of additionalData.fields) {
      if (!existingKeys.has(field.key)) {
        mergedFields.push(field);
        existingKeys.add(field.key);
      }
    }
  }

  console.log(`Merged translation data: ${mergedFields.length} total fields from ${translationDataList.length} pages`);

  return {
    version: primaryData.version,
    pageId: primaryPageId,
    description: `${primaryData.description} (merged with ${translationDataList.length - 1} additional pages)`,
    fields: mergedFields
  };
}

/**
 * 根据页面特征确定数据文件
 */
function getDataFileForPage(pageId: string): string | null {
  // 首先尝试根据检测到的页面ID直接匹配文件
  if (pageId.startsWith('page') && pageId.match(/^page\d+$/)) {
    const pageNumber = pageId.replace('page', '').padStart(2, '0');
    return `pages/translation-page${pageNumber}.json`;
  }

  // 兼容旧的页面ID格式
  const legacyFileMap: Record<string, string> = {
    'personalInfo': 'translation-personal-info.json',
    'personalInfo1': 'translation-personal-info.json',
    'contactInfo': 'translation-contact-info.json',
    'general': 'pages/translation-page01.json' // 默认使用第一页
  };

  if (legacyFileMap[pageId]) {
    return legacyFileMap[pageId];
  }

  // 后备检测：基于页面内容特征
  const url = window.location.href;
  const pageContent = document.body.textContent || '';

  // 尝试根据页面内容匹配到对应的页面文件
  const contentPatterns = [
    { pattern: /Surnames.*Given Names/i, file: 'pages/translation-page01.json' },
    { pattern: /Nationality.*National.*Identification/i, file: 'pages/translation-page02.json' },
    { pattern: /Travel.*Information.*Address.*stay/i, file: 'pages/translation-page03.json' },
    { pattern: /Travel.*Companions/i, file: 'pages/translation-page04.json' },
    { pattern: /Previous.*US.*Travel/i, file: 'pages/translation-page05.json' },
    { pattern: /Point.*Contact.*Information/i, file: 'pages/translation-page06.json' },
    { pattern: /Family.*Information.*Relatives/i, file: 'pages/translation-page07.json' },
    { pattern: /Family.*Information.*Spouse/i, file: 'pages/translation-page08.json' },
    { pattern: /Work.*Education.*Training.*Information/i, file: 'pages/translation-page09.json' },
    { pattern: /Security.*Background.*Part\s*1/i, file: 'pages/translation-page12.json' },
    { pattern: /Security.*Background.*Part\s*2/i, file: 'pages/translation-page13.json' },
    { pattern: /Security.*Background.*Part\s*3/i, file: 'pages/translation-page14.json' },
    { pattern: /Security.*Background.*Part\s*4/i, file: 'pages/translation-page15.json' },
    { pattern: /Security.*Background.*Part\s*5/i, file: 'pages/translation-page16.json' },
    { pattern: /SEVIS.*Information/i, file: 'pages/translation-page17.json' },
    { pattern: /Upload.*Photo/i, file: 'pages/translation-page18.json' }
  ];

  for (const { pattern, file } of contentPatterns) {
    if (pattern.test(pageContent)) {
      return file;
    }
  }

  console.warn(`No translation file found for page: ${pageId}, content patterns did not match`);
  return null;
}

/**
 * 验证翻译数据格式（支持新旧两种格式）
 */
function validateTranslationData(data: any): data is TranslationData {
  console.log('Validating translation data:', data);
  
  if (!data) {
    console.error('Validation failed: data is null or undefined');
    return false;
  }
  
  if (typeof data.version !== 'string') {
    console.error('Validation failed: version is not a string');
    return false;
  }
  
  if (typeof data.pageId !== 'string') {
    console.error('Validation failed: pageId is not a string');
    return false;
  }
  
  if (!Array.isArray(data.fields)) {
    console.error('Validation failed: fields is not an array');
    return false;
  }
  
  for (let i = 0; i < data.fields.length; i++) {
    const field = data.fields[i];
    
    if (!field.key) {
      console.error(`Validation failed: field[${i}].key is missing`);
      return false;
    }
    
    if (!Array.isArray(field.selectors)) {
      console.error(`Validation failed: field[${i}].selectors is not an array`);
      return false;
    }
    
    if (!field.en) {
      console.error(`Validation failed: field[${i}].en is missing`);
      return false;
    }
    
    if (!field.zh) {
      console.error(`Validation failed: field[${i}].zh is missing`);
      return false;
    }
    
    // 检查zh格式（允许brief或detailed为空字符串）
    const zhValid = (
      (typeof field.zh === 'object' && 
       typeof field.zh.brief === 'string' && 
       typeof field.zh.detailed === 'string') ||
      (typeof field.zh === 'string')
    );
    
    if (!zhValid) {
      console.error(`Validation failed: field[${i}].zh format is invalid`, field.zh);
      return false;
    }
    
    // 检查note格式（更宽松的检查）
    const noteValid = (
      (field.note && typeof field.note === 'object' && 
       typeof field.note.brief === 'string' && typeof field.note.detailed === 'string') ||
      (typeof field.note === 'string') ||
      (field.note === undefined) ||
      (field.note === null)
    );
    
    if (!noteValid) {
      console.error(`Validation failed: field[${i}].note format is invalid`, field.note);
      return false;
    }
  }
  
  console.log('Validation passed successfully');
  return true;
}

/**
 * 自动检测当前页面类型
 */
export function detectCurrentPage(): string {
  const url = window.location.href;
  const title = document.title;
  const pageContent = document.body.textContent || '';
  
  console.log('Detecting page type...');
  console.log('URL:', url);
  console.log('Title:', title);
  console.log('Page content preview:', pageContent.substring(0, 500));

  // DS-160的页面通常在URL中包含特定的页面标识符
  // 先尝试从URL中提取页面信息
  const urlPageMatch = url.match(/(?:page|step)[\s_-]*(\d+)/i);
  if (urlPageMatch) {
    const pageNum = parseInt(urlPageMatch[1]);
    if (pageNum >= 1 && pageNum <= 18) {
      console.log(`Found page number in URL: page${pageNum}`);
      return `page${pageNum}`;
    }
  }

  // 基于页面内容特征检测DS-160的18个页面
  // 注意：使用更精确的URL和标题匹配，减少对页面内容的依赖
  const pagePatterns = [
    { pattern: /Personal\s+Information\s+1|Surnames.*Given\s+Names/i, pageId: 'page1' },
    { pattern: /Personal\s+Information\s+2|Nationality.*National.*Identification/i, pageId: 'page2' },
    // 优先检查特定的URL模式，这些更可靠
    { pattern: /complete_contact\.aspx|Address\s+and\s+Phone\s+Information/i, pageId: 'page6' },
    { pattern: /Passport_Visa_Info\.aspx|Passport\s+Information/i, pageId: 'page7' }, // Passport Information page
    { pattern: /complete_uscontact\.aspx|U\.?S\.?\s+Point\s+of\s+Contact\s+Information/i, pageId: 'page8' }, // U.S. Point of Contact Information page
    { pattern: /complete_family1\.aspx|Family\s+Information:\s*Relatives/i, pageId: 'page9' }, // Family Information: Relatives page
    { pattern: /complete_family2\.aspx|Family\s+Information:\s*Spouse/i, pageId: 'page10' }, // Family Information: Spouse page
    { pattern: /complete_workeducation3\.aspx|Additional\s+Work\/Education\/Training\s+Information/i, pageId: 'page13' },
    { pattern: /complete_workeducation2\.aspx|Previous\s+Work\/Education\/Training\s+Information|Work\/Education\/Training\s+Information\s+2/i, pageId: 'page12' },
    { pattern: /complete_workeducation1\.aspx|Present\s+Work\/Education\/Training\s+Information/i, pageId: 'page11' },
    // Prioritize Security and Background pages over other patterns
    { pattern: /complete_securityandbackground1\.aspx|Security\s+and\s+Background:\s*Part\s*1/i, pageId: 'page14' },
    { pattern: /complete_securityandbackground2\.aspx|Security\s+and\s+Background:\s*Part\s*2/i, pageId: 'page15' },
    { pattern: /complete_securityandbackground3\.aspx|Security\s+and\s+Background:\s*Part\s*3/i, pageId: 'page16' },
    { pattern: /complete_securityandbackground4\.aspx|Security\s+and\s+Background:\s*Part\s*4/i, pageId: 'page17' },
    { pattern: /complete_securityandbackground5\.aspx|Security\s+and\s+Background:\s*Part\s*5/i, pageId: 'page18' },
    { pattern: /previousustravel|Previous\s+U\.?S\.?\s+Travel\s*$/i, pageId: 'page5' },
    { pattern: /Travel\s+Information(?!\s*(Previous|Companions))/i, pageId: 'page3' },
    { pattern: /Travel\s+Companions(?!\s*Information)/i, pageId: 'page4' },
    { pattern: /SEVIS\s+Information/i, pageId: 'page19' },
    { pattern: /Upload\s+Photo|Photo\s+Upload/i, pageId: 'page20' }
  ];

  // 检测页面内容、标题和URL
  for (const { pattern, pageId } of pagePatterns) {
    const contentMatch = pattern.test(pageContent);
    const titleMatch = pattern.test(title);
    const urlMatch = pattern.test(url);
    
    if (contentMatch || titleMatch || urlMatch) {
      console.log(`Detected DS-160 page: ${pageId} based on pattern match`, {
        content: contentMatch,
        title: titleMatch,
        url: urlMatch
      });
      return pageId;
    }
  }

  // 兼容性检测：基于旧的检测逻辑
  if (pageContent.includes('Surnames') && pageContent.includes('Given Names')) {
    return 'page1'; // 个人信息页面
  }
  
  if (pageContent.includes('Home Address') || pageContent.includes('Phone Number')) {
    return 'page6'; // 联系信息通常在第6页
  }

  // 基于URL路径的兼容性检测
  if (url.includes('personal')) {
    return 'page1';
  }
  
  if (url.includes('contact')) {
    return 'page6';
  }

  // 如果都无法识别，返回第一页作为默认
  console.warn('Unable to detect specific DS-160 page, defaulting to page1');
  return 'page1';
}

/**
 * 清空翻译数据缓存
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}
