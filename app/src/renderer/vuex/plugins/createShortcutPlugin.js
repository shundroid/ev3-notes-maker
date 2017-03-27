export const shortcuts = {
  " ": { action: "togglePlay" },
  "C-s": { action: "save" },
  "C-o": { action: "selectDirectory" },
};

export class ShortcutPlugin {
  constructor() {
    this.store = null;
    window.addEventListener("keydown", event => {
      this.dispatchShortcut(event);
    });
  }
  setStore(store) {
    this.store = store;
  }
  dispatchShortcut(event) {
    if (!this.store) return;
    const key = getKey(event.key, event.ctrlKey, event.shiftKey, event.altKey);
    const shortcut = shortcuts[key];
    if (shortcut) {
      this.store.dispatch(shortcut.action);
      event.preventDefault();
    }
  }
}

export function getKey(key, isControl, isShift, isAlt) {
  return `${isControl ? "C-" : ""}${isShift ? "S-" : ""}${isAlt ? "A-" : ""}${key.toLowerCase()}`;
}

export default function createShortcutPlugin() {
  const plugin = new ShortcutPlugin();
  return store => {
    plugin.setStore(store);
  };
}