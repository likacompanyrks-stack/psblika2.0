# Product Scanner PWA

A professional mobile-first web app for scanning product labels using OCR technology. Optimized for iPhone Safari (iPhone X through iPhone 17).

Made with love by LIKA.

## Features

- **Camera OCR Scanning**: Capture product labels with your iPhone camera (supports JPG, HEIC, RAW, DNG formats)
- **Manual Entry Option**: Type model numbers manually if preferred
- **Smart Model Extraction**: Automatically detects Hikvision, HiLook, and Ezviz model numbers
- **Quick Quantity Entry**: Fast input with preset buttons (8, 10, 18, 20, 30)
- **Flexible Units**: Choose between PCS (pieces) or Meter for each entry
- **Persistent Storage**: All entries saved in localStorage
- **Export Options**:
  - Copy to clipboard (formatted list)
  - Download as CSV with separate MODEL, PCS, and METER columns
- **Edit & Delete**: Modify or remove entries anytime
- **PWA Support**: Install on home screen, works offline
- **iPhone Optimized**: Safe area support for all iPhone models with notches

## Deployment

### GitHub Pages

1. Build the project:
```bash
npm install
npm run build
```

2. Deploy the `dist` folder to GitHub Pages

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`

### Static Hosting

Simply upload the contents of the `dist` folder to any static hosting service.

## Development

```bash
npm install
npm run dev
```

## Technology Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Tesseract.js (OCR)
- Lucide React (icons)

## Browser Support

Optimized for:
- Safari iOS 14+
- Chrome iOS
- Modern mobile browsers

## Model Number Support

Automatically detects:
- DS-, IDS-, iDS-, IS-, IVMS- series
- DS-K, DS-T, DS-M, DS-A, DS-2TP variants
- IPC-, THC-, DVR-, NVR- series
- C-series (C6N, etc.)
- DB-series (DB2, etc.)
- H-series (H8c, etc.)
- BC-series (BC1C, etc.)

## CSV Export Format

The CSV export creates a file with three columns:
```
MODEL,PCS,METER
DS-2CD2143G0-I,10,
CAT6-CABLE,,100
```

See `CSV_FORMAT.md` for detailed import instructions for Excel and Google Sheets.

## Future Updates

More features are coming soon! Stay tuned for updates.
