// 调试版本的后台脚本 - 支持手动注入

console.log('DS-160 Debug Background: Starting...');

// 监听扩展安装
chrome.runtime.onInstalled.addListener(() => {
  console.log('DS-160 Debug Background: Extension installed');
});

// 监听标签页更新，主动注入脚本
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('DS-160 Debug Background: Tab updated:', tab.url);
    
    try {
      // 手动注入调试脚本
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          // 内联调试脚本
          console.log('DS-160 Manual Injection: Starting...');
          console.log('DS-160 Manual Injection: URL:', window.location.href);
          console.log('DS-160 Manual Injection: Title:', document.title);
          
          // 添加消息监听器
          if (!window.ds160DebugInjected) {
            window.ds160DebugInjected = true;
            
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
              console.log('DS-160 Manual Injection: Received message:', message);
              
              if (message.type === 'GET_TRANSLATION_STATUS') {
                console.log('DS-160 Manual Injection: Responding to status request');
                sendResponse({
                  initialized: true,
                  enabled: true,
                  translatedCount: 99, // 区分手动注入
                  pageType: 'manual-injection',
                  debug: true,
                  url: window.location.href,
                  title: document.title
                });
              }
              
              return true;
            });
            
            // 延迟检查页面内容
            setTimeout(() => {
              const labels = document.querySelectorAll('label');
              const inputs = document.querySelectorAll('input');
              const bodyText = document.body.textContent || '';
              const hasDS160Content = bodyText.includes('Surname') || bodyText.includes('Given Names') || bodyText.includes('DS-160');
              
              console.log('DS-160 Manual Injection: Found labels:', labels.length);
              console.log('DS-160 Manual Injection: Found inputs:', inputs.length);
              console.log('DS-160 Manual Injection: Has DS-160 content:', hasDS160Content);
              console.log('DS-160 Manual Injection: Body preview:', bodyText.substring(0, 200));
            }, 1000);
          }
        }
      });
      
      console.log('DS-160 Debug Background: Script injected successfully for tab:', tabId);
    } catch (error) {
      console.log('DS-160 Debug Background: Failed to inject script:', error);
    }
  }
});

// 处理来自popup的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('DS-160 Debug Background: Received message:', message);
  sendResponse({ success: true });
  return true;
});

export {};
