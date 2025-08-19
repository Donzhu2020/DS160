import { s as saveSettings, g as getSettings, o as onSettingsChange } from "../storage.js";
function findElementBySelectors(selectors) {
  var _a;
  for (const selector of selectors) {
    try {
      if (selector.startsWith("text:")) {
        const text = selector.substring(5);
        const elements = document.querySelectorAll("label, span, div, p");
        for (const el of elements) {
          if ((_a = el.textContent) == null ? void 0 : _a.toLowerCase().includes(text.toLowerCase())) {
            return el;
          }
        }
        continue;
      }
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
    }
  }
  return null;
}
function createTranslationElement(zh, note, showNote, position) {
  const container = document.createElement("div");
  container.className = "ds160-translation-container";
  const shadow = container.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    .translation-wrapper {
      display: inline-block;
      margin-left: ${position === "right" ? "8px" : "0"};
      margin-top: ${position === "below" ? "4px" : "0"};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .translation-text {
      color: #666;
      font-weight: 500;
      background: rgba(59, 130, 246, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    
    .translation-note {
      color: #888;
      font-size: 11px;
      margin-top: 2px;
      padding: 2px 4px;
      background: rgba(156, 163, 175, 0.1);
      border-radius: 3px;
      border-left: 2px solid #e5e7eb;
      display: ${showNote ? "block" : "none"};
    }
    
    .translation-wrapper:hover .translation-note {
      display: block;
    }
  `;
  const wrapper = document.createElement("div");
  wrapper.className = "translation-wrapper";
  const textSpan = document.createElement("span");
  textSpan.className = "translation-text";
  textSpan.textContent = zh;
  const noteDiv = document.createElement("div");
  noteDiv.className = "translation-note";
  noteDiv.textContent = note;
  shadow.appendChild(style);
  shadow.appendChild(wrapper);
  wrapper.appendChild(textSpan);
  if (note) {
    wrapper.appendChild(noteDiv);
  }
  return container;
}
function hasTranslation(element) {
  var _a;
  return ((_a = element.parentElement) == null ? void 0 : _a.querySelector(".ds160-translation-container")) !== null;
}
function removeTranslation(element) {
  var _a;
  const container = (_a = element.parentElement) == null ? void 0 : _a.querySelector(".ds160-translation-container");
  if (container) {
    container.remove();
  }
}
function waitForDOM() {
  return new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => resolve());
    } else {
      resolve();
    }
  });
}
function throttle(func, delay) {
  let timeoutId = null;
  let lastExecTime = 0;
  return (...args) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
}
class TranslationInjector {
  constructor(settings) {
    this.translationData = null;
    this.observer = null;
    this.injectedElements = /* @__PURE__ */ new Set();
    this.settings = settings;
    this.setupMutationObserver();
  }
  /**
   * 设置翻译数据
   */
  setTranslationData(data) {
    this.translationData = data;
  }
  /**
   * 更新设置
   */
  updateSettings(settings) {
    this.settings = settings;
    if (settings.enabled) {
      this.injectTranslations();
    } else {
      this.removeAllTranslations();
    }
  }
  /**
   * 注入所有翻译
   */
  injectTranslations() {
    if (!this.translationData || !this.settings.enabled) {
      return;
    }
    let injectedCount = 0;
    const startTime = performance.now();
    for (const field of this.translationData.fields) {
      if (!this.shouldInjectField(field)) {
        continue;
      }
      try {
        const success = this.injectFieldTranslation(field);
        if (success) {
          injectedCount++;
        }
      } catch (error) {
        console.warn(`Failed to inject translation for field ${field.key}:`, error);
      }
    }
    const duration = performance.now() - startTime;
    console.log(`Injected ${injectedCount} translations in ${duration.toFixed(2)}ms`);
  }
  /**
   * 注入单个字段的翻译
   */
  injectFieldTranslation(field) {
    const targetElement = findElementBySelectors(field.selectors);
    if (!targetElement) {
      return false;
    }
    if (hasTranslation(targetElement)) {
      return false;
    }
    const translationElement = createTranslationElement(
      field.zh,
      field.note,
      this.settings.showNotes && field.level === "detailed",
      this.settings.position
    );
    this.insertTranslationElement(targetElement, translationElement);
    this.injectedElements.add(targetElement);
    return true;
  }
  /**
   * 插入翻译元素到适当位置
   */
  insertTranslationElement(targetElement, translationElement) {
    const parent = targetElement.parentElement;
    if (!parent) {
      return;
    }
    if (this.settings.position === "right") {
      targetElement.insertAdjacentElement("afterend", translationElement);
    } else {
      parent.appendChild(translationElement);
    }
    if (targetElement.id) {
      translationElement.setAttribute("aria-labelledby", targetElement.id);
    }
  }
  /**
   * 判断是否应该注入字段翻译
   */
  shouldInjectField(field) {
    if (this.settings.mode === "brief" && field.level === "detailed") {
      return false;
    }
    return true;
  }
  /**
   * 移除所有翻译
   */
  removeAllTranslations() {
    for (const element of this.injectedElements) {
      removeTranslation(element);
    }
    this.injectedElements.clear();
  }
  /**
   * 设置DOM变化监听器
   */
  setupMutationObserver() {
    const throttledInject = throttle(() => {
      if (this.settings.enabled) {
        this.injectTranslations();
      }
    }, 100);
    this.observer = new MutationObserver((mutations) => {
      let shouldReinject = false;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              if (this.isFormElement(element) || element.querySelector("input, label, select")) {
                shouldReinject = true;
                break;
              }
            }
          }
        }
        if (shouldReinject) break;
      }
      if (shouldReinject) {
        throttledInject();
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  /**
   * 检查是否为表单相关元素
   */
  isFormElement(element) {
    const formTags = ["INPUT", "LABEL", "SELECT", "TEXTAREA", "FORM", "FIELDSET"];
    return formTags.includes(element.tagName);
  }
  /**
   * 销毁注入器
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.removeAllTranslations();
    this.injectedElements.clear();
  }
}
class TranslationUIController {
  constructor(settings) {
    this.container = null;
    this.isCollapsed = false;
    this.settings = settings;
    this.createUI();
  }
  /**
   * 创建UI控制器
   */
  createUI() {
    if (document.querySelector(".ds160-translation-controller")) {
      return;
    }
    this.container = document.createElement("div");
    this.container.className = "ds160-translation-controller";
    this.container.innerHTML = this.getUIHTML();
    this.attachEventListeners();
    document.body.appendChild(this.container);
    this.updateUI();
  }
  /**
   * 获取UI HTML结构
   */
  getUIHTML() {
    return `
      <div class="ds160-translation-controller-header">
        <span>中文助手</span>
        <button class="ds160-translation-controller-toggle" data-action="toggle-collapse">
          ${this.isCollapsed ? "📖" : "📘"}
        </button>
      </div>
      <div class="ds160-translation-controller-content">
        <div class="ds160-translation-option">
          <label for="translation-enabled">启用翻译</label>
          <div class="ds160-translation-switch" data-action="toggle-enabled">
            <input type="checkbox" id="translation-enabled" style="display: none;" />
          </div>
        </div>
        
        <div class="ds160-translation-option">
          <label for="translation-mode">显示模式</label>
          <select class="ds160-translation-select" data-action="change-mode" id="translation-mode">
            <option value="brief">简洁</option>
            <option value="detailed">详细</option>
          </select>
        </div>
        
        <div class="ds160-translation-option">
          <label for="show-notes">显示注释</label>
          <div class="ds160-translation-switch" data-action="toggle-notes">
            <input type="checkbox" id="show-notes" style="display: none;" />
          </div>
        </div>
        
        <div class="ds160-translation-option">
          <label for="translation-position">位置</label>
          <select class="ds160-translation-select" data-action="change-position" id="translation-position">
            <option value="right">右侧</option>
            <option value="below">下方</option>
          </select>
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
  attachEventListeners() {
    if (!this.container) return;
    this.container.addEventListener("click", (event) => {
      var _a;
      const target = event.target;
      const action = target.getAttribute("data-action") || ((_a = target.closest("[data-action]")) == null ? void 0 : _a.getAttribute("data-action"));
      if (action) {
        this.handleAction(action, target);
      }
    });
    this.container.addEventListener("change", (event) => {
      const target = event.target;
      const action = target.getAttribute("data-action");
      if (action) {
        this.handleAction(action, target);
      }
    });
  }
  /**
   * 处理用户操作
   */
  async handleAction(action, target) {
    try {
      switch (action) {
        case "toggle-collapse":
          this.toggleCollapse();
          break;
        case "toggle-enabled":
          await this.toggleEnabled();
          break;
        case "toggle-notes":
          await this.toggleNotes();
          break;
        case "change-mode":
          await this.changeMode(target.value);
          break;
        case "change-position":
          await this.changePosition(target.value);
          break;
      }
    } catch (error) {
      console.error("Error handling action:", action, error);
      this.showStatus("操作失败", "error");
    }
  }
  /**
   * 切换折叠状态
   */
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.container) {
      this.container.classList.toggle("collapsed", this.isCollapsed);
      const toggleButton = this.container.querySelector(".ds160-translation-controller-toggle");
      if (toggleButton) {
        toggleButton.textContent = this.isCollapsed ? "📖" : "📘";
      }
    }
  }
  /**
   * 切换启用状态
   */
  async toggleEnabled() {
    this.settings.enabled = !this.settings.enabled;
    await saveSettings({ enabled: this.settings.enabled });
    this.updateUI();
    this.showStatus(this.settings.enabled ? "翻译已启用" : "翻译已禁用", "success");
  }
  /**
   * 切换注释显示
   */
  async toggleNotes() {
    this.settings.showNotes = !this.settings.showNotes;
    await saveSettings({ showNotes: this.settings.showNotes });
    this.updateUI();
    this.showStatus("设置已保存", "success");
  }
  /**
   * 更改显示模式
   */
  async changeMode(mode) {
    this.settings.mode = mode;
    await saveSettings({ mode });
    this.showStatus(`已切换到${mode === "brief" ? "简洁" : "详细"}模式`, "success");
  }
  /**
   * 更改位置
   */
  async changePosition(position) {
    this.settings.position = position;
    await saveSettings({ position });
    this.showStatus(`位置已设为${position === "right" ? "右侧" : "下方"}`, "success");
  }
  /**
   * 更新UI状态
   */
  updateUI() {
    if (!this.container) return;
    const enabledSwitch = this.container.querySelector('[data-action="toggle-enabled"]');
    enabledSwitch == null ? void 0 : enabledSwitch.classList.toggle("active", this.settings.enabled);
    const notesSwitch = this.container.querySelector('[data-action="toggle-notes"]');
    notesSwitch == null ? void 0 : notesSwitch.classList.toggle("active", this.settings.showNotes);
    const modeSelect = this.container.querySelector("#translation-mode");
    if (modeSelect) {
      modeSelect.value = this.settings.mode;
    }
    const positionSelect = this.container.querySelector("#translation-position");
    if (positionSelect) {
      positionSelect.value = this.settings.position;
    }
  }
  /**
   * 显示状态消息
   */
  showStatus(message, type = "success") {
    var _a;
    const statusElement = (_a = this.container) == null ? void 0 : _a.querySelector("#translation-status");
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `ds160-translation-status ${type}`;
      setTimeout(() => {
        statusElement.textContent = "已准备就绪";
        statusElement.className = "ds160-translation-status";
      }, 3e3);
    }
  }
  /**
   * 更新设置
   */
  updateSettings(settings) {
    this.settings = settings;
    this.updateUI();
  }
  /**
   * 销毁UI
   */
  destroy() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
const translationCache = /* @__PURE__ */ new Map();
async function loadTranslationData(pageId) {
  if (translationCache.has(pageId)) {
    return translationCache.get(pageId);
  }
  try {
    const dataFile = getDataFileForPage(pageId);
    if (!dataFile) {
      console.warn(`No translation data file for page: ${pageId}`);
      return null;
    }
    const response = await fetch(chrome.runtime.getURL(`assets/data/${dataFile}`));
    if (!response.ok) {
      throw new Error(`Failed to load translation data: ${response.status}`);
    }
    const data = await response.json();
    if (!validateTranslationData(data)) {
      throw new Error("Invalid translation data format");
    }
    translationCache.set(pageId, data);
    return data;
  } catch (error) {
    console.error("Error loading translation data:", error);
    return null;
  }
}
function getDataFileForPage(pageId) {
  const pageContent = document.body.textContent || "";
  if (pageContent.includes("Surnames") && pageContent.includes("Given Names")) {
    return "translation-personal-info.json";
  }
  if (pageContent.includes("Home Address") || pageContent.includes("Phone Number")) {
    return "translation-contact-info.json";
  }
  return null;
}
function validateTranslationData(data) {
  return data && typeof data.version === "string" && typeof data.pageId === "string" && Array.isArray(data.fields) && data.fields.every(
    (field) => field.key && Array.isArray(field.selectors) && field.en && field.zh && ["brief", "detailed"].includes(field.level)
  );
}
function detectCurrentPage() {
  const url = window.location.href;
  const pageContent = document.body.textContent || "";
  if (pageContent.includes("Surnames") && pageContent.includes("Given Names")) {
    return "personalInfo";
  }
  if (pageContent.includes("Home Address")) {
    return "contactInfo";
  }
  if (url.includes("personal")) {
    return "personalInfo";
  }
  if (url.includes("contact")) {
    return "contactInfo";
  }
  return "general";
}
let injector = null;
let uiController = null;
async function initializeTranslation() {
  try {
    console.log("DS-160 Chinese Helper: Initializing translation...");
    await waitForDOM();
    const pageType = detectCurrentPage();
    console.log(`Detected page type: ${pageType}`);
    const settings = await getSettings();
    console.log("Loaded settings:", settings);
    injector = new TranslationInjector(settings);
    uiController = new TranslationUIController(settings);
    const translationData = await loadTranslationData(pageType);
    if (translationData) {
      injector.setTranslationData(translationData);
      console.log(`Loaded translation data for ${pageType}:`, translationData.fields.length, "fields");
      if (settings.enabled) {
        injector.injectTranslations();
      }
    } else {
      console.warn("No translation data available for current page");
    }
    onSettingsChange((newSettings) => {
      console.log("Settings updated:", newSettings);
      if (injector) {
        injector.updateSettings(newSettings);
      }
      if (uiController) {
        uiController.updateSettings(newSettings);
      }
    });
    console.log("DS-160 Chinese Helper: Translation initialized successfully");
  } catch (error) {
    console.error("Failed to initialize translation:", error);
  }
}
function cleanup() {
  if (injector) {
    injector.destroy();
    injector = null;
  }
  if (uiController) {
    uiController.destroy();
    uiController = null;
  }
}
window.addEventListener("beforeunload", cleanup);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "GET_TRANSLATION_STATUS":
      sendResponse({
        initialized: injector !== null,
        enabled: injector ? true : false,
        translatedCount: injector ? 0 : 0,
        // TODO: 从injector获取实际数量
        pageType: detectCurrentPage()
      });
      break;
    case "UPDATE_SETTINGS":
      if (injector && message.settings) {
        injector.updateSettings(message.settings);
      }
      if (uiController && message.settings) {
        uiController.updateSettings(message.settings);
      }
      sendResponse({ success: true });
      break;
    case "REFRESH_TRANSLATION":
      if (injector) {
        injector.removeAllTranslations();
        setTimeout(() => {
          injector == null ? void 0 : injector.injectTranslations();
        }, 100);
      }
      sendResponse({ success: true });
      break;
    case "TOGGLE_TRANSLATION":
      if (injector) {
        console.log("Toggle translation requested");
      }
      sendResponse({ success: true });
      break;
    default:
      console.warn("Unknown message type:", message.type);
      sendResponse({ error: "Unknown message type" });
  }
});
initializeTranslation();
//# sourceMappingURL=translation.js.map
