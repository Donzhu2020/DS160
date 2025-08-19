// 简化的翻译测试脚本
console.log('Simple Translation Test: Starting...');

// 等待页面加载
function waitForLoad() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSimpleTranslations);
  } else {
    injectSimpleTranslations();
  }
}

function injectSimpleTranslations() {
  console.log('Simple Translation Test: Injecting translations...');
  
  // 定义简单的翻译映射
  const translations = [
    { selector: 'label', text: 'Surnames', translation: '姓氏（与护照一致）' },
    { selector: 'label', text: 'Given Names', translation: '名字（与护照一致）' },
    { selector: 'label', text: 'Full Name in Native Alphabet', translation: '本地字母的全名' }
  ];
  
  // 查找并注入翻译
  translations.forEach(({ selector, text, translation }) => {
    const labels = document.querySelectorAll(selector);
    console.log(`Simple Translation Test: Found ${labels.length} ${selector} elements`);
    
    labels.forEach(label => {
      if (label.textContent && label.textContent.includes(text)) {
        console.log(`Simple Translation Test: Found "${text}" label, injecting translation`);
        
        // 创建翻译元素
        const translationSpan = document.createElement('span');
        translationSpan.style.cssText = `
          margin-left: 8px;
          color: #666;
          font-size: 13px;
          background: rgba(59, 130, 246, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        `;
        translationSpan.textContent = translation;
        translationSpan.className = 'ds160-simple-translation';
        
        // 检查是否已经添加过翻译
        if (!label.querySelector('.ds160-simple-translation')) {
          label.appendChild(translationSpan);
          console.log(`Simple Translation Test: Successfully injected "${translation}"`);
        }
      }
    });
  });
  
  // 统计注入的翻译数量
  const injectedCount = document.querySelectorAll('.ds160-simple-translation').length;
  console.log(`Simple Translation Test: Total translations injected: ${injectedCount}`);
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Simple Translation Test: Received message:', message);
  
  if (message.type === 'GET_TRANSLATION_STATUS') {
    const injectedCount = document.querySelectorAll('.ds160-simple-translation').length;
    sendResponse({
      initialized: true,
      enabled: true,
      translatedCount: injectedCount,
      pageType: 'simple-test',
      debug: true,
      url: window.location.href,
      title: document.title
    });
  }
  
  return true;
});

// 启动
waitForLoad();

console.log('Simple Translation Test: Script loaded');

export {};
