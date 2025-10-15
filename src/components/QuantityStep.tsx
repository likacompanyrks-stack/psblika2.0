import { Plus, ArrowLeft, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface QuantityStepProps {
  model: string;
  onSubmit: (quantity: number, unit: 'pcs' | 'meter') => void;
  onBack: () => void;
  initialQuantity?: number | null;
  initialUnit?: 'pcs' | 'meter';
}

const QUICK_QUANTITIES = [8, 10, 18, 20, 30];

export const QuantityStep = ({
  model,
  onSubmit,
  onBack,
  initialQuantity,
  initialUnit = 'pcs',
}: QuantityStepProps) => {
  const { language } = useApp();
  const t = translations[language];
  const [quantity, setQuantity] = useState<string>(initialQuantity ? initialQuantity.toString() : '');
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);
  const [unit, setUnit] = useState<'pcs' | 'meter'>(initialUnit);

  useEffect(() => {
    if (initialQuantity) {
      setQuantity(initialQuantity.toString());
    }
  }, [initialQuantity]);

  const handleQuickSelect = (qty: number) => {
    setSelectedQuick(qty);
    setQuantity('');
  };

  const handleSubmit = () => {
    const finalQty = selectedQuick || parseInt(quantity);
    if (finalQty > 0) {
      onSubmit(finalQty, unit);
    }
  };

  const isValid = selectedQuick !== null || (quantity !== '' && parseInt(quantity) > 0);

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>{t.backButton}</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-white light:text-slate-900">
          {t.enterQuantity}
        </h2>
        <p className="text-slate-400 light:text-slate-600">{t.quantityLabel}</p>
      </div>

      <div className="glass-card p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-cyan-400 light:text-cyan-600 mb-1">{model}</div>
          <div className="text-sm text-slate-400 light:text-slate-600">{t.model}</div>
        </div>

        {initialQuantity && (
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Info size={16} />
              <span className="text-sm font-medium">
                {t.qtyDetected}: {initialQuantity}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 light:text-slate-700 mb-3">
            Quick Select
          </label>
          <div className="grid grid-cols-5 gap-2">
            {QUICK_QUANTITIES.map((qty) => (
              <button
                key={qty}
                onClick={() => handleQuickSelect(qty)}
                className={`py-3 rounded-xl font-semibold transition-all ${
                  selectedQuick === qty
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-slate-700/50 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-300'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700 light:border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-slate-900 light:bg-white text-slate-500">or</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 light:text-slate-700 mb-3">
            Custom Amount
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setSelectedQuick(null);
            }}
            placeholder={t.quantityLabel}
            className="w-full px-4 py-4 bg-slate-800/50 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 light:text-slate-700 mb-3">
            {t.unitLabel}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setUnit('pcs')}
              className={`py-4 rounded-xl font-semibold transition-all ${
                unit === 'pcs'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-slate-700/50 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-300'
              }`}
            >
              {t.pieces}
            </button>
            <button
              onClick={() => setUnit('meter')}
              className={`py-4 rounded-xl font-semibold transition-all ${
                unit === 'meter'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-slate-700/50 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-300'
              }`}
            >
              {t.meter}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full btn-gradient py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          <span className="font-medium">{t.addProduct}</span>
        </button>
      </div>
    </div>
  );
};
