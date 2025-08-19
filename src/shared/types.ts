// 翻译数据类型定义
export interface TranslationField {
  key: string;
  selectors: string[];
  en: string;
  zh: string;
  note: string;
  level: 'brief' | 'detailed';
}

export interface TranslationData {
  version: string;
  pageId: string;
  description: string;
  fields: TranslationField[];
}

// 设置选项类型
export interface TranslationSettings {
  enabled: boolean;
  mode: 'brief' | 'detailed';
  showNotes: boolean;
  position: 'right' | 'below';
}

// DOM注入状态
export interface InjectionState {
  isInjected: boolean;
  fieldCount: number;
  lastUpdate: number;
}
