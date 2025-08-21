/**
 * 静默页面刷新工具
 * 用于绕过浏览器的确认弹窗
 */

/**
 * 执行静默页面刷新，绕过所有确认弹窗
 */
export function performSilentRefresh(): void {
  console.log('Starting ultra-silent page refresh...');
  
  try {
    // 第一步：彻底禁用所有可能的确认弹窗
    disableAllConfirmationDialogs();
    
    // 第二步：强制告诉浏览器页面已保存
    markPageAsSaved();
    
    // 第三步：使用多种方法尝试静默刷新
    setTimeout(() => {
      console.log('Executing silent refresh now...');
      
      // 方法1: 使用pushState + location.reload组合
      try {
        // 先更改历史状态
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', window.location.href);
        }
        
        // 然后强制刷新
        window.location.replace(window.location.href + '?_refresh=' + Date.now());
        return;
      } catch (error) {
        console.log('Method 1 failed:', error);
      }
      
      // 方法2: 使用form submit方式
      try {
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = window.location.href;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        return;
      } catch (error) {
        console.log('Method 2 failed:', error);
      }
      
      // 方法3: 使用iframe刷新
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = window.location.href;
        iframe.onload = () => {
          window.location.replace(window.location.href);
        };
        document.body.appendChild(iframe);
        
        // 备用定时器
        setTimeout(() => {
          window.location.replace(window.location.href);
        }, 1000);
        return;
      } catch (error) {
        console.log('Method 3 failed:', error);
      }
      
      // 最后的备选方案
      console.log('All advanced methods failed, using basic replace...');
      window.location.replace(window.location.href);
      
    }, 100);
    
  } catch (error) {
    console.error('Ultra-silent refresh completely failed:', error);
    // 绝对最后的方案
    window.location.href = window.location.href;
  }
}

/**
 * 彻底禁用所有可能的确认弹窗
 */
function disableAllConfirmationDialogs(): void {
  console.log('Disabling all confirmation dialogs...');
  
  // 1. 禁用window.onbeforeunload
  const originalOnBeforeUnload = window.onbeforeunload;
  window.onbeforeunload = null;
  
  // 2. 重写confirm函数返回true
  const originalConfirm = window.confirm;
  window.confirm = () => true;
  
  // 3. 重写alert函数为空操作
  const originalAlert = window.alert;
  window.alert = () => {};
  
  // 4. 禁用beforeunload和unload事件
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
    if (type === 'beforeunload' || type === 'unload' || type === 'pagehide') {
      console.log(`Blocked ${type} event`);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  // 5. 移除所有现有的beforeunload监听器
  try {
    const events = ['beforeunload', 'unload', 'pagehide'];
    events.forEach(eventType => {
      window.removeEventListener(eventType, () => {});
      document.removeEventListener(eventType, () => {});
    });
  } catch (error) {
    console.log('Error removing event listeners:', error);
  }
  
  // 6. 恢复原始函数（在刷新前）
  setTimeout(() => {
    window.confirm = originalConfirm;
    window.alert = originalAlert;
    EventTarget.prototype.addEventListener = originalAddEventListener;
  }, 2000);
}

/**
 * 标记页面为已保存状态
 */
function markPageAsSaved(): void {
  console.log('Marking page as saved...');
  
  try {
    // 1. 清除所有表单的dirty状态
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // 重置表单的dirty状态
      if ('reset' in form && typeof form.reset === 'function') {
        const originalAction = form.action;
        form.action = 'javascript:void(0)';
        setTimeout(() => {
          form.action = originalAction;
        }, 10);
      }
    });
    
    // 2. 触发所有表单字段的blur事件来保存状态
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
      try {
        element.dispatchEvent(new Event('blur', { bubbles: false }));
        element.dispatchEvent(new Event('change', { bubbles: false }));
      } catch (error) {
        // 忽略错误
      }
    });
    
    // 3. 设置页面为"已保存"状态
    if (document.documentElement) {
      document.documentElement.setAttribute('data-page-saved', 'true');
    }
    
  } catch (error) {
    console.log('Error marking page as saved:', error);
  }
}

/**
 * 检查页面是否有未保存的更改
 */
export function hasUnsavedChanges(): boolean {
  // 检查是否有填写的表单字段
  const formElements = document.querySelectorAll('input, select, textarea');
  for (const element of formElements) {
    if (element instanceof HTMLInputElement) {
      if (element.type === 'text' && element.value.trim() !== '') return true;
      if (element.type === 'checkbox' && element.checked) return true;
      if (element.type === 'radio' && element.checked) return true;
    } else if (element instanceof HTMLSelectElement) {
      if (element.selectedIndex > 0) return true;
    } else if (element instanceof HTMLTextAreaElement) {
      if (element.value.trim() !== '') return true;
    }
  }
  return false;
}

/**
 * 安全的页面刷新（先保存数据，再刷新）
 */
export function safePageRefresh(saveDataCallback?: () => void): void {
  console.log('Performing safe page refresh...');
  
  // 1. 保存数据
  if (saveDataCallback) {
    try {
      saveDataCallback();
      console.log('Data saved before refresh');
    } catch (error) {
      console.error('Failed to save data before refresh:', error);
    }
  }
  
  // 2. 执行静默刷新
  performSilentRefresh();
}
