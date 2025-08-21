/**
 * 温和的页面刷新策略
 * 避免触发服务器错误的温和刷新方法
 */

/**
 * 执行温和的页面刷新
 */
export function executeGentleRefresh(): void {
  console.log('🌸 GENTLE: Starting gentle page refresh...');
  
  try {
    // 使用最简单、最安全的刷新方法
    performSafeRefresh();
  } catch (error) {
    console.error('Gentle refresh failed:', error);
    fallbackGentleRefresh();
  }
}

/**
 * 执行安全的刷新
 */
function performSafeRefresh(): void {
  console.log('🔄 Performing safe refresh...');
  
  // 方法1: 简单的location.reload() - 最兼容的方法
  setTimeout(() => {
    try {
      console.log('🌸 Using gentle location.reload()...');
      window.location.reload();
    } catch (error) {
      console.log('Location.reload failed:', error);
      performURLRefresh();
    }
  }, 100);
}

/**
 * 使用URL刷新
 */
function performURLRefresh(): void {
  console.log('🔗 Performing URL refresh...');
  
  try {
    // 直接设置href为当前URL
    const currentURL = window.location.href;
    window.location.href = currentURL;
  } catch (error) {
    console.log('URL refresh failed:', error);
    fallbackGentleRefresh();
  }
}

/**
 * 备选温和刷新
 */
function fallbackGentleRefresh(): void {
  console.log('🆘 Fallback gentle refresh...');
  
  // 最简单的方法
  window.location = window.location;
}

/**
 * 安全的温和刷新（保存数据后执行温和刷新）
 */
export function safeGentleRefresh(saveCallback?: () => void): void {
  console.log('💾 Safe gentle refresh initiated...');
  
  // 1. 保存数据
  if (saveCallback) {
    try {
      saveCallback();
      console.log('✅ Data saved before gentle refresh');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
    }
  }
  
  // 2. 执行温和刷新
  setTimeout(() => {
    executeGentleRefresh();
  }, 300);
}
