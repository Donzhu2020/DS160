import { saveFormData, restoreFormData, throttle } from '@/shared/dom-utils';

let formProtectionActive = false;
let autoSaveTimer: number | null = null;
let emergencySaveActive = false;

/**
 * 激活增强的表单保护
 */
export function activateEnhancedFormProtection(): void {
  if (formProtectionActive) {
    console.log('🛡️ Enhanced form protection already active');
    return;
  }

  console.log('🛡️ Activating enhanced form protection...');

  // 1. 多重备份机制
  setupMultiLayerBackup();

  // 2. 智能恢复
  setupIntelligentRecovery();

  // 3. 紧急保护监听器
  setupEmergencyProtection();

  formProtectionActive = true;
  console.log('✅ Enhanced form protection activated');
}

/**
 * 设置多层备份机制
 */
function setupMultiLayerBackup(): void {
  console.log('📦 Setting up multi-layer backup system...');

  // 层级1: 节流自动保存（30秒）
  const throttledSave = throttle(() => {
    console.log('💾 Auto-save (throttled 30s)...');
    saveFormData();
  }, 30000);

  // 层级2: 表单变化即时保存（节流）
  const formChangeEvents = ['input', 'change', 'blur', 'select'];
  formChangeEvents.forEach(eventType => {
    document.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'TEXTAREA'
      )) {
        throttledSave();
      }
    }, { passive: true });
  });

  // 层级3: 定期自动保存（降低频率到60秒）
  autoSaveTimer = window.setInterval(() => {
    console.log('🕐 Periodic auto-save (60s interval)...');
    saveFormData();
  }, 60000);

  console.log('✅ Multi-layer backup system ready');
}

/**
 * 设置智能恢复
 */
function setupIntelligentRecovery(): void {
  console.log('🔄 Setting up intelligent recovery...');

  // 检查是否有保存的数据
  const savedData = sessionStorage.getItem('ds160-form-data');
  if (!savedData) {
    console.log('📝 No saved form data found');
    return;
  }

  console.log('📁 Saved form data detected, preparing recovery...');

  // 延迟恢复，确保页面完全加载
  setTimeout(() => {
    try {
      restoreFormData();
      showRecoveryNotification();
      console.log('✅ Form data recovery completed');
    } catch (error) {
      console.error('❌ Form data recovery failed:', error);
    }
  }, 500); // 稍微延长等待时间
}

/**
 * 设置紧急保护监听器
 */
function setupEmergencyProtection(): void {
  console.log('🚨 Setting up emergency protection listeners...');

  if (emergencySaveActive) {
    console.log('Emergency protection already active');
    return;
  }

  // 页面卸载前保存
  const emergencySave = () => {
    console.log('🚨 Emergency save triggered!');
    try {
      saveFormData();
    } catch (error) {
      console.error('Emergency save failed:', error);
    }
  };

  // 多种卸载事件监听
  window.addEventListener('beforeunload', emergencySave);
  window.addEventListener('pagehide', emergencySave);
  
  // 页面可见性变化监听
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('📱 Page hidden, triggering emergency save');
      emergencySave();
    }
  });

  // 浏览器标签失焦监听
  window.addEventListener('blur', () => {
    console.log('👁️ Window blur, triggering save');
    emergencySave();
  });

  emergencySaveActive = true;
  console.log('✅ Emergency protection listeners ready');
}

/**
 * 显示恢复通知
 */
function showRecoveryNotification(): void {
  // 检查是否已经显示过通知
  if (document.querySelector('.ds160-recovery-notification')) {
    return;
  }

  const notification = document.createElement('div');
  notification.className = 'ds160-recovery-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="icon">📁</span>
      <span class="message">表单数据已自动恢复</span>
      <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // 样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;

  // 内容样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .ds160-recovery-notification .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .ds160-recovery-notification .icon {
      font-size: 18px;
    }
    
    .ds160-recovery-notification .message {
      flex: 1;
      font-weight: 500;
    }
    
    .ds160-recovery-notification .close-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .ds160-recovery-notification .close-btn:hover {
      background: rgba(255,255,255,0.3);
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(notification);

  // 3秒后自动消失
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideIn 0.3s ease-in reverse';
      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 300);
    }
  }, 3000);

  console.log('📢 Recovery notification displayed');
}

/**
 * 清理表单保护资源
 */
export function cleanupFormProtection(): void {
  console.log('🧹 Cleaning up form protection resources...');

  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
    autoSaveTimer = null;
  }

  formProtectionActive = false;
  emergencySaveActive = false;

  console.log('✅ Form protection cleanup completed');
}