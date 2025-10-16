declare const Tesseract: any;

export interface SmartRecognitionResult {
  text: string;
  model: string | null;
  quantity: number | null;
  isHikvision: boolean;
  isCable: boolean;
  cableRolls: {
    rolls: number;
    metersPerRoll: number;
    totalMeters: number;
  } | null;
}

const preprocessImage = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    gray = gray * 1.2;
    gray = Math.min(255, gray);

    const threshold = 140;
    const value = gray > threshold ? 255 : 0;

    data[i] = data[i + 1] = data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const correctOCRErrors = (text: string): string => {
  const corrections: Record<string, string> = {
    'DS-1LNG': 'DS-1LN6',
    'DS-2CD214': 'DS-2CD2143',
    'DS-76': 'DS-7600',
    'IDS-': 'IDS-',
  };

  let corrected = text;
  for (const [wrong, right] of Object.entries(corrections)) {
    corrected = corrected.replace(new RegExp(wrong, 'gi'), right);
  }

  return corrected;
};

const detectCableRolls = (text: string): { rolls: number; metersPerRoll: number; totalMeters: number } | null => {
  const patterns = [
    /(\d+)\s*ROLLS\s*EACH\s*(\d+)M/i,
    /(\d+)\s*[×x]\s*(\d+)\s*m/i,
    /(\d+)\s*rolls?\s*(\d+)\s*m/i,
    /(\d+)\s*×\s*(\d+)\s*meters?/i,
    /QTY\s*:\s*(\d+)\s*ROLLS\s*EACH\s*(\d+)M/i,
    /(\d+)M\/REEL\s*,\s*(\d+)\s*REEL/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const rolls = parseInt(match[1]);
      const metersPerRoll = parseInt(match[2]);
      return {
        rolls,
        metersPerRoll,
        totalMeters: rolls * metersPerRoll,
      };
    }
  }

  const meterReel = text.match(/(\d+)M\/REEL/i);
  const reelCount = text.match(/(\d+)\s*REEL/i);
  if (meterReel && reelCount) {
    const metersPerRoll = parseInt(meterReel[1]);
    const rolls = parseInt(reelCount[1]);
    return {
      rolls,
      metersPerRoll,
      totalMeters: rolls * metersPerRoll,
    };
  }

  return null;
};

const extractQuantity = (text: string): number | null => {
  const patterns = [
    /QTY\s*:\s*(\d+)\s*ROLLS\s*EACH\s*(\d+)M/i,
    /QTY\s*:?\s*(\d+)/i,
    /QUANTITY\s*:?\s*(\d+)/i,
    /ADD\s*:?\s*(\d+)/i,
    /QTY:\s*(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }

  return null;
};

const detectProductType = (text: string): { isHikvision: boolean; isCable: boolean } => {
  const upperText = text.toUpperCase();

  const isHikvision = upperText.includes('MODEL') ||
                      /DS-[A-Z0-9]/.test(upperText) ||
                      /IDS-[A-Z0-9]/.test(upperText) ||
                      upperText.includes('HIKVISION');

  const isCable = upperText.includes('ITEM') ||
                  upperText.includes('CABLE') ||
                  /\d+\s*[×x]\s*\d+\s*m/i.test(text);

  return { isHikvision, isCable };
};

const extractModel = (text: string, isHikvision: boolean): string | null => {
  const lines = text.split('\n');

  for (const line of lines) {
    const upperLine = line.toUpperCase();

    if (upperLine.includes('MODEL:') || upperLine.includes('MODEL :')) {
      const modelMatch = line.match(/MODEL\s*:\s*([A-Z0-9\-_./()[\]{}@#$%^&*+=|\\<>?~`'"!,;:]+)/i);
      if (modelMatch && modelMatch[1]) {
        return modelMatch[1].trim().toUpperCase();
      }
    }
  }

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.toUpperCase().startsWith('ITEM')) {
      const itemMatch = trimmedLine.match(/ITEM\s*:\s*(.+?)(?:QTY|$)/i);
      if (itemMatch && itemMatch[1]) {
        return itemMatch[1].trim();
      }
      const parts = trimmedLine.split(/[:]/);
      if (parts.length > 1) {
        const itemName = parts[1].trim();
        if (itemName) return itemName;
      }
    }
  }

  if (isHikvision) {
    const patterns = [
      /\b(CS-[A-Z0-9\-_./()]+)\b/i,
      /\b(DS-[A-Z0-9]{1,2}[A-Z0-9\-_./()]+)\b/i,
      /\b(IDS-[A-Z0-9\-_./()]+)\b/i,
      /\b(iDS-[A-Z0-9\-_./()]+)\b/i,
      /\b(IS-[A-Z0-9\-_./()]+)\b/i,
      /\b(IVMS-[A-Z0-9\-_./()]+)\b/i,
      /\b(DS-K[A-Z0-9\-_./()]+)\b/i,
      /\b(DS-T[A-Z0-9\-_./()]+)\b/i,
      /\b(IPC-[A-Z0-9\-_./()]+)\b/i,
      /\b(THC-[A-Z0-9\-_./()]+)\b/i,
      /\b(DVR-[A-Z0-9\-_./()]+)\b/i,
      /\b(NVR-[A-Z0-9\-_./()]+)\b/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].toUpperCase();
      }
    }
  }

  return null;
};

export const processImageSmart = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<SmartRecognitionResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target?.result as string;

        await new Promise((res) => {
          img.onload = res;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        let width = img.width;
        let height = img.height;
        const maxDimension = 2000;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        preprocessImage(canvas);

        const worker = await Tesseract.createWorker('eng', 1, {
          logger: (m: any) => {
            if (m.status === 'recognizing text' && onProgress) {
              onProgress(Math.round(m.progress * 100));
            }
          },
          workerBlobURL: false,
        });

        await worker.setParameters({
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_./()[]{}:×+, ',
          tessedit_pageseg_mode: '6',
        });

        const { data } = await worker.recognize(canvas);
        await worker.terminate();

        const rawText = data.text;
        const correctedText = correctOCRErrors(rawText);

        const { isHikvision, isCable } = detectProductType(correctedText);
        const model = extractModel(correctedText, isHikvision);
        const quantity = extractQuantity(correctedText);
        const cableRolls = detectCableRolls(correctedText);

        resolve({
          text: correctedText,
          model,
          quantity,
          isHikvision,
          isCable,
          cableRolls,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
