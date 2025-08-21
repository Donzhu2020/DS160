/**
 * 强制页面刷新工具 - 绕过所有浏览器保护机制
 */

/**
 * 使用最激进的方法强制刷新页面，完全绕过确认弹窗
 */
export function forceRefreshWithoutConfirmation(): void {
  console.log('🚨 FORCE REFRESH: Starting aggressive page refresh...');
  
  try {
    // 第1步：完全劫持浏览器的确认机制
    hijackBrowserConfirmation();
    
    // 第2步：使用多种激进方法同时尝试刷新
    executeAggressiveRefresh();
    
  } catch (error) {
    console.error('Force refresh failed:', error);
    // 最后的最后 - 直接设置location
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 100);
  }
}

/**
 * 劫持浏览器的所有确认机制
 */
function hijackBrowserConfirmation(): void {
  console.log('🔧 Hijacking browser confirmation mechanisms...');
  
  // 1. 完全禁用beforeunload
  Object.defineProperty(window, 'onbeforeunload', {
    get: () => null,
    set: () => {},
    configurable: false,
    enumerable: false
  });
  
  // 2. 劫持所有可能的确认函数
  const alwaysTrue = () => true;
  const alwaysFalse = () => false;
  const doNothing = () => {};
  
  window.confirm = alwaysTrue;
  window.alert = doNothing;
  
  // 3. 劫击 addEventListener 来阻止 beforeunload
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
    if (type === 'beforeunload' || type === 'unload' || type === 'pagehide') {
      console.log(`🚫 BLOCKED: ${type} event`);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  // 4. 阻止页面的默认卸载行为
  try {
    document.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }, { capture: true, passive: false });
    
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }, { capture: true, passive: false });
  } catch (error) {
    console.log('Error setting up unload prevention:', error);
  }
}

/**
 * 执行激进的页面刷新
 */
function executeAggressiveRefresh(): void {
  console.log('⚡ Executing aggressive refresh methods...');
  
  // 方法1: 使用 History API + 强制导航
  setTimeout(() => {
    try {
      console.log('🔄 Method 1: History API + navigation');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.href + '?t=' + Date.now());
        window.location.replace(window.location.href);
      }
    } catch (error) {
      console.log('Method 1 failed:', error);
    }
  }, 50);
  
  // 方法2: 使用隐藏表单提交
  setTimeout(() => {
    try {
      console.log('🔄 Method 2: Hidden form submission');
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = window.location.href;
      form.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;';
      
      // 添加隐藏字段防止缓存
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = '_refresh';
      input.value = Date.now().toString();
      form.appendChild(input);
      
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.log('Method 2 failed:', error);
    }
  }, 100);
  
  // 方法3: 使用iframe重定向
  setTimeout(() => {
    try {
      console.log('🔄 Method 3: Iframe redirection');
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;visibility:hidden;';
      iframe.src = 'javascript:parent.location.replace(parent.location.href)';
      document.body.appendChild(iframe);
    } catch (error) {
      console.log('Method 3 failed:', error);
    }
  }, 150);
  
  // 方法4: 多重备选方案
  setTimeout(() => {
    try {
      console.log('🔄 Method 4: Multiple fallback attempts');
      
      // 4a: document.location
      document.location.href = document.location.href;
      
      // 4b: window.open + close
      setTimeout(() => {
        const newWindow = window.open(window.location.href, '_self');
        if (newWindow) {
          newWindow.focus();
        }
      }, 50);
      
      // 4c: 强制设置 window.location
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 100);
      
    } catch (error) {
      console.log('Method 4 failed:', error);
    }
  }, 200);
  
  // 方法5: 绝对备选方案 - 使用eval执行刷新
  setTimeout(() => {
    try {
      console.log('🔄 Method 5: Eval-based refresh (last resort)');
      eval('window.location.href = window.location.href');
    } catch (error) {
      console.log('Method 5 failed:', error);
      
      // 真正的最后方案
      setTimeout(() => {
        console.log('🔄 FINAL: Direct location assignment');
        window.location = window.location;
      }, 100);
    }
  }, 300);
}

/**
 * 安全的强制刷新（保存数据后强制刷新）
 */
export function safeForceRefresh(saveCallback?: () => void): void {
  console.log('💾 Safe force refresh initiated...');
  
  // 1. 保存数据
  if (saveCallback) {
    try {
      saveCallback();
      console.log('✅ Data saved successfully');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
    }
  }
  
  // 2. 短暂延迟后执行强制刷新
  setTimeout(() => {
    forceRefreshWithoutConfirmation();
  }, 200);
}
