
(function() {
  'use strict';
  
  // Inlined storage module
  const DEFAULT_SETTINGS = {
  enabled: true,
  mode: "brief",
  showNotes: true,
  position: "right"
};
const STORAGE_KEYS = {
  SETTINGS: "ds160_translation_settings",
  INJECTION_STATE: "ds160_injection_state"
};
async function getSettings() {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
    return { ...DEFAULT_SETTINGS, ...result[STORAGE_KEYS.SETTINGS] };
  } catch (error) {
    console.error("Error loading settings:", error);
    return DEFAULT_SETTINGS;
  }
}
async function saveSettings(settings) {
  try {
    const currentSettings = await getSettings();
    const newSettings = { ...currentSettings, ...settings };
    await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: newSettings });
  } catch (error) {
    console.error("Error saving settings:", error);
  }
}
function onSettingsChange(callback) {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes[STORAGE_KEYS.SETTINGS]) {
      callback(changes[STORAGE_KEYS.SETTINGS].newValue);
    }
  });
}

//# sourceMappingURL=storage.js.map

  
  // Main script
  class PopupController {
  constructor() {
    this.settings = null;
    this.isCurrentPageDS160 = false;
    this.init();
  }
  /**
   * 初始化弹窗
   */
  async init() {
    try {
      this.settings = await getSettings();
      await this.checkPageStatus();
      this.setupUI();
      this.bindEvents();
      console.log("Popup initialized");
    } catch (error) {
      console.error("Failed to initialize popup:", error);
      this.showError("初始化失败");
    }
  }
  /**
   * 检查当前页面状态
   */
  async checkPageStatus() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.url) {
        this.updateStatus("无法获取页面信息", "error");
        return;
      }
      this.isCurrentPageDS160 = tab.url.includes("ceac.state.gov");
      if (this.isCurrentPageDS160) {
        try {
          const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_TRANSLATION_STATUS" });
          if (response && response.initialized) {
            this.updateStatus("翻译功能已启用", "success");
            this.updateStats(response);
          } else {
            this.updateStatus("正在初始化...", "loading");
          }
        } catch (error) {
          this.updateStatus("内容脚本未就绪", "warning");
        }
      } else {
        this.updateStatus("请打开DS-160页面", "warning");
      }
    } catch (error) {
      console.error("Error checking page status:", error);
      this.updateStatus("状态检查失败", "error");
    }
  }
  /**
   * 设置UI初始状态
   */
  setupUI() {
    if (!this.settings) return;
    const enabledCheckbox = document.getElementById("enabled-checkbox");
    const modeSelect = document.getElementById("mode-select");
    const notesCheckbox = document.getElementById("notes-checkbox");
    const positionSelect = document.getElementById("position-select");
    if (enabledCheckbox) enabledCheckbox.checked = this.settings.enabled;
    if (modeSelect) modeSelect.value = this.settings.mode;
    if (notesCheckbox) notesCheckbox.checked = this.settings.showNotes;
    if (positionSelect) positionSelect.value = this.settings.position;
    if (!this.isCurrentPageDS160) {
      const controls = document.querySelectorAll("input, select, button");
      controls.forEach((control) => {
        if (control.id !== "settings-btn") {
          control.disabled = true;
        }
      });
    }
  }
  /**
   * 绑定事件监听器
   */
  bindEvents() {
    const enabledCheckbox = document.getElementById("enabled-checkbox");
    enabledCheckbox == null ? void 0 : enabledCheckbox.addEventListener("change", () => {
      this.updateSetting("enabled", enabledCheckbox.checked);
    });
    const modeSelect = document.getElementById("mode-select");
    modeSelect == null ? void 0 : modeSelect.addEventListener("change", () => {
      this.updateSetting("mode", modeSelect.value);
    });
    const notesCheckbox = document.getElementById("notes-checkbox");
    notesCheckbox == null ? void 0 : notesCheckbox.addEventListener("change", () => {
      this.updateSetting("showNotes", notesCheckbox.checked);
    });
    const positionSelect = document.getElementById("position-select");
    positionSelect == null ? void 0 : positionSelect.addEventListener("change", () => {
      this.updateSetting("position", positionSelect.value);
    });
    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn == null ? void 0 : refreshBtn.addEventListener("click", () => {
      this.refreshTranslation();
    });
    const settingsBtn = document.getElementById("settings-btn");
    settingsBtn == null ? void 0 : settingsBtn.addEventListener("click", () => {
      this.openSettings();
    });
  }
  /**
   * 更新设置
   */
  async updateSetting(key, value) {
    if (!this.settings) return;
    try {
      this.settings[key] = value;
      await saveSettings({ [key]: value });
      if (this.isCurrentPageDS160) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab.id) {
          await chrome.tabs.sendMessage(tab.id, {
            type: "UPDATE_SETTINGS",
            settings: this.settings
          });
          if (key === "mode" || key === "position" || key === "showNotes") {
            this.showSuccess("设置已更新，翻译已刷新");
          } else {
            this.showSuccess("设置已保存");
          }
        }
      } else {
        this.showSuccess("设置已保存");
      }
    } catch (error) {
      console.error("Error updating setting:", error);
      this.showError("设置保存失败");
    }
  }
  /**
   * 刷新翻译
   */
  async refreshTranslation() {
    if (!this.isCurrentPageDS160) return;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, { type: "REFRESH_TRANSLATION" });
        this.showSuccess("翻译已刷新");
        setTimeout(() => this.checkPageStatus(), 1e3);
      }
    } catch (error) {
      console.error("Error refreshing translation:", error);
      this.showError("刷新失败");
    }
  }
  /**
   * 打开设置页面
   */
  openSettings() {
    chrome.runtime.openOptionsPage();
  }
  /**
   * 更新状态显示
   */
  updateStatus(text, type = "success") {
    const statusText = document.getElementById("status-text");
    const statusDot = document.querySelector(".status-dot");
    if (statusText) statusText.textContent = text;
    if (statusDot) {
      statusDot.className = `status-dot ${type}`;
    }
  }
  /**
   * 更新统计信息
   */
  updateStats(data) {
    const translatedCount = document.getElementById("translated-count");
    const pageType = document.getElementById("page-type");
    if (translatedCount) {
      translatedCount.textContent = data.translatedCount || "0";
    }
    if (pageType) {
      pageType.textContent = data.pageType || "未知";
    }
  }
  /**
   * 显示成功消息
   */
  showSuccess(message) {
    this.updateStatus(message, "success");
    setTimeout(() => {
      if (this.isCurrentPageDS160) {
        this.updateStatus("翻译功能已启用", "success");
      } else {
        this.updateStatus("请打开DS-160页面", "warning");
      }
    }, 2e3);
  }
  /**
   * 显示错误消息
   */
  showError(message) {
    this.updateStatus(message, "error");
    setTimeout(() => {
      this.checkPageStatus();
    }, 3e3);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new PopupController();
});
//# sourceMappingURL=popup.js.map

})();
