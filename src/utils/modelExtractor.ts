export const extractModelNumber = (text: string): string | null => {
  const patterns = [
    /\b(DS-[A-Z0-9]{1,2}[A-Z0-9-]+)\b/i,
    /\b(IDS-[A-Z0-9-]+)\b/i,
    /\b(iDS-[A-Z0-9-]+)\b/i,
    /\b(IS-[A-Z0-9-]+)\b/i,
    /\b(IVMS-[A-Z0-9-]+)\b/i,
    /\b(DS-K[A-Z0-9-]+)\b/i,
    /\b(DS-T[A-Z0-9-]+)\b/i,
    /\b(DS-M[A-Z0-9-]+)\b/i,
    /\b(DS-A[A-Z0-9-]+)\b/i,
    /\b(DS-2TP[A-Z0-9-]+)\b/i,
    /\b(IPC-[A-Z0-9-]+)\b/i,
    /\b(THC-[A-Z0-9-]+)\b/i,
    /\b(DVR-[A-Z0-9-]+)\b/i,
    /\b(NVR-[A-Z0-9-]+)\b/i,
    /\b(C[0-9]+[A-Z0-9]*)\b/,
    /\b(DB[0-9]+[A-Z0-9]*)\b/,
    /\b(H[0-9]+[a-z]*)\b/,
    /\b(BC[0-9]+[A-Z]+)\b/i,
  ];

  const cleanText = text.replace(/[^a-zA-Z0-9\s-]/g, ' ');

  for (const pattern of patterns) {
    const match = cleanText.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }

  return null;
};
