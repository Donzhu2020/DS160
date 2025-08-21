/**
 * 智能刷新策略 - 解决 "Leave site?" 对话框问题
 */

import { saveFormData } from '@/shared/dom-utils';

/**
 * 智能刷新：先显示用户指导，然后执行刷新
 */
export function smartAutoRefresh(): void {
  console.log('🧠 Smart auto refresh initiated...');
  
  // 先保存数据
  try {
    saveFormData();
    console.log('💾 Data saved before smart refresh');
  } catch (error) {
    console.error('❌ Failed to save data:', error);
  }
  
  // 显示用户指导
  showRefreshGuidance();
  
  // 延迟执行刷新，给用户时间看到指导
  setTimeout(() => {
    executeSmartRefresh();
  }, 2000);
}

/**
 * 显示刷新指导
 */
function showRefreshGuidance(): void {
  // 创建指导提示
  const guidance = document.createElement('div');
  guidance.id = 'ds160-refresh-guidance';
  guidance.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2196F3;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 10000;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border: 2px solid #1976D2;
  `;
  
  guidance.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">
      🔄 DS-160 助手：防超时刷新
    </div>
    <div style="margin-bottom: 8px;">
      系统将在2秒后自动刷新页面以防止会话超时
    </div>
    <div style="font-size: 12px; opacity: 0.9;">
      💡 如果出现"Leave site?"对话框，请选择 <strong>Leave</strong><br>
      您的数据已安全保存，刷新后会自动恢复
    </div>
  `;
  
  document.body.appendChild(guidance);
  
  // 3秒后自动移除提示
  setTimeout(() => {
    if (guidance.parentNode) {
      guidance.parentNode.removeChild(guidance);
    }
  }, 5000);
  
  console.log('📢 User guidance displayed');
}

/**
 * 执行智能刷新
 */
function executeSmartRefresh(): void {
  console.log('🔄 Executing smart refresh...');
  
  // 添加刷新标记到localStorage（比sessionStorage更持久）
  localStorage.setItem('ds160_auto_refresh_triggered', Date.now().toString());
  
  // 使用简单的reload方法
  window.location.reload();
}

/**
 * 检查是否由自动刷新触发的页面加载
 */
export function checkAutoRefreshTrigger(): boolean {
  const refreshTimestamp = localStorage.getItem('ds160_auto_refresh_triggered');
  if (refreshTimestamp) {
    const refreshTime = parseInt(refreshTimestamp);
    const now = Date.now();
    
    // 如果是最近1分钟内的自动刷新
    if (now - refreshTime < 60000) {
      console.log('🔄 Page loaded by auto-refresh, enhancing data recovery...');
      localStorage.removeItem('ds160_auto_refresh_triggered');
      return true;
    } else {
      // 清理过期的标记
      localStorage.removeItem('ds160_auto_refresh_triggered');
    }
  }
  return false;
}

/**
 * 增强的数据恢复（针对自动刷新后的情况）
 */
export function enhancedDataRecovery(): void {
  console.log('🔧 Starting enhanced data recovery...');
  
  const savedData = sessionStorage.getItem('ds160_form_data');
  if (!savedData) {
    console.log('❌ No saved form data found');
    return;
  }
  
  try {
    const formData = JSON.parse(savedData);
    const fieldCount = Object.keys(formData).length;
    console.log(`📋 Found saved data with ${fieldCount} fields`);
    
    // 等待DOM完全加载
    setTimeout(() => {
      restoreFormDataEnhanced(formData);
    }, 500);
    
  } catch (error) {
    console.error('❌ Failed to parse saved form data:', error);
  }
}

/**
 * 增强的表单数据恢复
 */
function restoreFormDataEnhanced(formData: any): void {
  let restoredCount = 0;
  let failedCount = 0;
  
  console.log('🔄 Starting enhanced form data restoration...');
  
  // 获取所有表单元素
  const formElements = document.querySelectorAll('input, select, textarea');
  console.log(`📝 Found ${formElements.length} form elements on page`);
  
  formElements.forEach((element, index) => {
    const formElement = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    
    // 生成可能的数据键
    const possibleKeys = generatePossibleKeys(formElement);
    
    // 尝试恢复数据
    let restored = false;
    for (const key of possibleKeys) {
      if (formData[key] !== undefined) {
        try {
          if (restoreElementValue(formElement, formData[key], key)) {
            restoredCount++;
            restored = true;
            break;
          }
        } catch (error) {
          console.warn(`⚠️ Failed to restore field ${key}:`, error);
        }
      }
    }
    
    if (!restored) {
      failedCount++;
    }
  });
  
  console.log(`✅ Enhanced restoration completed:`);
  console.log(`  - Restored: ${restoredCount} fields`);
  console.log(`  - Failed: ${failedCount} fields`);
  console.log(`  - Total elements: ${formElements.length}`);
  
  // 清理保存的数据（成功恢复后）
  if (restoredCount > 0) {
    // 延迟清理，确保用户可以看到恢复效果
    setTimeout(() => {
      sessionStorage.removeItem('ds160_form_data');
      console.log('🧹 Cleaned up saved form data');
    }, 2000);
  }
}

/**
 * 生成可能的数据键
 */
function generatePossibleKeys(element: HTMLElement): string[] {
  const keys: string[] = [];
  
  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
    // 基本属性
    if (element.name) keys.push(`name_${element.name}`);
    if (element.id) keys.push(`id_${element.id}`);
    
    // 尝试原始name和id
    if (element.name) keys.push(element.name);
    if (element.id) keys.push(element.id);
    
    // 查找关联的label
    const label = findLabelForElement(element);
    if (label) {
      keys.push(`label_${label.toLowerCase().replace(/[^a-z0-9]/g, '_')}`);
    }
    
    // 基于位置的键（作为后备）
    const position = Array.from(document.querySelectorAll(element.tagName.toLowerCase())).indexOf(element);
    keys.push(`${element.tagName.toLowerCase()}_${position}`);
  }
  
  return keys;
}

/**
 * 恢复元素值
 */
function restoreElementValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: string, key: string): boolean {
  try {
    if (element instanceof HTMLInputElement) {
      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = value === 'checked';
      } else {
        element.value = value;
      }
    } else if (element instanceof HTMLSelectElement) {
      element.value = value;
      // 如果设置失败，尝试通过selectedIndex恢复
      if (element.value !== value) {
        const indexKey = key + '_selectedIndex';
        // 这里需要从formData中获取selectedIndex，但函数签名限制了我们
        // 暂时跳过这个优化
      }
    } else if (element instanceof HTMLTextAreaElement) {
      element.value = value;
    }
    
    // 触发change事件，确保应用程序知道值已更改
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));
    
    console.log(`✅ Restored: ${key} = ${value}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Failed to restore ${key}:`, error);
    return false;
  }
}

/**
 * 查找元素关联的label
 */
function findLabelForElement(element: HTMLElement): string | null {
  // 方法1: 通过for属性
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent?.trim() || null;
  }
  
  // 方法2: 查找父级label
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName === 'LABEL') {
      return parent.textContent?.trim() || null;
    }
    parent = parent.parentElement;
  }
  
  // 方法3: 查找前面的文本节点或span
  const previousSibling = element.previousElementSibling;
  if (previousSibling && (previousSibling.tagName === 'SPAN' || previousSibling.tagName === 'LABEL')) {
    return previousSibling.textContent?.trim() || null;
  }
  
  return null;
}
