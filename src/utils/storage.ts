import { ProductEntry } from '../types';

const STORAGE_KEY = 'product_scanner_entries';

export const saveEntries = (entries: ProductEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const loadEntries = (): ProductEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const clearEntries = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
