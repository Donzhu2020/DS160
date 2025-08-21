import type { TranslationSettings } from '@/shared/types';
import { getSettings, saveSettings } from '@/shared/storage';

class PopupController {
  private settings: TranslationSettings | null = null;
  private isCurrentPageDS160 = false;

  constructor() {
    this.init();
  }

  /**
   * 初始化弹窗
   */
  private async init(): Promise<void> {
    try {
      // 加载设置
      this.settings = await getSettings();
      
      // 检查当前页面状态
      await this.checkPageStatus();
      
      // 设置UI
      this.setupUI();
      
      // 绑定事件
      this.bindEvents();
      
      console.log('Popup initialized');
    } catch (error) {
      console.error('Failed to initialize popup:', error);
      this.showError('初始化失败');
    }
  }

  /**
   * 检查当前页面状态
   */
  private async checkPageStatus(): Promise<void> {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url) {
        this.updateStatus('无法获取页面信息', 'error');
        return;
      }

      // 检查是否为DS-160页面
      this.isCurrentPageDS160 = tab.url.includes('ceac.state.gov');
      
      if (this.isCurrentPageDS160) {
        // 向content script发送消息获取状态
        try {
          const response = await chrome.tabs.sendMessage(tab.id!, { type: 'GET_TRANSLATION_STATUS' });
          if (response && response.initialized) {
            this.updateStatus('翻译功能已启用', 'success');
            this.updateStats(response);
          } else {
            this.updateStatus('正在初始化...', 'loading');
          }
        } catch (error) {
          this.updateStatus('内容脚本未就绪', 'warning');
        }
      } else {
        this.updateStatus('请打开DS-160页面', 'warning');
      }
    } catch (error) {
      console.error('Error checking page status:', error);
      this.updateStatus('状态检查失败', 'error');
    }
  }

  /**
   * 设置UI初始状态
   */
  private setupUI(): void {
    if (!this.settings) return;

    // 设置控件值
    const enabledCheckbox = document.getElementById('enabled-checkbox') as HTMLInputElement;
    const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;
    const notesCheckbox = document.getElementById('notes-checkbox') as HTMLInputElement;
    const positionSelect = document.getElementById('position-select') as HTMLSelectElement;

    if (enabledCheckbox) enabledCheckbox.checked = this.settings.enabled;
    if (modeSelect) modeSelect.value = this.settings.mode;
    if (notesCheckbox) notesCheckbox.checked = this.settings.showNotes;
    if (positionSelect) positionSelect.value = this.settings.position;

    // 禁用非DS-160页面的控件
    if (!this.isCurrentPageDS160) {
      const controls = document.querySelectorAll('input, select, button');
      controls.forEach(control => {
        if (control.id !== 'settings-btn') {
          (control as HTMLInputElement).disabled = true;
        }
      });
    }
  }

  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    // 启用/禁用翻译
    const enabledCheckbox = document.getElementById('enabled-checkbox') as HTMLInputElement;
    enabledCheckbox?.addEventListener('change', () => {
      this.updateSetting('enabled', enabledCheckbox.checked);
    });

    // 模式切换
    const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;
    modeSelect?.addEventListener('change', () => {
      this.updateSetting('mode', modeSelect.value as 'brief' | 'detailed');
    });

    // 注释显示
    const notesCheckbox = document.getElementById('notes-checkbox') as HTMLInputElement;
    notesCheckbox?.addEventListener('change', () => {
      this.updateSetting('showNotes', notesCheckbox.checked);
    });

    // 位置设置
    const positionSelect = document.getElementById('position-select') as HTMLSelectElement;
    positionSelect?.addEventListener('change', () => {
      this.updateSetting('position', positionSelect.value as 'right' | 'below');
    });

    // 刷新按钮
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn?.addEventListener('click', () => {
      this.refreshTranslation();
    });

    // 设置按钮
    const settingsBtn = document.getElementById('settings-btn');
    settingsBtn?.addEventListener('click', () => {
      this.openSettings();
    });
  }

  /**
   * 更新设置
   */
  private async updateSetting(key: keyof TranslationSettings, value: any): Promise<void> {
    if (!this.settings) return;

    try {
      this.settings[key] = value;
      await saveSettings({ [key]: value });
      
      // 通知content script更新
      if (this.isCurrentPageDS160) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab.id) {
          await chrome.tabs.sendMessage(tab.id, { 
            type: 'UPDATE_SETTINGS', 
            settings: this.settings 
          });
          
          // 对于影响显示的设置，显示特别的反馈
          if (key === 'mode' || key === 'position' || key === 'showNotes') {
            this.showSuccess('设置已更新，翻译已刷新');
          } else {
            this.showSuccess('设置已保存');
          }
        }
      } else {
        this.showSuccess('设置已保存');
      }
      
    } catch (error) {
      console.error('Error updating setting:', error);
      this.showError('设置保存失败');
    }
  }

  /**
   * 刷新翻译
   */
  private async refreshTranslation(): Promise<void> {
    if (!this.isCurrentPageDS160) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, { type: 'REFRESH_TRANSLATION' });
        this.showSuccess('翻译已刷新');
        setTimeout(() => this.checkPageStatus(), 1000);
      }
    } catch (error) {
      console.error('Error refreshing translation:', error);
      this.showError('刷新失败');
    }
  }

  /**
   * 打开设置页面
   */
  private openSettings(): void {
    chrome.runtime.openOptionsPage();
  }

  /**
   * 更新状态显示
   */
  private updateStatus(text: string, type: 'success' | 'error' | 'warning' | 'loading' = 'success'): void {
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-dot') as HTMLElement;

    if (statusText) statusText.textContent = text;
    if (statusDot) {
      statusDot.className = `status-dot ${type}`;
    }
  }

  /**
   * 更新统计信息
   */
  private updateStats(data: any): void {
    const translatedCount = document.getElementById('translated-count');
    const pageType = document.getElementById('page-type');

    if (translatedCount) {
      translatedCount.textContent = data.translatedCount || '0';
    }
    
    if (pageType) {
      pageType.textContent = data.pageType || '未知';
    }
  }

  /**
   * 显示成功消息
   */
  private showSuccess(message: string): void {
    this.updateStatus(message, 'success');
    setTimeout(() => {
      if (this.isCurrentPageDS160) {
        this.updateStatus('翻译功能已启用', 'success');
      } else {
        this.updateStatus('请打开DS-160页面', 'warning');
      }
    }, 2000);
  }

  /**
   * 显示错误消息
   */
  private showError(message: string): void {
    this.updateStatus(message, 'error');
    setTimeout(() => {
      this.checkPageStatus();
    }, 3000);
  }
}

// 初始化弹窗
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});
