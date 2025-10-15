import { Plus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface ManualEntryStepProps {
  onSubmit: (model: string, quantity: number, unit: 'pcs' | 'meter') => void;
  onBack: () => void;
}

export const ManualEntryStep = ({ onSubmit, onBack }: ManualEntryStepProps) => {
  const { language } = useApp();
  const t = translations[language];
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'pcs' | 'meter'>('pcs');

  const handleSubmit = () => {
    const qty = parseInt(quantity);
    if (model.trim() && qty > 0) {
      onSubmit(model.trim().toUpperCase(), qty, unit);
      setModel('');
      setQuantity('');
      setUnit('pcs');
    }
  };

  const isValid = model.trim() !== '' && quantity !== '' && parseInt(quantity) > 0;

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
          {t.manualEntry}
        </h2>
        <p className="text-slate-400 light:text-slate-600">{t.enterModel}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 light:text-slate-700 mb-3">
            {t.model}
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder={t.modelPlaceholder}
            className="w-full px-4 py-4 bg-slate-800/50 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg uppercase"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 light:text-slate-700 mb-3">
            {t.quantityLabel}
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
