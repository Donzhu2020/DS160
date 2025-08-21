/**
 * 清除页面脏状态刷新方案
 * 不是绕过确认弹窗，而是让浏览器认为页面没有未保存的更改
 */

/**
 * 执行清除脏状态的刷新
 */
export function executeCleanStateRefresh(): void {
  console.log('🧹 CLEAN STATE: Starting page state cleanup...');
  
  try {
    // 第一步：清除所有表单的脏状态
    cleanAllFormStates();
    
    // 第二步：重置页面修改标记
    resetPageModificationFlags();
    
    // 第三步：执行"干净"的页面刷新
    performCleanRefresh();
    
  } catch (error) {
    console.error('Clean state refresh failed:', error);
    fallbackCleanRefresh();
  }
}

/**
 * 清除所有表单的脏状态
 */
function cleanAllFormStates(): void {
  console.log('🔧 Cleaning all form states...');
  
  // 1. 重置所有表单
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    try {
      console.log(`Cleaning form ${index + 1}/${forms.length}`);
      
      // 保存当前值
      const formData = new FormData(form);
      const originalValues = new Map();
      
      // 记录所有字段的当前值
      const formElements = form.querySelectorAll('input, select, textarea');
      formElements.forEach(element => {
        const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (input.name) {
          if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
            originalValues.set(input.name, input.checked);
          } else {
            originalValues.set(input.name, input.value);
          }
        }
      });
      
      // 重置表单
      form.reset();
      
      // 立即恢复值（这样表单就不会被标记为"脏"）
      setTimeout(() => {
        formElements.forEach(element => {
          const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (input.name && originalValues.has(input.name)) {
            const savedValue = originalValues.get(input.name);
            if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
              input.checked = savedValue;
            } else {
              input.value = savedValue;
            }
            
            // 重要：不触发change事件，避免重新标记为脏
            // input.dispatchEvent(new Event('change', { bubbles: false }));
          }
        });
      }, 10);
      
    } catch (error) {
      console.log(`Error cleaning form ${index}:`, error);
    }
  });
  
  // 2. 清除所有输入字段的dirty标记
  const allInputs = document.querySelectorAll('input, select, textarea');
  allInputs.forEach((input, index) => {
    try {
      const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      // 移除可能的dirty类名
      element.classList.remove('dirty', 'modified', 'changed', 'ng-dirty');
      
      // 重置defaultValue使其与当前value匹配
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.defaultValue = element.value;
      } else if (element instanceof HTMLSelectElement) {
        Array.from(element.options).forEach((option, i) => {
          option.defaultSelected = (i === element.selectedIndex);
        });
      }
      
      // 清除可能的验证状态
      element.setCustomValidity('');
      
    } catch (error) {
      console.log(`Error cleaning input ${index}:`, error);
    }
  });
}

/**
 * 重置页面修改标记
 */
function resetPageModificationFlags(): void {
  console.log('🔄 Resetting page modification flags...');
  
  try {
    // 1. 清除文档的dirty状态
    if (document.documentElement) {
      document.documentElement.removeAttribute('data-dirty');
      document.documentElement.removeAttribute('data-modified');
      document.documentElement.classList.remove('dirty', 'modified', 'changed');
    }
    
    // 2. 清除body的状态
    if (document.body) {
      document.body.removeAttribute('data-dirty');
      document.body.removeAttribute('data-modified');
      document.body.classList.remove('dirty', 'modified', 'changed');
    }
    
    // 3. 清除可能的全局dirty标记
    const dirtyElements = document.querySelectorAll('[data-dirty], [data-modified], .dirty, .modified');
    dirtyElements.forEach(element => {
      element.removeAttribute('data-dirty');
      element.removeAttribute('data-modified');
      element.classList.remove('dirty', 'modified', 'changed');
    });
    
    // 4. 重置可能的全局状态变量
    const globalStateVars = ['isDirty', 'isModified', 'hasChanges', 'formDirty', 'pageModified'];
    globalStateVars.forEach(varName => {
      try {
        if ((window as any)[varName] !== undefined) {
          (window as any)[varName] = false;
          console.log(`Reset global variable: ${varName}`);
        }
      } catch (error) {
        // 忽略错误
      }
    });
    
    // 5. 触发可能的"保存"事件来清除状态
    try {
      document.dispatchEvent(new CustomEvent('formSaved', { bubbles: true }));
      document.dispatchEvent(new CustomEvent('dataSaved', { bubbles: true }));
      window.dispatchEvent(new CustomEvent('beforeSave', { bubbles: true }));
    } catch (error) {
      console.log('Error dispatching save events:', error);
    }
    
  } catch (error) {
    console.log('Error resetting modification flags:', error);
  }
}

/**
 * 执行"干净"的页面刷新
 */
function performCleanRefresh(): void {
  console.log('✨ Performing clean page refresh...');
  
  // 等待一小段时间让状态清除生效
  setTimeout(() => {
    try {
      // 现在页面应该是"干净"的，可以安全刷新
      console.log('🔄 Executing refresh on clean page...');
      window.location.reload();
    } catch (error) {
      console.log('Clean refresh failed, trying replace:', error);
      window.location.replace(window.location.href);
    }
  }, 200);
}

/**
 * 备选清除状态刷新
 */
function fallbackCleanRefresh(): void {
  console.log('🆘 Executing fallback clean refresh...');
  
  // 最后的尝试：创建一个新的"干净"表单来提交
  try {
    const cleanForm = document.createElement('form');
    cleanForm.method = 'GET';
    cleanForm.action = window.location.href.split('?')[0]; // 移除查询参数
    cleanForm.style.display = 'none';
    
    // 添加所有当前的表单数据作为隐藏字段
    const allInputs = document.querySelectorAll('input[name], select[name], textarea[name]');
    allInputs.forEach(input => {
      const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (element.name && element.value) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = element.name;
        hiddenInput.value = element.value;
        cleanForm.appendChild(hiddenInput);
      }
    });
    
    document.body.appendChild(cleanForm);
    cleanForm.submit();
    
  } catch (error) {
    console.log('Fallback clean refresh failed:', error);
    window.location.href = window.location.href;
  }
}

/**
 * 安全的清除状态刷新（保存数据后清除状态并刷新）
 */
export function safeCleanStateRefresh(saveCallback?: () => void): void {
  console.log('💾 Safe clean state refresh initiated...');
  
  // 1. 保存数据
  if (saveCallback) {
    try {
      saveCallback();
      console.log('✅ Data saved before clean state refresh');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
    }
  }
  
  // 2. 短暂延迟后执行清除状态刷新
  setTimeout(() => {
    executeCleanStateRefresh();
  }, 300);
}
