import { TranslationInjector } from './translation-injector';
import { TranslationUIController } from './ui-controller';
import { loadMergedTranslationData, detectCurrentPage } from './translation-loader';
import { getSettings, onSettingsChange } from '@/shared/storage';
import { waitForDOM, saveFormData, restoreFormData, throttle } from '@/shared/dom-utils';
import { safeGentleRefresh } from './gentle-refresh';

// 全局实例
let injector: TranslationInjector | null = null;
let uiController: TranslationUIController | null = null;

// 用户活动跟踪
let lastActivityTime = Date.now();
let autoRefreshTimer: number | null = null;

// 🎯 优化后的配置参数
const AUTO_REFRESH_CONFIG = {
  // 自动保存间隔：30秒（之前是5秒，减少性能影响）
  AUTO_SAVE_THROTTLE: 30 * 1000,
  
  // 无活动阈值：2分钟（保持不变，这个合理）
  INACTIVE_THRESHOLD: 2 * 60 * 1000,
  
  // 检查间隔：60秒（之前是5分钟，更及时检测）
  CHECK_INTERVAL: 60 * 1000,
  
  // 表单数据恢复延迟
  RESTORE_DELAY: 100
};

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
    
    // 恢复表单数据（如果有的话）
    setTimeout(() => {
      restoreFormData();
    }, AUTO_REFRESH_CONFIG.RESTORE_DELAY);
    
    // 设置用户活动监听器和自动刷新机制
    setupOptimizedAutoRefresh();
    
    console.log('DS-160 Chinese Helper: Translation initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize translation:', error);
  }
}

/**
 * 更新用户活动时间
 */
function updateActivityTime(): void {
  lastActivityTime = Date.now();
}

/**
 * 设置优化后的自动刷新机制
 */
function setupOptimizedAutoRefresh(): void {
  // 添加用户活动监听器
  const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  activityEvents.forEach(eventType => {
    document.addEventListener(eventType, updateActivityTime, { passive: true });
  });

  // 添加表单输入监听器，优化后的保存频率
  const throttledSave = throttle(() => {
    console.log('📝 Auto-saving form data (30s throttle)...');
    saveFormData();
  }, AUTO_REFRESH_CONFIG.AUTO_SAVE_THROTTLE); // 30秒节流，合理的保存频率
  
  const formEvents = ['input', 'change', 'blur'];
  formEvents.forEach(eventType => {
    document.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {
        throttledSave();
      }
    }, { passive: true });
  });

  // 设置定时器，每60秒检查一次用户活动（之前是5分钟，更及时）
  autoRefreshTimer = window.setInterval(() => {
    const inactiveTime = Date.now() - lastActivityTime;
    
    if (inactiveTime > AUTO_REFRESH_CONFIG.INACTIVE_THRESHOLD) {
      console.log(`⏰ User inactive for ${Math.floor(inactiveTime / 1000)}s (threshold: ${AUTO_REFRESH_CONFIG.INACTIVE_THRESHOLD / 1000}s), triggering refresh...`);
      
      // 使用温和刷新方法
      safeGentleRefresh(saveFormData);
    } else {
      // 显示活动状态（开发调试用）
      const remainingTime = AUTO_REFRESH_CONFIG.INACTIVE_THRESHOLD - inactiveTime;
      console.log(`🟢 User active, ${Math.floor(remainingTime / 1000)}s until refresh threshold`);
    }
  }, AUTO_REFRESH_CONFIG.CHECK_INTERVAL); // 每60秒检查一次

  console.log(`🔄 Optimized auto refresh initialized:`);
  console.log(`  - Save interval: ${AUTO_REFRESH_CONFIG.AUTO_SAVE_THROTTLE / 1000}s`);
  console.log(`  - Inactive threshold: ${AUTO_REFRESH_CONFIG.INACTIVE_THRESHOLD / 1000}s`);
  console.log(`  - Check interval: ${AUTO_REFRESH_CONFIG.CHECK_INTERVAL / 1000}s`);
}

/**
 * 清理资源
 */
function cleanup(): void {
  // 清理自动刷新定时器
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }

  // 移除用户活动监听器
  const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  activityEvents.forEach(eventType => {
    document.removeEventListener(eventType, updateActivityTime);
  });

  // 移除表单输入监听器
  const formEvents = ['input', 'change', 'select'];
  formEvents.forEach(eventType => {
    document.removeEventListener(eventType, updateActivityTime);
  });

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
      // 使用温和刷新方法
      safeGentleRefresh(saveFormData);
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