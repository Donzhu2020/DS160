/**
 * 直接测试代码 - 复制粘贴到控制台运行
 */

// 直接定义测试函数
function testForceRefreshNow() {
  console.log('🚨 开始直接强制刷新测试...');
  
  // 1. 填写一些测试数据
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  let count = 0;
  inputs.forEach((input, i) => {
    if (i < 3) { // 只填写前3个
      input.value = `TEST_${Date.now()}_${i}`;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      count++;
    }
  });
  console.log(`✅ 填写了 ${count} 个测试字段`);
  
  // 2. 保存数据
  if (typeof saveFormData === 'function') {
    saveFormData();
    console.log('✅ 数据已保存');
  } else {
    console.log('❌ saveFormData 函数未找到');
  }
  
  // 3. 检查并执行强制刷新
  if (typeof safeForceRefresh === 'function') {
    console.log('🚀 3秒后执行强制刷新...');
    setTimeout(() => {
      console.log('🔥 现在执行强制刷新！');
      safeForceRefresh();
    }, 3000);
  } else {
    console.log('❌ safeForceRefresh 函数未找到');
    console.log('🔧 尝试直接调用内部函数...');
    
    // 直接实现激进刷新
    setTimeout(() => {
      console.log('🚨 执行直接激进刷新...');
      
      // 禁用确认
      window.onbeforeunload = null;
      window.confirm = () => true;
      
      // 多种刷新方法
      try {
        window.location.replace(window.location.href + '?t=' + Date.now());
      } catch (e) {
        try {
          window.location.href = window.location.href;
        } catch (e2) {
          window.location.reload(true);
        }
      }
    }, 3000);
  }
}

// 立即执行测试
testForceRefreshNow();
