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
export {
  getSettings as g,
  onSettingsChange as o,
  saveSettings as s
};
//# sourceMappingURL=storage.js.map
