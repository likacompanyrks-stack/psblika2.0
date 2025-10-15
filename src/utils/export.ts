import { ProductEntry } from '../types';
import * as XLSX from 'xlsx';

export const copyToClipboard = (entries: ProductEntry[]): void => {
  const text = entries
    .map((entry) => {
      const categoryText = entry.category ? ` | ${entry.category}` : '';
      const typeText = entry.type ? ` | ${entry.type}` : '';
      return `${entry.model} - ${entry.quantity} ${entry.unit}${categoryText}${typeText}`;
    })
    .join('\n');

  navigator.clipboard.writeText(text);
};

export const downloadCSV = (entries: ProductEntry[]): void => {
  const csv = [
    'MODEL,PCS,METER',
    ...entries.map((entry) => {
      const pcs = entry.unit === 'pcs' ? entry.quantity : '';
      const meter = entry.unit === 'meter' ? entry.quantity : '';
      return `${entry.model},${pcs},${meter}`;
    })
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `product-list-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadExcel = (entries: ProductEntry[]): void => {
  const worksheetData = [
    ['Model', 'Quantity', 'Category', 'Type'],
    ...entries.map((entry) => [
      entry.model,
      entry.quantity,
      entry.category || '',
      entry.type || ''
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Export_List_${date}_v2.xlsx`);
};
