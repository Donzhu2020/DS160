/**
 * DS-160 专用刷新解决方案
 * 针对DS-160网站的特殊状态跟踪机制
 */

/**
 * 执行DS-160专用的无弹窗刷新
 */
export function executeDS160SpecificRefresh(): void {
  console.log('🎯 DS-160 SPECIFIC: Starting DS-160 specialized refresh...');
  
  try {
    // 第一步：分析DS-160的状态跟踪机制
    analyzeDS160StateTracking();
    
    // 第二步：清除ASP.NET相关状态
    clearASPNETStates();
    
    // 第三步：清除DS-160特有的状态
    clearDS160SpecificStates();
    
    // 第四步：使用表单提交方式刷新（绕过beforeunload）
    performFormBasedRefresh();
    
  } catch (error) {
    console.error('DS-160 specific refresh failed:', error);
    fallbackDS160Refresh();
  }
}

/**
 * 分析DS-160的状态跟踪机制
 */
function analyzeDS160StateTracking(): void {
  console.log('🔍 Analyzing DS-160 state tracking mechanisms...');
  
  // 查找ASP.NET相关的状态字段
  const aspNetFields = document.querySelectorAll('input[name*="__"]');
  console.log(`Found ${aspNetFields.length} ASP.NET state fields`);
  
  // 查找可能的JS状态变量
  const possibleStateVars = [
    'PageRequestManager', '__doPostBack', 'Sys', 'WebForm_', 
    'isDirty', 'isModified', 'hasChanges', 'pageModified',
    'formChanged', 'dataChanged', 'unsavedChanges'
  ];
  
  possibleStateVars.forEach(varName => {
    if ((window as any)[varName] !== undefined) {
      console.log(`📍 Found state variable: ${varName} =`, (window as any)[varName]);
    }
  });
  
  // 查找事件监听器
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    console.log(`📋 Form ${index + 1}: action="${form.action}", method="${form.method}"`);
  });
}

/**
 * 清除ASP.NET相关状态
 */
function clearASPNETStates(): void {
  console.log('🧹 Clearing ASP.NET states...');
  
  try {
    // 1. 重置ASP.NET页面状态
    const viewStateField = document.querySelector('input[name="__VIEWSTATE"]') as HTMLInputElement;
    const eventValidationField = document.querySelector('input[name="__EVENTVALIDATION"]') as HTMLInputElement;
    const viewStateGeneratorField = document.querySelector('input[name="__VIEWSTATEGENERATOR"]') as HTMLInputElement;
    
    if (viewStateField) {
      console.log('📍 Found __VIEWSTATE, preserving value');
      // 不修改ViewState，因为它包含页面状态
    }
    
    // 2. 清除ASP.NET客户端脚本状态
    const aspNetVars = ['PageRequestManager', '__doPostBack', 'WebForm_DoPostBackWithOptions'];
    aspNetVars.forEach(varName => {
      if ((window as any)[varName]) {
        console.log(`🔧 Found ASP.NET var: ${varName}`);
      }
    });
    
    // 3. 禁用ASP.NET的页面卸载检查
    if ((window as any).WebForm_OnSubmit) {
      const originalWebFormOnSubmit = (window as any).WebForm_OnSubmit;
      (window as any).WebForm_OnSubmit = () => true;
      console.log('🔧 Disabled WebForm_OnSubmit validation');
    }
    
    // 4. 清除可能的ASP.NET dirty标记
    if ((window as any).Sys && (window as any).Sys.WebForms) {
      try {
        // ASP.NET AJAX相关清理
        console.log('🔧 Found ASP.NET AJAX, attempting cleanup');
      } catch (error) {
        console.log('ASP.NET AJAX cleanup failed:', error);
      }
    }
    
  } catch (error) {
    console.log('Error clearing ASP.NET states:', error);
  }
}

/**
 * 清除DS-160特有的状态
 */
