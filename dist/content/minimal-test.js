// 最简化的测试脚本
console.log('Minimal Test: Script loaded successfully');

// 简单的页面检测
setTimeout(() => {
  console.log('Minimal Test: Page title:', document.title);
  console.log('Minimal Test: URL:', window.location.href);
  
  // 查找labels
  const labels = document.querySelectorAll('label');
  console.log('Minimal Test: Found', labels.length, 'labels');
  
  // 尝试简单的翻译注入
  labels.forEach((label, index) => {
    if (label.textContent && label.textContent.includes('Surnames')) {
      console.log('Minimal Test: Found Surnames label, adding translation');
      
      const span = document.createElement('span');
      span.textContent = ' 姓氏';
      span.style.color = 'blue';
      span.style.marginLeft = '5px';
      label.appendChild(span);
    }
  });
}, 2000);

// 处理消息
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Minimal Test: Received message:', message);
    if (message.type === 'GET_TRANSLATION_STATUS') {
      sendResponse({
        initialized: true,
        enabled: true,
        translatedCount: 1,
        pageType: 'minimal-test'
      });
    }
    return true;
  });
}
