/**
 * 立即测试强制刷新功能
 * 在DS-160页面控制台中运行
 */

console.log('🧪 强制刷新测试工具加载完成');
console.log('');
console.log('📋 可用的测试命令:');
console.log('  testForceRefresh()     - 立即测试强制刷新（绕过确认弹窗）');
console.log('  testSaveAndRefresh()   - 测试保存数据+强制刷新');
console.log('  fillTestData()         - 填写测试数据');
console.log('');

/**
 * 立即测试强制刷新
 */
function testForceRefresh() {
  console.log('🚨 开始强制刷新测试...');
  console.log('⚠️  注意：这将立即刷新页面，无任何确认弹窗！');
  
  // 检查强制刷新函数是否可用
  if (typeof safeForceRefresh === 'function') {
    console.log('✅ 找到 safeForceRefresh 函数');
    
    // 3秒倒计时
    let countdown = 3;
    const timer = setInterval(() => {
      console.log(`🔄 ${countdown} 秒后开始强制刷新...`);
      countdown--;
      
      if (countdown <= 0) {
        clearInterval(timer);
        console.log('🚀 执行强制刷新！');
        safeForceRefresh();
      }
    }, 1000);
    
  } else {
    console.error('❌ safeForceRefresh 函数未找到');
    console.log('💡 请确保扩展已正确加载');
  }
}

/**
 * 测试保存数据+强制刷新
 */
function testSaveAndRefresh() {
  console.log('💾 开始保存数据+强制刷新测试...');
  
  // 先填写一些测试数据
  fillTestData();
  
  setTimeout(() => {
    if (typeof safeForceRefresh === 'function' && typeof saveFormData === 'function') {
      console.log('✅ 开始执行保存+刷新...');
      safeForceRefresh(saveFormData);
    } else {
      console.error('❌ 必需的函数未找到');
    }
  }, 2000);
}

/**
 * 填写测试数据
 */
function fillTestData() {
  console.log('📝 填写测试数据...');
  
  const formElements = document.querySelectorAll('input, select, textarea');
  let filledCount = 0;
  
  formElements.forEach((element, index) => {
    try {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'text' || element.type === 'email') {
          element.value = `测试数据${index}_${Date.now()}`;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          filledCount++;
        } else if (element.type === 'checkbox') {
          element.checked = true;
          element.dispatchEvent(new Event('change', { bubbles: true }));
          filledCount++;
        }
      } else if (element instanceof HTMLSelectElement && element.options.length > 1) {
        element.selectedIndex = 1;
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filledCount++;
      } else if (element instanceof HTMLTextAreaElement) {
        element.value = `测试文本${index}_${Date.now()}`;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        filledCount++;
      }
    } catch (error) {
      // 忽略错误
    }
  });
  
  console.log(`✅ 填写了 ${filledCount} 个测试字段`);
  return filledCount;
}

// 导出到全局
window.testForceRefresh = testForceRefresh;
window.testSaveAndRefresh = testSaveAndRefresh;
window.fillTestData = fillTestData;

console.log('💡 建议运行: testSaveAndRefresh() - 这将填写数据、保存并强制刷新');
console.log('🔥 如要立即测试: testForceRefresh() - 立即强制刷新（3秒倒计时）');