function clearDS160SpecificStates(): void {
  console.log('🎯 Clearing DS-160 specific states...');
  
  try {
    // 1. 查找并清除DS-160特有的状态变量
    const ds160StateVars = [
      'formModified', 'pageModified', 'dataChanged', 'hasUnsavedData',
      'isDirtyForm', 'isFormChanged', 'unsavedChanges', 'pendingChanges'
    ];
    
    ds160StateVars.forEach(varName => {
      if ((window as any)[varName] !== undefined) {
        (window as any)[varName] = false;
        console.log(`🔧 Reset DS-160 state: ${varName} = false`);
      }
    });
    
    // 2. 清除可能的jQuery/JavaScript插件状态
    if ((window as any).$ && (window as any).$.fn) {
      try {
        // 如果页面使用jQuery，尝试清除相关状态
        const $ = (window as any).$;
        
        // 清除可能的form dirty插件状态
        $('form').each(function() {
          if ($(this).data('dirty')) {
            $(this).removeData('dirty');
            console.log('🔧 Cleared jQuery form dirty state');
          }
        });
        
        // 触发可能的保存事件
        $('form').trigger('saved');
        $(document).trigger('formSaved');
        
      } catch (error) {
        console.log('jQuery cleanup failed:', error);
      }
    }
    
    // 3. 清除所有自定义数据属性
    const elementsWithData = document.querySelectorAll('[data-dirty], [data-modified], [data-changed]');
    elementsWithData.forEach(element => {
      element.removeAttribute('data-dirty');
      element.removeAttribute('data-modified');
      element.removeAttribute('data-changed');
    });
    
    // 4. 重置所有表单的pristine状态
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
      try {
        // 标记表单为pristine（未修改）
        form.setAttribute('data-pristine', 'true');
        form.classList.add('pristine');
        form.classList.remove('dirty', 'modified');
        
        console.log(`🔧 Marked form ${index + 1} as pristine`);
      } catch (error) {
        console.log(`Error marking form ${index + 1} as pristine:`, error);
      }
    });
    
  } catch (error) {
    console.log('Error clearing DS-160 specific states:', error);
  }
}

/**
 * 使用表单提交方式刷新页面
 */
function performFormBasedRefresh(): void {
  console.log('📋 Performing form-based refresh...');
  
  try {
    // 方法1: 创建一个隐藏的GET表单来"刷新"页面
    const refreshForm = document.createElement('form');
    refreshForm.method = 'GET';
    refreshForm.action = window.location.href.split('?')[0]; // 移除查询参数
    refreshForm.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;';
    
    // 保持当前页面的关键状态
    const currentForm = document.querySelector('form[method="post"]') as HTMLFormElement;
    if (currentForm) {
      // 复制重要的隐藏字段
      const importantFields = currentForm.querySelectorAll('input[type="hidden"][name*="__"]');
      importantFields.forEach(field => {
        const hiddenInput = field.cloneNode(true) as HTMLInputElement;
        refreshForm.appendChild(hiddenInput);
      });
    }
    
    // 添加时间戳防止缓存
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = '_refresh';
    timestampInput.value = Date.now().toString();
    refreshForm.appendChild(timestampInput);
    
    document.body.appendChild(refreshForm);
    
    console.log('🚀 Submitting refresh form...');
    refreshForm.submit();
    
  } catch (error) {
    console.log('Form-based refresh failed:', error);
    
    // 备选方案：使用window.open
    try {
      console.log('🔄 Trying window.open refresh...');
      const newWindow = window.open(window.location.href, '_self');
      if (newWindow) {
        newWindow.focus();
      }
    } catch (error2) {
      console.log('Window.open refresh failed:', error2);
      fallbackDS160Refresh();
    }
  }
}

/**
 * DS-160备选刷新方法
 */
function fallbackDS160Refresh(): void {
  console.log('🆘 Executing DS-160 fallback refresh...');
  
  try {
    // 最后的尝试：直接导航
    console.log('📍 Final attempt: Direct navigation');
    window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + '_t=' + Date.now();
  } catch (error) {
    console.log('All DS-160 refresh methods failed:', error);
    // 真正的最后方案
    window.location.reload();
  }
}

/**
 * 安全的DS-160专用刷新（保存数据后执行专用刷新）
 */
export function safeDS160Refresh(saveCallback?: () => void): void {
  console.log('💾 Safe DS-160 refresh initiated...');
  
  // 1. 保存数据
  if (saveCallback) {
    try {
      saveCallback();
      console.log('✅ Data saved before DS-160 refresh');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
    }
  }
  
  // 2. 短暂延迟后执行DS-160专用刷新
  setTimeout(() => {
    executeDS160SpecificRefresh();
  }, 500); // 稍长的延迟确保保存完成
}
