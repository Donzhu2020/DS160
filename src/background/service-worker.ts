// DS-160 中文助手 - 后台服务工作器

console.log('DS-160 Chinese Helper background service worker loaded');

// 安装事件
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // 首次安装，可以设置默认配置或显示欢迎页面
    chrome.storage.local.set({
      ds160_translation_settings: {
        enabled: true,
        mode: 'brief',
        showNotes: true,
        position: 'right'
      }
    });
  }
});

// 处理来自content script或popup的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  switch (message.type) {
    case 'GET_EXTENSION_INFO':
      sendResponse({
        version: chrome.runtime.getManifest().version,
        name: chrome.runtime.getManifest().name
      });
      break;
      
    case 'LOG_ANALYTICS':
      // 这里可以添加分析日志记录
      console.log('Analytics event:', message.event, message.data);
      sendResponse({ success: true });
      break;
      
    default:
      console.warn('Unknown message type:', message.type);
      sendResponse({ error: 'Unknown message type' });
  }
  
  return true; // 保持消息通道开放
});

// 标签页更新事件（可选：检测DS-160页面导航）
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 只在页面完全加载后执行
  if (changeInfo.status === 'complete' && tab.url?.includes('ceac.state.gov')) {
    console.log('DS-160 page loaded:', tab.url);
    
    // 可以在这里注入内容脚本（如果需要动态注入）
    // 或者发送消息通知popup更新状态
  }
});

// 存储变化监听（用于调试）
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('Storage changed:', namespace, changes);
});

// 处理扩展图标点击（当没有popup时）
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked', tab.url);
  
  // 如果不是DS-160页面，可以显示提示
  if (!tab.url?.includes('ceac.state.gov')) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: 'DS-160 中文助手',
      message: '请打开DS-160申请页面以使用翻译功能'
    });
  }
});

// 错误处理
self.addEventListener('error', (event) => {
  console.error('Background script error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Background script unhandled rejection:', event.reason);
});

export {}; // 确保这是一个模块
