import type { TranslationSettings } from '@/shared/types';
import { getSettings, saveSettings } from '@/shared/storage';

export class TranslationUIController {
  private container: HTMLElement | null = null;
  private isCollapsed = false;
  private settings: TranslationSettings;

  constructor(settings: TranslationSettings) {
    this.settings = settings;
    this.createUI();
  }

  /**
   * 创建UI控制器
   */
  private createUI(): void {
    // 检查是否已存在
    if (document.querySelector('.ds160-translation-controller')) {
      return;
    }

    this.container = document.createElement('div');
    this.container.className = 'ds160-translation-controller';
    this.container.innerHTML = this.getUIHTML();

    // 添加事件监听器
    this.attachEventListeners();

    // 插入到页面
    document.body.appendChild(this.container);

    // 更新UI状态
    this.updateUI();
  }

  /**
   * 获取UI HTML结构
   */
  private getUIHTML(): string {
    return `
      <div class="ds160-translation-controller-header">
        <span>中文助手</span>
        <button class="ds160-translation-controller-toggle" data-action="toggle-collapse">
          ${this.isCollapsed ? '📖' : '📘'}
        </button>
      </div>
      <div class="ds160-translation-controller-content">
        <div class="ds160-translation-option">
          <label for="translation-enabled">启用翻译</label>
          <div class="ds160-translation-switch" data-action="toggle-enabled">
            <input type="checkbox" id="translation-enabled" style="display: none;" />
          </div>
        </div>
        
        <div class="ds160-translation-status" id="translation-status">
          已准备就绪
        </div>
      </div>
    `;
  }

  /**
   * 附加事件监听器
   */
  private attachEventListeners(): void {
    if (!this.container) return;

    // 使用事件委托处理所有点击事件
    this.container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const action = target.getAttribute('data-action') || target.closest('[data-action]')?.getAttribute('data-action');
      
      if (action) {
        this.handleAction(action, target);
      }
    });

    // 处理select变化事件
    this.container.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      const action = target.getAttribute('data-action');
      
      if (action) {
        this.handleAction(action, target);
      }
    });
  }

  /**
   * 处理用户操作
   */
  private async handleAction(action: string, target: HTMLElement): Promise<void> {
    try {
      switch (action) {
        case 'toggle-collapse':
          this.toggleCollapse();
          break;
          
        case 'toggle-enabled':
          await this.toggleEnabled();
          break;
      }
    } catch (error) {
      console.error('Error handling action:', action, error);
      this.showStatus('操作失败', 'error');
    }
  }

  /**
   * 切换折叠状态
   */
  private toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    
    if (this.container) {
      this.container.classList.toggle('collapsed', this.isCollapsed);
      
      const toggleButton = this.container.querySelector('.ds160-translation-controller-toggle');
      if (toggleButton) {
        toggleButton.textContent = this.isCollapsed ? '📖' : '📘';
      }
    }
  }

  /**
   * 切换启用状态
   */
  private async toggleEnabled(): Promise<void> {
    this.settings.enabled = !this.settings.enabled;
    await saveSettings({ enabled: this.settings.enabled });
    this.updateUI();
    this.showStatus(this.settings.enabled ? '翻译已启用' : '翻译已禁用', 'success');
  }



  /**
   * 更新UI状态
   */
  private updateUI(): void {
    if (!this.container) return;

    // 更新启用状态开关
    const enabledSwitch = this.container.querySelector('[data-action="toggle-enabled"]');
    enabledSwitch?.classList.toggle('active', this.settings.enabled);
  }

  /**
   * 显示状态消息
   */
  private showStatus(message: string, type: 'success' | 'error' | 'loading' = 'success'): void {
    const statusElement = this.container?.querySelector('#translation-status');
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `ds160-translation-status ${type}`;
      
      // 3秒后恢复默认状态
      setTimeout(() => {
        statusElement.textContent = '已准备就绪';
        statusElement.className = 'ds160-translation-status';
      }, 3000);
    }
  }

  /**
   * 更新设置
   */
  updateSettings(settings: TranslationSettings): void {
    this.settings = settings;
    this.updateUI();
  }

  /**
   * 销毁UI
   */
  destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
