import { TranslationInjector } from './translation-injector';
import { TranslationUIController } from './ui-controller';
import { loadMergedTranslationData, detectCurrentPage } from './translation-loader';
import { getSettings, onSettingsChange } from '@/shared/storage';
import { waitForDOM } from '@/shared/dom-utils';

// 全局实例
let injector: TranslationInjector | null = null;
let uiController: TranslationUIController | null = null;

/**
 * 初始化翻译功能
 */
async function initializeTranslation(): Promise<void> {
  try {
    console.log('DS-160 Chinese Helper: Initializing translation...');
    
    // 等待DOM加载完成
    await waitForDOM();
    
    // 检测当前页面类型
    const pageType = detectCurrentPage();
    console.log(`Detected page type: ${pageType}`);
    
    // 加载设置
    const settings = await getSettings();
    console.log('Loaded settings:', settings);
    
    // 创建注入器
    injector = new TranslationInjector(settings);
    
    // 创建UI控制器
    uiController = new TranslationUIController(settings);
    
    // 加载合并的翻译数据（包含关联页面）
    const translationData = await loadMergedTranslationData(pageType);
    if (translationData) {
      injector.setTranslationData(translationData);
      console.log(`Loaded merged translation data for ${pageType}:`, translationData.fields.length, 'fields');
      
      // 开始注入翻译
      if (settings.enabled) {
        injector.injectTranslations();
      }
    } else {
      console.warn('No translation data available for current page');
    }
    
    // 监听设置变化
    onSettingsChange((newSettings) => {
      console.log('Settings updated:', newSettings);
      if (injector) {
        injector.updateSettings(newSettings);
      }
      if (uiController) {
        uiController.updateSettings(newSettings);
      }
    });
    
    console.log('DS-160 Chinese Helper: Translation initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize translation:', error);
  }
}

/**
 * 清理资源
 */
function cleanup(): void {
  if (injector) {
    injector.destroy();
    injector = null;
  }
  if (uiController) {
    uiController.destroy();
    uiController = null;
  }
}

// 监听页面卸载事件
window.addEventListener('beforeunload', cleanup);

// 监听来自popup或background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_TRANSLATION_STATUS':
      sendResponse({
        initialized: injector !== null,
        enabled: injector ? true : false,
        translatedCount: injector ? 0 : 0, // TODO: 从injector获取实际数量
        pageType: detectCurrentPage()
      });
      break;
      
    case 'UPDATE_SETTINGS':
      if (injector && message.settings) {
        injector.updateSettings(message.settings);
      }
      if (uiController && message.settings) {
        uiController.updateSettings(message.settings);
      }
      sendResponse({ success: true });
      break;
      
    case 'REFRESH_TRANSLATION':
      if (injector) {
        injector.removeAllTranslations();
        setTimeout(() => {
          injector?.injectTranslations();
        }, 100);
      }
      sendResponse({ success: true });
      break;
      
    case 'TOGGLE_TRANSLATION':
      if (injector) {
        // 切换翻译显示状态的逻辑可以在这里实现
        console.log('Toggle translation requested');
      }
      sendResponse({ success: true });
      break;
      
    default:
      console.warn('Unknown message type:', message.type);
      sendResponse({ error: 'Unknown message type' });
  }
});

// 启动初始化
initializeTranslation();

// 导出供测试使用
export { initializeTranslation, cleanup };