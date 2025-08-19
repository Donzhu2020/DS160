// 调试版本的内容脚本
console.log('DS-160 Debug Script: Starting...');
console.log('Current URL:', window.location.href);
console.log('Document ready state:', document.readyState);

// 立即发送状态消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Debug: Received message:', message);
  
  if (message.type === 'GET_TRANSLATION_STATUS') {
    console.log('Debug: Responding to status request');
    sendResponse({
      initialized: true,
      enabled: true,
      translatedCount: 0,
      pageType: 'debug',
      debug: true,
      url: window.location.href,
      title: document.title
    });
  }
  
  return true;
});

// 检查页面内容
setTimeout(() => {
  console.log('Debug: Page title:', document.title);
  console.log('Debug: Body content preview:', document.body.textContent?.substring(0, 200));
  
  // 寻找常见的DS-160元素
  const labels = document.querySelectorAll('label');
  console.log('Debug: Found labels:', labels.length);
  
  const inputs = document.querySelectorAll('input');
  console.log('Debug: Found inputs:', inputs.length);
  
  // 检查是否包含DS-160相关文本
  const bodyText = document.body.textContent || '';
  const hasDS160Content = bodyText.includes('Surname') || bodyText.includes('Given Names') || bodyText.includes('DS-160');
  console.log('Debug: Has DS-160 content:', hasDS160Content);
  
}, 1000);

console.log('DS-160 Debug Script: Loaded successfully');
