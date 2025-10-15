import { Camera } from 'lucide-react';
import { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface ScanStepProps {
  onScan: (file: File) => void;
  isProcessing: boolean;
  progress: number;
  onManualEntry: () => void;
}

export const ScanStep = ({ onScan, isProcessing, progress, onManualEntry }: ScanStepProps) => {
  const { language } = useApp();
  const t = translations[language];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onScan(file);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-white light:text-slate-900">
          {t.scanLabel}
        </h2>
        <p className="text-slate-400 light:text-slate-600">{t.scanButton}</p>
      </div>

      <div className="glass-card p-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif,.raw,.dng"
          capture="environment"
          onChange={handleFileChange}
          disabled={isProcessing}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="w-full btn-gradient py-6 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera size={24} />
          <span className="text-lg font-medium">
            {isProcessing ? t.processing : t.scanButton}
          </span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700 light:border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-slate-800 light:bg-white text-slate-500">or</span>
          </div>
        </div>

        <button
          onClick={onManualEntry}
          disabled={isProcessing}
          className="w-full btn-secondary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-medium">{t.manualEntry}</span>
        </button>

        {isProcessing && (
          <div className="mt-6 animate-slide-up">
            <div className="flex justify-between text-sm mb-2 text-slate-300 light:text-slate-700">
              <span>{t.processing}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 light:bg-slate-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
