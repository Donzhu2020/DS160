// 翻译数据类型定义
export interface TranslationField {
  key: string;
  selectors: string[];
  en: string;
  zh: {
    brief: string;    // 简洁模式的翻译
    detailed: string; // 详细模式的翻译
  };
  note: {
    brief: string;    // 简洁模式的注释
    detailed: string; // 详细模式的注释
  };
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
