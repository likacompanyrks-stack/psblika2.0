import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface ConfirmStepProps {
  model: string;
  onConfirm: () => void;
  onRetry: () => void;
  cableRollInfo?: string | null;
}

export const ConfirmStep = ({ model, onConfirm, onRetry, cableRollInfo }: ConfirmStepProps) => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-white light:text-slate-900">
          {t.modelDetected}
        </h2>
        <p className="text-slate-400 light:text-slate-600">{t.confirmQuestion}</p>
      </div>

      <div className="glass-card p-8 mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <div className="text-3xl font-bold text-white light:text-slate-900 mb-2 tracking-wide">
          {model}
        </div>
        <p className="text-slate-400 light:text-slate-600 text-sm">{t.modelDetected}</p>

        {cableRollInfo && (
          <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Info size={16} />
              <span className="text-sm font-medium">{t.cableRollDetected}: {cableRollInfo}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full btn-gradient py-4 flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          <span className="font-medium">{t.confirmButton}</span>
        </button>

        <button
          onClick={onRetry}
          className="w-full btn-secondary py-4 flex items-center justify-center gap-2"
        >
          <XCircle size={20} />
          <span className="font-medium">{t.retryButton}</span>
        </button>
      </div>
    </div>
  );
};
