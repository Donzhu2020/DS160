import { saveFormData } from '@/shared/dom-utils';

let userActivityTrackingActive = false;
let lastUserGestureTime = Date.now();

/**
 * 初始化用户活动跟踪
 */
export function initializeUserActivityTracking(): void {
  if (userActivityTrackingActive) {
    console.log('🎯 User activity tracking already active');
    return;
  }

  console.log('🎯 Initializing user activity tracking for gesture-based refresh...');

  // 跟踪真实用户交互
  const gestureEvents = ['click', 'keydown', 'touchstart', 'mousedown'];
  
  gestureEvents.forEach(eventType => {
    document.addEventListener(eventType, () => {
      lastUserGestureTime = Date.now();
      console.log(`👆 User gesture detected: ${eventType}`);
    }, { passive: true });
  });

  userActivityTrackingActive = true;
  console.log('✅ User activity tracking initialized');
}

/**
 * 执行用户手势驱动的刷新
 */
export function executeUserGestureRefresh(saveCallback?: () => void): Promise<void> {
  return new Promise((resolve) => {
    console.log('👆 Executing user gesture refresh...');

    // 1. 先保存表单数据
    if (saveCallback) {
      try {
        saveCallback();
        console.log('💾 Form data saved before refresh');
      } catch (error) {
        console.warn('Failed to save form data:', error);
      }
    }

    // 2. 检查用户手势状态
    const timeSinceGesture = Date.now() - lastUserGestureTime;
    const hasRecentGesture = timeSinceGesture < 30000; // 30秒内有用户交互

    if (document.hasStoredUserActivation || hasRecentGesture) {
      console.log('✅ User gesture available, proceeding with immediate refresh...');
      
      // 立即执行刷新
      setTimeout(() => {
        performGentleRefresh();
        resolve();
      }, 100);
    } else {
      console.log('⏳ No recent user gesture, using alternative refresh method...');
      
      // 使用替代方法
      setTimeout(() => {
        performAlternativeRefresh();
        resolve();
      }, 200);
    }
  });
}

/**
 * 执行温和的页面刷新
 */
function performGentleRefresh(): void {
  console.log('🌸 Performing gentle user gesture refresh...');
  
  try {
    // 方法1: 标准reload
    window.location.reload();
  } catch (error) {
    console.log('Standard reload failed, trying href method:', error);
    // 方法2: href重新赋值
    window.location.href = window.location.href;
  }
}

/**
 * 执行替代刷新方法（无用户手势时）
 */
function performAlternativeRefresh(): void {
  console.log('🔄 Performing alternative refresh (no user gesture)...');
  
  // 方法1: 使用pushState + replace组合
  try {
    const currentURL = window.location.href;
    window.history.pushState({}, '', currentURL);
    setTimeout(() => {
      window.location.replace(currentURL);
    }, 100);
  } catch (error) {
    console.log('Alternative method 1 failed:', error);
    
    // 方法2: 直接使用replace
    try {
      window.location.replace(window.location.href);
    } catch (error2) {
      console.log('Alternative method 2 failed:', error2);
      
      // 方法3: 最后备选方案
      window.location.href = window.location.href;
    }
  }
}

/**
 * 等待用户交互
 */
function waitForUserInteraction(): Promise<void> {
  return new Promise((resolve) => {
    console.log('⏳ Waiting for user interaction...');
    
    const gestureEvents = ['click', 'keydown', 'touchstart', 'mousedown'];
    let resolved = false;
    
    const handleGesture = () => {
      if (!resolved) {
        resolved = true;
        console.log('✅ User gesture detected, proceeding with refresh');
        
        // 清理监听器
        gestureEvents.forEach(eventType => {
          document.removeEventListener(eventType, handleGesture);
        });
        
        resolve();
      }
    };
    
    // 添加临时监听器
    gestureEvents.forEach(eventType => {
      document.addEventListener(eventType, handleGesture, { once: true, passive: true });
    });
    
    // 5秒后超时，强制继续
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.log('⏰ Gesture wait timeout, proceeding anyway');
        
        gestureEvents.forEach(eventType => {
          document.removeEventListener(eventType, handleGesture);
        });
        
        resolve();
      }
    }, 5000);
  });
}