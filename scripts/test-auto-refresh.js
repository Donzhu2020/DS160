/**
 * 测试自动刷新功能的调试脚本
 * 在浏览器控制台中运行此脚本来测试自动刷新和表单数据保存/恢复功能
 */

// 测试表单数据保存功能
function testFormDataSave() {
  console.log('=== 测试表单数据保存功能 ===');
  
  // 查找所有表单元素
  const formElements = document.querySelectorAll('input, select, textarea');
  console.log(`找到 ${formElements.length} 个表单元素`);
  
  // 为一些表单元素设置测试值
  let testCount = 0;
  formElements.forEach((element, index) => {
    if (index < 5) { // 只测试前5个元素
      if (element instanceof HTMLInputElement) {
        if (element.type === 'text') {
          element.value = `测试值${index}`;
          testCount++;
        } else if (element.type === 'checkbox') {
          element.checked = true;
          testCount++;
        }
      } else if (element instanceof HTMLSelectElement) {
        if (element.options.length > 1) {
          element.selectedIndex = 1;
          testCount++;
        }
      } else if (element instanceof HTMLTextAreaElement) {
        element.value = `测试文本${index}`;
        testCount++;
      }
    }
  });
  
  console.log(`设置了 ${testCount} 个测试值`);
  
  // 调用保存函数（需要确保已加载）
  if (typeof saveFormData === 'function') {
    saveFormData();
    console.log('✅ 表单数据保存完成');
  } else {
    console.error('❌ saveFormData 函数未找到');
  }
}

// 测试表单数据恢复功能
function testFormDataRestore() {
  console.log('=== 测试表单数据恢复功能 ===');
  
  // 检查sessionStorage中是否有数据
  const savedData = sessionStorage.getItem('ds160_form_data');
  if (savedData) {
    console.log('找到已保存的表单数据:', JSON.parse(savedData));
    
    // 调用恢复函数（需要确保已加载）
    if (typeof restoreFormData === 'function') {
      restoreFormData();
      console.log('✅ 表单数据恢复完成');
    } else {
      console.error('❌ restoreFormData 函数未找到');
    }
  } else {
    console.log('❌ 未找到已保存的表单数据');
  }
}

// 测试用户活动检测
function testActivityDetection() {
  console.log('=== 测试用户活动检测功能 ===');
  
  // 检查全局变量（需要确保在content script中运行）
  if (typeof lastActivityTime !== 'undefined') {
    console.log('✅ 用户活动时间跟踪已启用');
    console.log('最后活动时间:', new Date(lastActivityTime));
    
    // 模拟用户活动
    document.dispatchEvent(new Event('mousemove'));
    console.log('✅ 模拟鼠标移动事件');
    
    setTimeout(() => {
      console.log('更新后的最后活动时间:', new Date(lastActivityTime));
    }, 100);
    
  } else {
    console.error('❌ 用户活动跟踪未启用或不在正确的作用域中');
  }
}

// 测试自动刷新定时器（缩短时间用于测试）
function testAutoRefreshTimer() {
  console.log('=== 测试自动刷新定时器 ===');
  
  // 创建一个测试用的短时间定时器
  let testLastActivity = Date.now();
  
  const testTimer = setInterval(() => {
    const inactiveTime = Date.now() - testLastActivity;
    const testThreshold = 10 * 1000; // 10秒测试阈值
    
    console.log(`非活动时间: ${Math.floor(inactiveTime / 1000)}秒`);
    
    if (inactiveTime > testThreshold) {
      console.log('🔄 测试阈值达到，模拟自动刷新...');
      
      // 保存表单数据
      if (typeof saveFormData === 'function') {
        saveFormData();
        console.log('✅ 表单数据已保存');
      }
      
      clearInterval(testTimer);
      console.log('🧪 测试完成（实际环境中会刷新页面）');
      return;
    }
  }, 2000); // 每2秒检查一次
  
  console.log('⏱️ 测试定时器已启动（10秒后触发，每2秒检查）');
  console.log('💡 在10秒内移动鼠标可以重置计时器');
  
  // 更新测试活动时间的函数
  const updateTestActivity = () => {
    testLastActivity = Date.now();
    console.log('🖱️ 测试活动时间已更新');
  };
  
  // 临时添加活动监听器
  document.addEventListener('mousemove', updateTestActivity);
  
  // 15秒后清理
  setTimeout(() => {
    clearInterval(testTimer);
    document.removeEventListener('mousemove', updateTestActivity);
    console.log('🧹 测试清理完成');
  }, 15000);
}

// 主测试函数
function runAutoRefreshTests() {
  console.log('🧪 开始自动刷新功能测试...');
  console.log('');
  
  // 测试1: 表单数据保存
  testFormDataSave();
  console.log('');
  
  // 测试2: 表单数据恢复
  setTimeout(() => {
    testFormDataRestore();
    console.log('');
    
    // 测试3: 用户活动检测
    setTimeout(() => {
      testActivityDetection();
      console.log('');
      
      // 测试4: 自动刷新定时器
      setTimeout(() => {
        testAutoRefreshTimer();
      }, 1000);
      
    }, 1000);
    
  }, 1000);
}

// 导出测试函数到全局作用域
window.testAutoRefresh = {
  runAll: runAutoRefreshTests,
  testSave: testFormDataSave,
  testRestore: testFormDataRestore,
  testActivity: testActivityDetection,
  testTimer: testAutoRefreshTimer
};

console.log('🛠️ 自动刷新测试工具已加载');
console.log('💡 使用方法:');
console.log('  - runAutoRefreshTests() // 运行所有测试');
console.log('  - window.testAutoRefresh.runAll() // 或者这样运行');
console.log('  - window.testAutoRefresh.testSave() // 只测试保存');
console.log('  - window.testAutoRefresh.testRestore() // 只测试恢复');
console.log('  - window.testAutoRefresh.testActivity() // 只测试活动检测');
console.log('  - window.testAutoRefresh.testTimer() // 只测试定时器');
