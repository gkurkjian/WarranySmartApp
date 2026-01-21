const KEY = "warranty_items_v1";

export function loadItems() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
