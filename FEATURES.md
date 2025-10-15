# Product Scanner - Feature List

## Complete Feature Set

### 1. Scanning & OCR
- Camera input with support for multiple formats: JPG, PNG, HEIC, HEIF, RAW, DNG
- Automatic image downscaling to 1600px for optimal OCR speed
- Progress indicator during OCR processing
- Web Worker processing for smooth performance
- English language trained data for fast recognition

### 2. Model Detection
Automatically extracts model numbers for:
- Hikvision series: DS-, IDS-, iDS-, IS-, IVMS-
- Specialized variants: DS-K, DS-T, DS-M, DS-A, DS-2TP
- IP Cameras: IPC-
- Analog cameras: THC-
- Recording devices: DVR-, NVR-
- Ezviz series: C-series (e.g., C6N)
- HiLook series: DB-series (e.g., DB2), H-series (e.g., H8c)
- Accessories: BC-series (e.g., BC1C)

### 3. Manual Entry
- Direct model number input (auto-uppercase)
- Quantity input with validation
- Unit selection: PCS or Meter
- Skip OCR scanning entirely if preferred

### 4. Quantity Input
- Quick-select buttons: 8, 10, 18, 20, 30
- Custom quantity input field
- Unit toggle: PCS vs Meter
- Visual feedback for selected options

### 5. Product List Management
- View all added products
- Edit quantities inline
- Delete individual entries
- Persistent storage (survives page reload)
- Real-time list updates

### 6. Export Options

#### Copy to Clipboard
Format: `MODEL - QUANTITY unit`
Example:
```
DS-2CD2143G0-I - 10 pcs
CAT6-CABLE - 100 meter
```

#### CSV Download
Three-column format for Excel:
```
MODEL,PCS,METER
DS-2CD2143G0-I,10,
CAT6-CABLE,,100
NVR-7608-K1,5,
```
- Products measured in PCS have empty Meter column
- Products measured in Meter have empty PCS column
- Easy to sort, filter, and calculate totals in Excel

### 7. User Experience
- Smooth animations and transitions
- Touch-friendly 44px minimum button size
- Glassmorphism design with dark theme
- Cyan-to-blue gradient accents
- Error handling with clear messages
- Loading states and progress indicators
- Success confirmations (checkmarks, "Copied!" feedback)

### 8. Mobile Optimization
- Safe area insets for iPhone X-17 (notches and home indicators)
- Native iOS font stack
- Viewport-fit cover for edge-to-edge display
- Overscroll behavior disabled
- Tap highlight removed for native feel
- Responsive layout for all screen sizes

### 9. PWA Features
- Service worker for offline functionality
- Manifest.json for home screen installation
- Standalone display mode
- Theme color and status bar styling
- Caching for instant load times

### 10. Branding
- "Made with ❤️ by LIKA" in header
- "More updates coming soon!" in footer
- Professional gradient logo icon
- Custom product scanner branding

### 11. Navigation Flow
1. **Scan Step**: Camera or manual entry choice
2. **Confirm Step**: Verify detected model
3. **Quantity Step**: Enter amount and unit
4. **List Step**: View, edit, export products
5. **Manual Step**: Direct entry without scanning

### 12. Technical Features
- TypeScript for type safety
- React hooks for state management
- localStorage for persistence
- Modular component architecture
- Utility functions for reusable logic
- Clean separation of concerns

## Usage Scenarios

### Scenario 1: Quick Scanning
1. Open app → Tap "Open Camera"
2. Scan label → Confirm model
3. Select quantity → Add
4. Export or continue scanning

### Scenario 2: Manual Entry
1. Open app → Tap "Type Manually"
2. Enter model + quantity + unit
3. Add to list
4. Export when done

### Scenario 3: Mixed Entry
1. Scan some products
2. Switch to manual for cables (meters)
3. Export complete list to Excel
4. Process in spreadsheet

### Scenario 4: Offline Use
1. Install as PWA
2. Works without internet
3. Data stored locally
4. Export when convenient
