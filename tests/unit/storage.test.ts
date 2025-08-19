import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSettings, saveSettings, DEFAULT_SETTINGS } from '@/shared/storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSettings', () => {
    it('should return default settings when storage is empty', async () => {
      chrome.storage.local.get = vi.fn(() => Promise.resolve({}));
      
      const settings = await getSettings();
      expect(settings).toEqual(DEFAULT_SETTINGS);
    });

    it('should merge stored settings with defaults', async () => {
      const storedSettings = { enabled: false, mode: 'detailed' as const };
      chrome.storage.local.get = vi.fn(() => Promise.resolve({
        ds160_translation_settings: storedSettings
      }));
      
      const settings = await getSettings();
      expect(settings.enabled).toBe(false);
      expect(settings.mode).toBe('detailed');
      expect(settings.showNotes).toBe(DEFAULT_SETTINGS.showNotes); // 应该使用默认值
    });

    it('should handle storage errors gracefully', async () => {
      chrome.storage.local.get = vi.fn(() => Promise.reject(new Error('Storage error')));
      
      const settings = await getSettings();
      expect(settings).toEqual(DEFAULT_SETTINGS);
    });
  });

  describe('saveSettings', () => {
    it('should save partial settings', async () => {
      chrome.storage.local.get = vi.fn(() => Promise.resolve({
        ds160_translation_settings: DEFAULT_SETTINGS
      }));
      chrome.storage.local.set = vi.fn(() => Promise.resolve());
      
      await saveSettings({ enabled: false });
      
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        ds160_translation_settings: {
          ...DEFAULT_SETTINGS,
          enabled: false
        }
      });
    });

    it('should handle save errors gracefully', async () => {
      chrome.storage.local.get = vi.fn(() => Promise.resolve({
        ds160_translation_settings: DEFAULT_SETTINGS
      }));
      chrome.storage.local.set = vi.fn(() => Promise.reject(new Error('Save error')));
      
      // 应该不抛出错误
      await expect(saveSettings({ enabled: false })).resolves.toBeUndefined();
    });
  });
});
