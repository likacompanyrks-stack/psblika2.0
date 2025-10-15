import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  scanLabel: string;
  scanButton: string;
  manualEntry: string;
  processing: string;
  modelDetected: string;
  confirmQuestion: string;
  confirmButton: string;
  retryButton: string;
  enterQuantity: string;
  quantityLabel: string;
  unitLabel: string;
  pieces: string;
  meter: string;
  backButton: string;
  addButton: string;
  addProduct: string;
  productList: string;
  model: string;
  quantity: string;
  unit: string;
  category: string;
  type: string;
  actions: string;
  edit: string;
  delete: string;
  copyList: string;
  downloadExcel: string;
  finish: string;
  finishConfirm: string;
  listCleared: string;
  copiedToClipboard: string;
  moreUpdates: string;
  changelog: string;
  version: string;
  lastUpdated: string;
  close: string;
  cable: string;
  camera: string;
  switch: string;
  nvr: string;
  dvr: string;
  mount: string;
  power: string;
  alarm: string;
  intercom: string;
  display: string;
  accessory: string;
  hikvision: string;
  nonHikvision: string;
  cableRollDetected: string;
  enterModel: string;
  modelPlaceholder: string;
  qtyDetected: string;
}

export const translations: Record<Language, Translations> = {
  sq: {
    appName: 'ps-LIKA',
    tagline: 'Skaneri i produkteve nga LIKA',
    scanLabel: 'Skanoni etiketën e produktit',
    scanButton: 'Skanoni me kamerë',
    manualEntry: 'Hyrje manuale',
    processing: 'Duke përpunuar...',
    modelDetected: 'Model i zbuluar',
    confirmQuestion: 'A është ky modeli i saktë?',
    confirmButton: 'Konfirmo',
    retryButton: 'Provoni përsëri',
    enterQuantity: 'Vendosni sasinë',
    quantityLabel: 'Sasia',
    unitLabel: 'Njësia',
    pieces: 'Copë',
    meter: 'Metër',
    backButton: 'Kthehu',
    addButton: 'Shto',
    addProduct: '+ Shto Produkt',
    productList: 'Lista e produkteve',
    model: 'Modeli',
    quantity: 'Sasia',
    unit: 'Njësia',
    category: 'Kategoria',
    type: 'Lloji',
    actions: 'Veprimet',
    edit: 'Ndrysho',
    delete: 'Fshi',
    copyList: 'Kopjo listën',
    downloadExcel: 'Shkarko Excel',
    finish: 'Përfundo',
    finishConfirm: 'Dëshironi të pastroni listën?',
    listCleared: 'Lista u pastrua me sukses',
    copiedToClipboard: 'U kopjua në clipboard',
    moreUpdates: 'Më shumë përditësime vijnë së shpejti!',
    changelog: 'Ndryshimet e versionit',
    version: 'Versioni',
    lastUpdated: 'Përditësuar më',
    close: 'Mbyll',
    cable: 'Kabllo',
    camera: 'Kamerë',
    switch: 'Switch',
    nvr: 'NVR',
    dvr: 'DVR',
    mount: 'Suport',
    power: 'Ushqim',
    alarm: 'Alarm',
    intercom: 'Interkom',
    display: 'Ekran',
    accessory: 'Aksesor',
    hikvision: 'Hikvision',
    nonHikvision: 'Jo-Hikvision',
    cableRollDetected: 'U zbulua',
    enterModel: 'Vendosni modelin',
    modelPlaceholder: 'p.sh., DS-2CD2143G0-I',
    qtyDetected: 'Sasia e zbuluar',
  },
  en: {
    appName: 'ps-LIKA',
    tagline: 'Product Scanner by LIKA',
    scanLabel: 'Scan product label',
    scanButton: 'Scan with camera',
    manualEntry: 'Manual Entry',
    processing: 'Processing...',
    modelDetected: 'Model detected',
    confirmQuestion: 'Is this model correct?',
    confirmButton: 'Confirm',
    retryButton: 'Try Again',
    enterQuantity: 'Enter quantity',
    quantityLabel: 'Quantity',
    unitLabel: 'Unit',
    pieces: 'Pieces',
    meter: 'Meter',
    backButton: 'Back',
    addButton: 'Add',
    addProduct: '+ Add Product',
    productList: 'Product List',
    model: 'Model',
    quantity: 'Quantity',
    unit: 'Unit',
    category: 'Category',
    type: 'Type',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    copyList: 'Copy List',
    downloadExcel: 'Download Excel',
    finish: 'Finish',
    finishConfirm: 'Do you want to clear the list?',
    listCleared: 'List cleared successfully',
    copiedToClipboard: 'Copied to clipboard',
    moreUpdates: 'More updates are coming soon!',
    changelog: 'Version Changelog',
    version: 'Version',
    lastUpdated: 'Last Updated',
    close: 'Close',
    cable: 'Cable',
    camera: 'Camera',
    switch: 'Switch',
    nvr: 'NVR',
    dvr: 'DVR',
    mount: 'Mount',
    power: 'Power',
    alarm: 'Alarm',
    intercom: 'Intercom',
    display: 'Display',
    accessory: 'Accessory',
    hikvision: 'Hikvision',
    nonHikvision: 'Non-Hikvision',
    cableRollDetected: 'Detected',
    enterModel: 'Enter model',
    modelPlaceholder: 'e.g., DS-2CD2143G0-I',
    qtyDetected: 'Quantity detected',
  },
};

export const getTranslation = (lang: Language, key: keyof Translations): string => {
  return translations[lang][key];
};
