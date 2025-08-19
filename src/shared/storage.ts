import type { TranslationSettings } from './types';

// 默认设置
export const DEFAULT_SETTINGS: TranslationSettings = {
  enabled: true,
  mode: 'brief',
  showNotes: true,
  position: 'right'
};

// 存储键名
export const STORAGE_KEYS = {
  SETTINGS: 'ds160_translation_settings',
  INJECTION_STATE: 'ds160_injection_state'
} as const;

// 获取设置
export async function getSettings(): Promise<TranslationSettings> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
    return { ...DEFAULT_SETTINGS, ...result[STORAGE_KEYS.SETTINGS] };
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}

// 保存设置
export async function saveSettings(settings: Partial<TranslationSettings>): Promise<void> {
  try {
    const currentSettings = await getSettings();
    const newSettings = { ...currentSettings, ...settings };
    await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: newSettings });
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// 监听设置变化
export function onSettingsChange(callback: (settings: TranslationSettings) => void): void {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes[STORAGE_KEYS.SETTINGS]) {
      callback(changes[STORAGE_KEYS.SETTINGS].newValue);
    }
  });
}
