# CSV Export Format

When you export your product list as CSV, it will be formatted like this:

## Format Example

```
MODEL,PCS,METER
DS-2CD2143G0-I,10,
IPC-HDW1230T1-A,8,
CAT6-CABLE,,100
NVR-7608-K1,5,
```

## Column Explanation

- **MODEL**: The product model number
- **PCS**: Quantity in pieces (empty if unit is meter)
- **METER**: Quantity in meters (empty if unit is pcs)

## Excel Import

To open in Excel:
1. Open Microsoft Excel
2. Go to File > Import > CSV
3. Select your downloaded file
4. Excel will automatically format it into columns

## Google Sheets Import

1. Open Google Sheets
2. Go to File > Import
3. Upload your CSV file
4. Choose "Replace spreadsheet" or "Insert new sheet"
5. Click "Import data"

## Manual Editing

You can edit the CSV file in any text editor:
- Each line is one product
- Separate values with commas
- First line is the header (MODEL,PCS,METER)

## Copy to Clipboard Format

When using "Copy" button, the format is:
```
DS-2CD2143G0-I - 10 pcs
IPC-HDW1230T1-A - 8 pcs
CAT6-CABLE - 100 meter
```

This format is perfect for:
- Pasting into emails
- Adding to documents
- Quick sharing via messaging apps
