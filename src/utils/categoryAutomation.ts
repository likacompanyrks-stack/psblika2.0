export interface CategoryInfo {
  category: string;
  unit: 'pcs' | 'meter';
}

export const getCategoryFromModel = (model: string, isHikvision: boolean): CategoryInfo => {
  const upperModel = model.toUpperCase();

  if (isHikvision) {
    if (upperModel.startsWith('DS-2')) {
      return { category: 'Camera', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-1LN')) {
      return { category: 'Cable', unit: 'meter' };
    }

    if (upperModel.startsWith('DS-3E')) {
      return { category: 'Switch', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-76')) {
      return { category: 'NVR', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-72')) {
      return { category: 'DVR', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-12')) {
      return { category: 'Mount', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-1H')) {
      return { category: 'Power', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-P')) {
      return { category: 'Alarm', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-K')) {
      return { category: 'Intercom', unit: 'pcs' };
    }

    if (upperModel.startsWith('DS-D')) {
      return { category: 'Display', unit: 'pcs' };
    }

    return { category: 'Accessory', unit: 'pcs' };
  } else {
    return { category: 'Cable', unit: 'meter' };
  }
};
