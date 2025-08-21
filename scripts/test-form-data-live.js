/**
 * 实时测试表单数据保存和恢复功能
 * 在DS-160页面的控制台中运行此脚本
 */

console.log('🧪 开始实时表单数据测试...');

// 1. 查找并填写表单字段
function fillTestData() {
  console.log('=== 步骤1: 填写测试数据 ===');
  
  const formElements = document.querySelectorAll('input, select, textarea');
  console.log(`找到 ${formElements.length} 个表单元素`);
  
  let filledCount = 0;
  formElements.forEach((element, index) => {
    try {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'text' || element.type === 'email') {
          element.value = `测试数据${index}`;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          filledCount++;
        } else if (element.type === 'checkbox') {
          element.checked = true;
          element.dispatchEvent(new Event('change', { bubbles: true }));
          filledCount++;
        } else if (element.type === 'radio') {
          element.checked = true;
          element.dispatchEvent(new Event('change', { bubbles: true }));
          filledCount++;
        }
      } else if (element instanceof HTMLSelectElement && element.options.length > 1) {
        element.selectedIndex = 1;
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filledCount++;
      } else if (element instanceof HTMLTextAreaElement) {
        element.value = `测试文本内容${index}`;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        filledCount++;
      }
    } catch (error) {
      console.warn('填写元素失败:', element, error);
    }
  });
  
  console.log(`✅ 成功填写 ${filledCount} 个表单字段`);
  return filledCount;
}

// 2. 手动触发保存
function triggerSave() {
  console.log('=== 步骤2: 手动触发保存 ===');
  
  if (typeof saveFormData === 'function') {
    saveFormData();
    console.log('✅ 手动保存完成');
  } else {
    console.error('❌ saveFormData 函数未找到');
  }
}

// 3. 检查保存的数据
function checkSavedData() {
  console.log('=== 步骤3: 检查保存的数据 ===');
  
  const savedData = sessionStorage.getItem('ds160_form_data');
  if (savedData) {
    const data = JSON.parse(savedData);
    console.log('✅ 找到保存的数据:', Object.keys(data).length, '个字段');
    console.log('数据预览:', data);
    return data;
  } else {
    console.log('❌ 未找到保存的数据');
    return null;
  }
}

// 4. 清空表单并恢复数据
function testRestore() {
  console.log('=== 步骤4: 测试数据恢复 ===');
  
  // 先清空当前表单
  const formElements = document.querySelectorAll('input, select, textarea');
  let clearedCount = 0;
  formElements.forEach(element => {
    try {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'text' || element.type === 'email') {
          element.value = '';
          clearedCount++;
        } else if (element.type === 'checkbox' || element.type === 'radio') {
          element.checked = false;
          clearedCount++;
        }
      } else if (element instanceof HTMLSelectElement) {
        element.selectedIndex = 0;
        clearedCount++;
      } else if (element instanceof HTMLTextAreaElement) {
        element.value = '';
        clearedCount++;
      }
    } catch (error) {
      console.warn('清空元素失败:', element, error);
    }
  });
  
  console.log(`🧹 清空了 ${clearedCount} 个表单字段`);
  
  // 等待一秒后恢复数据
  setTimeout(() => {
    if (typeof restoreFormData === 'function') {
      restoreFormData();
      console.log('✅ 数据恢复完成');
      
      // 检查恢复结果
      setTimeout(() => {
        const filledAfterRestore = document.querySelectorAll('input[value]:not([value=""]), select option:checked:not(:first-child), textarea:not(:empty)').length;
        console.log(`📊 恢复后有值的字段数量: ${filledAfterRestore}`);
      }, 500);
    } else {
      console.error('❌ restoreFormData 函数未找到');
    }
  }, 1000);
}

// 5. 完整测试流程
function runCompleteTest() {
  console.log('🚀 开始完整的表单数据测试流程...');
  
  // 步骤1: 填写测试数据
  const filledCount = fillTestData();
  
  setTimeout(() => {
    // 步骤2: 手动保存
    triggerSave();
    
    setTimeout(() => {
      // 步骤3: 检查保存的数据
      const savedData = checkSavedData();
      
      if (savedData && Object.keys(savedData).length > 0) {
        setTimeout(() => {
          // 步骤4: 测试恢复
          testRestore();
        }, 1000);
      } else {
        console.log('❌ 保存数据为空，跳过恢复测试');
      }
    }, 1000);
  }, 2000); // 等待自动保存触发
}

// 6. 测试自动保存功能
function testAutoSave() {
  console.log('=== 测试自动保存功能 ===');
  
  const firstInput = document.querySelector('input[type="text"], textarea');
  if (firstInput) {
    console.log('找到第一个文本输入框，开始测试自动保存...');
    
    // 模拟用户输入
    firstInput.value = '自动保存测试数据 ' + new Date().toLocaleTimeString();
    firstInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    console.log('✅ 输入事件已触发，等待自动保存...');
    
    // 3秒后检查是否自动保存
    setTimeout(() => {
      const savedData = sessionStorage.getItem('ds160_form_data');
      if (savedData) {
        console.log('✅ 自动保存成功！');
        console.log('保存的数据:', JSON.parse(savedData));
      } else {
        console.log('❌ 自动保存失败或未触发');
      }
    }, 3000);
  } else {
    console.log('❌ 未找到可用的文本输入框');
  }
}

// 导出测试函数
window.formDataTest = {
  fillTestData,
  triggerSave,
  checkSavedData,
  testRestore,
  runCompleteTest,
  testAutoSave
};

console.log('🛠️ 表单数据测试工具已加载！');
console.log('📋 可用的测试命令:');
console.log('  window.formDataTest.runCompleteTest()  - 运行完整测试');
console.log('  window.formDataTest.fillTestData()     - 填写测试数据');
console.log('  window.formDataTest.triggerSave()      - 手动保存');
console.log('  window.formDataTest.checkSavedData()   - 检查保存的数据');
console.log('  window.formDataTest.testRestore()      - 测试数据恢复');
console.log('  window.formDataTest.testAutoSave()     - 测试自动保存');
console.log('');
console.log('💡 建议先运行: window.formDataTest.runCompleteTest()');
