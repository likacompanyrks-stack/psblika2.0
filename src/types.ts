export interface ProductEntry {
  id: string;
  model: string;
  quantity: number;
  unit: 'pcs' | 'meter';
  timestamp: number;
  category?: string;
  type?: 'hikvision' | 'non-hikvision';
}

export type AppStep = 'scan' | 'confirm' | 'quantity' | 'list' | 'manual';

export type Language = 'sq' | 'en';
export type Theme = 'light' | 'dark';
