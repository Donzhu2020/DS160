/**
 * 终极页面刷新解决方案
 * 使用最底层的技术绕过所有浏览器保护
 */

/**
 * 执行终极静默刷新 - 绕过所有可能的浏览器拦截
 */
export function executeUltimateRefresh(): void {
  console.log('🔥 ULTIMATE REFRESH: Starting nuclear option...');
  
  try {
    // 第一步：完全重写浏览器原生方法
    overrideBrowserNativeMethods();
    
    // 第二步：使用iframe隔离刷新
    performIsolatedRefresh();
    
  } catch (error) {
    console.error('Ultimate refresh failed:', error);
    fallbackRefresh();
  }
}

/**
 * 重写浏览器原生方法
 */
function overrideBrowserNativeMethods(): void {
  console.log('🔧 Overriding browser native methods...');
  
  // 1. 重写 Location 对象的方法
  const originalReplace = Location.prototype.replace;
  const originalAssign = Location.prototype.assign;
  
  // 2. 完全禁用 beforeunload 在原型级别
  const beforeUnloadDescriptor = Object.getOwnPropertyDescriptor(WindowEventHandlers.prototype, 'onbeforeunload');
  if (beforeUnloadDescriptor) {
    Object.defineProperty(WindowEventHandlers.prototype, 'onbeforeunload', {
      get: () => null,
      set: () => {},
      configurable: false,
      enumerable: false
    });
  }
  
  // 3. 重写 addEventListener 在原型级别
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
    if (type === 'beforeunload' || type === 'unload' || type === 'pagehide') {
      console.log(`🚫 NUCLEAR BLOCK: ${type} event`);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  // 4. 重写 confirm 和 prompt 在全局级别
  Object.defineProperty(window, 'confirm', {
    value: () => true,
    writable: false,
    configurable: false
  });
  
  Object.defineProperty(window, 'alert', {
    value: () => {},
    writable: false,
    configurable: false
  });
  
  // 5. 防止任何形式的对话框
  const dialog = window.showModalDialog;
  if (dialog) {
    Object.defineProperty(window, 'showModalDialog', {
      value: () => true,
      writable: false,
      configurable: false
    });
  }
}

/**
 * 使用iframe执行隔离刷新
 */
function performIsolatedRefresh(): void {
  console.log('🚀 Performing isolated iframe refresh...');
  
  // 方法1: 使用隐藏iframe执行刷新
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;visibility:hidden;opacity:0;';
  iframe.sandbox = 'allow-scripts allow-same-origin allow-top-navigation';
  
  // 设置iframe内容来执行刷新
  iframe.onload = () => {
    try {
      // 从iframe内部执行刷新
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc && iframe.contentWindow) {
        iframe.contentWindow.eval(`
          parent.location.replace(parent.location.href + '?refresh=' + Date.now());
        `);
      }
    } catch (error) {
      console.log('Iframe method failed, trying direct methods...');
      executeDirectRefresh();
    }
  };
  
  iframe.src = 'data:text/html,<script>setTimeout(() => parent.location.replace(parent.location.href + "?t=" + Date.now()), 100);</script>';
  document.body.appendChild(iframe);
  
  // 备用定时器
  setTimeout(() => {
    executeDirectRefresh();
  }, 1000);
}

/**
 * 执行直接刷新方法
 */
function executeDirectRefresh(): void {
  console.log('⚡ Executing direct refresh methods...');
  
  // 方法1: 使用 document.write 重写页面
  setTimeout(() => {
    try {
      const currentHref = window.location.href;
      document.open();
      document.write(`<script>window.location.replace('${currentHref}?t=${Date.now()}');</script>`);
      document.close();
    } catch (error) {
      console.log('Document.write method failed:', error);
    }
  }, 100);
  
  // 方法2: 使用 createObjectURL + 重定向
  setTimeout(() => {
    try {
      const blob = new Blob([`<script>location.replace('${window.location.href}?t=${Date.now()}');</script>`], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      window.location.replace(url);
    } catch (error) {
      console.log('Blob URL method failed:', error);
    }
  }, 200);
  
  // 方法3: 使用 pushState + popstate 组合
  setTimeout(() => {
    try {
      const currentUrl = window.location.href;
      window.history.pushState({}, '', currentUrl + '?refresh=' + Date.now());
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.location.replace(currentUrl);
    } catch (error) {
      console.log('History manipulation method failed:', error);
    }
  }, 300);
  
  // 方法4: 使用 Service Worker 重定向（如果可用）
  if ('serviceWorker' in navigator) {
    setTimeout(() => {
      try {
        navigator.serviceWorker.ready.then(() => {
          window.location.replace(window.location.href + '?sw=' + Date.now());
        });
      } catch (error) {
        console.log('Service Worker method failed:', error);
      }
    }, 400);
  }
  
  // 方法5: 终极备选方案 - 强制设置location
  setTimeout(() => {
    console.log('🔥 FINAL NUCLEAR OPTION: Force location assignment');
    try {
      // 禁用所有可能的拦截
      Object.defineProperty(window, 'onbeforeunload', {value: null, writable: false});
      Object.defineProperty(document, 'onbeforeunload', {value: null, writable: false});
      
      // 强制刷新
      window.location.href = window.location.href + '?final=' + Date.now();
    } catch (error) {
      console.log('Final method failed:', error);
      window.location.reload(true);
    }
  }, 500);
}

/**
 * 备选刷新方法
 */
function fallbackRefresh(): void {
  console.log('🆘 Executing fallback refresh...');
  
  setTimeout(() => {
    window.location.href = window.location.href;
  }, 100);
}

/**
 * 安全的终极刷新（保存数据后执行终极刷新）
 */
export function safeUltimateRefresh(saveCallback?: () => void): void {
  console.log('💾 Safe ultimate refresh initiated...');
  
  // 1. 保存数据
  if (saveCallback) {
    try {
      saveCallback();
      console.log('✅ Data saved before ultimate refresh');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
    }
  }
  
  // 2. 短暂延迟后执行终极刷新
  setTimeout(() => {
    executeUltimateRefresh();
  }, 300);
}
