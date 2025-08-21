
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
  function findElementBySelectors(selectors) {
  var _a;
  for (const selector of selectors) {
    try {
      if (selector.startsWith("text:")) {
        const text = selector.substring(5);
        const elements = document.querySelectorAll("*");
        let exactMatch = null;
        let bestMatch = null;
        for (const el of elements) {
          if (el.textContent && el.offsetParent !== null) {
            const textContent = el.textContent.trim();
            if (textContent === text) {
              console.log(`✅ Found exact text match for "${text}":`, el.tagName, el.id, el.className);
              exactMatch = el;
              break;
            }
            if (textContent.includes(text)) {
              if (!bestMatch || textContent.length < bestMatch.textContent.length) {
                if (textContent.length < text.length * 2.5) {
                  console.log(`📍 Found smaller container for "${text}":`, el.tagName, el.className, `"${textContent.substring(0, 50)}"`);
                  bestMatch = el;
                }
              }
            }
          }
        }
        if (exactMatch) return exactMatch;
        if (bestMatch) {
          console.log(`⚡ Using best match for "${text}":`, bestMatch.tagName, bestMatch.className);
          return bestMatch;
        }
        console.log(`No element found for text: "${text}"`);
        continue;
      }
      if (selector.includes(":contains(")) {
        const match = selector.match(/^(.*?):contains\(['"]?(.*?)['"]?\)$/);
        if (match) {
          const [, baseSelector, containsText] = match;
          const baseElements = baseSelector === "*" ? document.querySelectorAll("*") : document.querySelectorAll(baseSelector || "*");
          for (const el of baseElements) {
            if ((_a = el.textContent) == null ? void 0 : _a.includes(containsText)) {
              return el;
            }
          }
        }
        continue;
      }
      if (selector.includes("[") && selector.includes("*=")) {
        const element2 = document.querySelector(selector);
        if (element2) {
          return element2;
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
      display: inline !important;
      margin-left: 8px !important;
      margin-top: 0 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.4;
      vertical-align: baseline !important;
      position: static !important;
      float: none !important;
      clear: none !important;
    }
    
    .translation-text {
      color: #666;
      font-weight: 500;
      background: rgba(59, 130, 246, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid rgba(59, 130, 246, 0.2);
      display: inline;
      white-space: normal;
      word-wrap: break-word;
      max-width: 300px;
      font-size: 12px;
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
  if (element.hasAttribute("data-ds160-translated")) {
    return true;
  }
  const elementText = ((_a = element.textContent) == null ? void 0 : _a.trim()) || "";
  if (!elementText) return false;
  const nextSibling = element.nextElementSibling;
  if (nextSibling && nextSibling.classList.contains("ds160-translation-container")) {
    return true;
  }
  const parent = element.parentElement;
  if (parent) {
    const existingTranslations = parent.querySelectorAll(".ds160-translation-container");
    for (const translation of existingTranslations) {
      const forElement = translation.getAttribute("data-for-element");
      if (forElement && forElement.includes(elementText.substring(0, 15))) {
        return true;
      }
    }
  }
  const wrapper = element.closest('span[style*="position: relative"]');
  if (wrapper && wrapper.querySelector(".ds160-translation-container")) {
    return true;
  }
  return false;
}
function removeTranslation(element) {
  var _a;
  element.removeAttribute("data-ds160-translated");
  const elementText = ((_a = element.textContent) == null ? void 0 : _a.trim()) || "";
  if (!elementText) return;
  const nextSibling = element.nextElementSibling;
  if (nextSibling && nextSibling.classList.contains("ds160-translation-container")) {
    nextSibling.remove();
  }
  const parent = element.parentElement;
  if (parent) {
    const translationContainers = parent.querySelectorAll(".ds160-translation-container");
    for (const container of translationContainers) {
      const forElement = container.getAttribute("data-for-element");
      if (forElement && forElement.includes(elementText.substring(0, 15))) {
        container.remove();
      }
    }
  }
  const wrapper = element.closest('span[style*="position: relative"]');
  if (wrapper) {
    const translationsInWrapper = wrapper.querySelectorAll(".ds160-translation-container");
    translationsInWrapper.forEach((t) => t.remove());
  }
  const internalTranslations = element.querySelectorAll(".ds160-translation-container");
  internalTranslations.forEach((t) => t.remove());
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
    const currentMode = this.settings.mode;
    let translationText;
    let noteText;
    if (typeof field.zh === "object") {
      translationText = field.zh[currentMode];
      if (!translationText || translationText.trim() === "") {
        translationText = currentMode === "brief" ? field.zh.detailed : field.zh.brief;
      }
    } else {
      translationText = field.zh;
    }
    if (field.note && typeof field.note === "object") {
      noteText = field.note[currentMode] || field.note.brief;
    } else {
      noteText = field.note || "";
    }
    if (!translationText || translationText.trim() === "") {
      return false;
    }
    const translationElement = createTranslationElement(
      translationText,
      noteText,
      this.settings.showNotes && noteText.trim() !== "",
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
    var _a;
    const parent = targetElement.parentElement;
    if (!parent) {
      return;
    }
    const tagName = targetElement.tagName.toLowerCase();
    if (tagName === "div" && targetElement.classList.contains("field")) {
      const textNodes = Array.from(targetElement.childNodes).filter(
        (node) => {
          var _a2;
          return node.nodeType === Node.TEXT_NODE && ((_a2 = node.textContent) == null ? void 0 : _a2.trim());
        }
      );
      if (textNodes.length > 0) {
        const lastTextNode = textNodes[textNodes.length - 1];
        if ((_a = lastTextNode.textContent) == null ? void 0 : _a.trim()) {
          try {
            const textSpan = document.createElement("span");
            textSpan.textContent = lastTextNode.textContent;
            translationElement.style.cssText = `
              display: inline !important;
              margin-left: 4px !important;
              background: rgba(34, 197, 94, 0.1) !important;
              color: #059669 !important;
              padding: 1px 3px !important;
              border-radius: 2px !important;
              font-size: 10px !important;
              font-weight: 500 !important;
              white-space: nowrap !important;
            `;
            lastTextNode.replaceWith(textSpan, translationElement);
            console.log("🎯 Inline text replacement for field div");
            return;
          } catch (error) {
            console.warn("Failed to insert inline translation:", error);
          }
        }
      }
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
const mergedTranslationCache = /* @__PURE__ */ new Map();
const pageAssociations = {
  "page1": ["page1"],
  // 暂时只加载自己，减少干扰
  "page2": ["page2"],
  // 暂时只加载自己
  "page3": ["page3"],
  // 暂时只加载page3，确保精确度
  "page4": ["page4"],
  // 暂时只加载自己
  "page5": ["page5"],
  // 暂时只加载自己
  // 为其他页面添加默认关联（只加载自己）
  "page6": ["page6"],
  "page7": ["page7"],
  "page8": ["page8"],
  "page9": ["page9"],
  "page10": ["page10"],
  "page11": ["page11"],
  "page12": ["page12"],
  "page13": ["page13"],
  "page14": ["page14"],
  "page15": ["page15"],
  "page16": ["page16"],
  "page17": ["page17"],
  "page18": ["page18"]
};
async function loadMergedTranslationData(pageId) {
  if (mergedTranslationCache.has(pageId)) {
    return mergedTranslationCache.get(pageId);
  }
  try {
    const associatedPages = pageAssociations[pageId] || [pageId];
    console.log(`Loading translation data for ${pageId} and associated pages:`, associatedPages);
    const translationDataList = [];
    for (const pageToLoad of associatedPages) {
      const data = await loadTranslationData(pageToLoad);
      if (data) {
        translationDataList.push(data);
      }
    }
    if (translationDataList.length === 0) {
      console.warn(`No translation data loaded for page ${pageId} and its associations`);
      return null;
    }
    const mergedData = mergeTranslationData(pageId, translationDataList);
    mergedTranslationCache.set(pageId, mergedData);
    return mergedData;
  } catch (error) {
    console.error("Error loading merged translation data:", error);
    return null;
  }
}
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
function mergeTranslationData(primaryPageId, translationDataList) {
  if (translationDataList.length === 0) {
    throw new Error("Cannot merge empty translation data list");
  }
  const primaryData = translationDataList[0];
  const mergedFields = [...primaryData.fields];
  const existingKeys = new Set(primaryData.fields.map((field) => field.key));
  for (let i = 1; i < translationDataList.length; i++) {
    const additionalData = translationDataList[i];
    for (const field of additionalData.fields) {
      if (!existingKeys.has(field.key)) {
        mergedFields.push(field);
        existingKeys.add(field.key);
      }
    }
  }
  console.log(`Merged translation data: ${mergedFields.length} total fields from ${translationDataList.length} pages`);
  return {
    version: primaryData.version,
    pageId: primaryPageId,
    description: `${primaryData.description} (merged with ${translationDataList.length - 1} additional pages)`,
    fields: mergedFields
  };
}
function getDataFileForPage(pageId) {
  if (pageId.startsWith("page") && pageId.match(/^page\d+$/)) {
    const pageNumber = pageId.replace("page", "").padStart(2, "0");
    return `pages/translation-page${pageNumber}.json`;
  }
  const legacyFileMap = {
    "personalInfo": "translation-personal-info.json",
    "personalInfo1": "translation-personal-info.json",
    "contactInfo": "translation-contact-info.json",
    "general": "pages/translation-page01.json"
    // 默认使用第一页
  };
  if (legacyFileMap[pageId]) {
    return legacyFileMap[pageId];
  }
  const pageContent = document.body.textContent || "";
  const contentPatterns = [
    { pattern: /Surnames.*Given Names/i, file: "pages/translation-page01.json" },
    { pattern: /Nationality.*National.*Identification/i, file: "pages/translation-page02.json" },
    { pattern: /Travel.*Information.*Address.*stay/i, file: "pages/translation-page03.json" },
    { pattern: /Travel.*Companions/i, file: "pages/translation-page04.json" },
    { pattern: /Previous.*US.*Travel/i, file: "pages/translation-page05.json" },
    { pattern: /Point.*Contact.*Information/i, file: "pages/translation-page06.json" },
    { pattern: /Family.*Information.*Relatives/i, file: "pages/translation-page07.json" },
    { pattern: /Family.*Information.*Spouse/i, file: "pages/translation-page08.json" },
    { pattern: /Work.*Education.*Training.*Information/i, file: "pages/translation-page09.json" },
    { pattern: /Security.*Background.*Part\s*1/i, file: "pages/translation-page12.json" },
    { pattern: /Security.*Background.*Part\s*2/i, file: "pages/translation-page13.json" },
    { pattern: /Security.*Background.*Part\s*3/i, file: "pages/translation-page14.json" },
    { pattern: /Security.*Background.*Part\s*4/i, file: "pages/translation-page15.json" },
    { pattern: /Security.*Background.*Part\s*5/i, file: "pages/translation-page16.json" },
    { pattern: /SEVIS.*Information/i, file: "pages/translation-page17.json" },
    { pattern: /Upload.*Photo/i, file: "pages/translation-page18.json" }
  ];
  for (const { pattern, file } of contentPatterns) {
    if (pattern.test(pageContent)) {
      return file;
    }
  }
  console.warn(`No translation file found for page: ${pageId}, content patterns did not match`);
  return null;
}
function validateTranslationData(data) {
  console.log("Validating translation data:", data);
  if (!data) {
    console.error("Validation failed: data is null or undefined");
    return false;
  }
  if (typeof data.version !== "string") {
    console.error("Validation failed: version is not a string");
    return false;
  }
  if (typeof data.pageId !== "string") {
    console.error("Validation failed: pageId is not a string");
    return false;
  }
  if (!Array.isArray(data.fields)) {
    console.error("Validation failed: fields is not an array");
    return false;
  }
  for (let i = 0; i < data.fields.length; i++) {
    const field = data.fields[i];
    if (!field.key) {
      console.error(`Validation failed: field[${i}].key is missing`);
      return false;
    }
    if (!Array.isArray(field.selectors)) {
      console.error(`Validation failed: field[${i}].selectors is not an array`);
      return false;
    }
    if (!field.en) {
      console.error(`Validation failed: field[${i}].en is missing`);
      return false;
    }
    if (!field.zh) {
      console.error(`Validation failed: field[${i}].zh is missing`);
      return false;
    }
    const zhValid = typeof field.zh === "object" && typeof field.zh.brief === "string" && typeof field.zh.detailed === "string" || typeof field.zh === "string";
    if (!zhValid) {
      console.error(`Validation failed: field[${i}].zh format is invalid`, field.zh);
      return false;
    }
    const noteValid = field.note && typeof field.note === "object" && typeof field.note.brief === "string" && typeof field.note.detailed === "string" || typeof field.note === "string" || field.note === void 0 || field.note === null;
    if (!noteValid) {
      console.error(`Validation failed: field[${i}].note format is invalid`, field.note);
      return false;
    }
  }
  console.log("Validation passed successfully");
  return true;
}
function detectCurrentPage() {
  const url = window.location.href;
  const title = document.title;
  const pageContent = document.body.textContent || "";
  console.log("Detecting page type...");
  console.log("URL:", url);
  console.log("Title:", title);
  console.log("Page content preview:", pageContent.substring(0, 500));
  const urlPageMatch = url.match(/(?:page|step)[\s_-]*(\d+)/i);
  if (urlPageMatch) {
    const pageNum = parseInt(urlPageMatch[1]);
    if (pageNum >= 1 && pageNum <= 18) {
      console.log(`Found page number in URL: page${pageNum}`);
      return `page${pageNum}`;
    }
  }
  const pagePatterns = [
    { pattern: /Personal\s+Information\s+1|Surnames.*Given\s+Names/i, pageId: "page1" },
    { pattern: /Personal\s+Information\s+2|Nationality.*National.*Identification/i, pageId: "page2" },
    // 优先检查特定的URL模式，这些更可靠
    { pattern: /complete_contact\.aspx|Address\s+and\s+Phone\s+Information/i, pageId: "page6" },
    { pattern: /Passport_Visa_Info\.aspx|Passport\s+Information/i, pageId: "page7" },
    // Passport Information page
    { pattern: /complete_uscontact\.aspx|U\.?S\.?\s+Point\s+of\s+Contact\s+Information/i, pageId: "page8" },
    // U.S. Point of Contact Information page
    { pattern: /complete_family1\.aspx|Family\s+Information:\s*Relatives/i, pageId: "page9" },
    // Family Information: Relatives page
    { pattern: /complete_family2\.aspx|Family\s+Information:\s*Spouse/i, pageId: "page10" },
    // Family Information: Spouse page
    { pattern: /complete_workeducation3\.aspx|Additional\s+Work\/Education\/Training\s+Information/i, pageId: "page13" },
    { pattern: /complete_workeducation2\.aspx|Previous\s+Work\/Education\/Training\s+Information|Work\/Education\/Training\s+Information\s+2/i, pageId: "page12" },
    { pattern: /complete_workeducation1\.aspx|Present\s+Work\/Education\/Training\s+Information/i, pageId: "page11" },
    // Prioritize Security and Background pages over other patterns
    { pattern: /complete_securityandbackground1\.aspx|Security\s+and\s+Background:\s*Part\s*1/i, pageId: "page14" },
    { pattern: /complete_securityandbackground2\.aspx|Security\s+and\s+Background:\s*Part\s*2/i, pageId: "page15" },
    { pattern: /complete_securityandbackground3\.aspx|Security\s+and\s+Background:\s*Part\s*3/i, pageId: "page16" },
    { pattern: /complete_securityandbackground4\.aspx|Security\s+and\s+Background:\s*Part\s*4/i, pageId: "page17" },
    { pattern: /complete_securityandbackground5\.aspx|Security\s+and\s+Background:\s*Part\s*5/i, pageId: "page18" },
    { pattern: /previousustravel|Previous\s+U\.?S\.?\s+Travel\s*$/i, pageId: "page5" },
    { pattern: /Travel\s+Information(?!\s*(Previous|Companions))/i, pageId: "page3" },
    { pattern: /Travel\s+Companions(?!\s*Information)/i, pageId: "page4" },
    { pattern: /SEVIS\s+Information/i, pageId: "page19" },
    { pattern: /Upload\s+Photo|Photo\s+Upload/i, pageId: "page20" }
  ];
  for (const { pattern, pageId } of pagePatterns) {
    const contentMatch = pattern.test(pageContent);
    const titleMatch = pattern.test(title);
    const urlMatch = pattern.test(url);
    if (contentMatch || titleMatch || urlMatch) {
      console.log(`Detected DS-160 page: ${pageId} based on pattern match`, {
        content: contentMatch,
        title: titleMatch,
        url: urlMatch
      });
      return pageId;
    }
  }
  if (pageContent.includes("Surnames") && pageContent.includes("Given Names")) {
    return "page1";
  }
  if (pageContent.includes("Home Address") || pageContent.includes("Phone Number")) {
    return "page6";
  }
  if (url.includes("personal")) {
    return "page1";
  }
  if (url.includes("contact")) {
    return "page6";
  }
  console.warn("Unable to detect specific DS-160 page, defaulting to page1");
  return "page1";
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
    const translationData = await loadMergedTranslationData(pageType);
    if (translationData) {
      injector.setTranslationData(translationData);
      console.log(`Loaded merged translation data for ${pageType}:`, translationData.fields.length, "fields");
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

})();
