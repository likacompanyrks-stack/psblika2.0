import { Copy, Download, Edit2, Trash2, Plus, CheckCircle, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { ProductEntry } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface ProductListProps {
  entries: ProductEntry[];
  onAddAnother: () => void;
  onManualEntry: () => void;
  onEdit: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
  onCopy: () => void;
  onDownload: () => void;
  onDownloadExcel: () => void;
  onFinish: () => void;
}

export const ProductList = ({
  entries,
  onAddAnother,
  onManualEntry,
  onEdit,
  onDelete,
  onCopy,
  onDownload,
  onDownloadExcel,
  onFinish,
}: ProductListProps) => {
  const { language } = useApp();
  const t = translations[language];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  const handleEdit = (entry: ProductEntry) => {
    setEditingId(entry.id);
    setEditValue(entry.quantity.toString());
  };

  const handleSaveEdit = (id: string) => {
    const qty = parseInt(editValue);
    if (qty > 0) {
      onEdit(id, qty);
      setEditingId(null);
    }
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishConfirm = () => {
    setShowFinishConfirm(false);
    onFinish();
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-white light:text-slate-900">{t.productList}</h2>
        <p className="text-slate-400 light:text-slate-600">{entries.length} item{entries.length !== 1 ? 's' : ''} added</p>
      </div>

      <div className="space-y-3 mb-6">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="glass-card p-4 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white light:text-slate-900 truncate">{entry.model}</div>
                {entry.category && (
                  <div className="text-xs text-cyan-400 light:text-cyan-600 mt-0.5">{entry.category}</div>
                )}
                {editingId === entry.id ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-24 px-3 py-1 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(entry.id)}
                      className="px-3 py-1 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
                    >
                      {t.addButton}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-slate-700 light:bg-slate-200 text-white light:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-600 light:hover:bg-slate-300 transition-colors"
                    >
                      {t.backButton}
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 light:text-slate-600 mt-1">
                    {entry.quantity} {entry.unit === 'pcs' ? t.pieces : t.meter}
                  </div>
                )}
              </div>

              {editingId !== entry.id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 bg-slate-700/50 light:bg-slate-200 hover:bg-slate-700 light:hover:bg-slate-300 rounded-lg transition-colors"
                    aria-label={t.edit}
                  >
                    <Edit2 size={16} className="text-slate-300 light:text-slate-700" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    aria-label={t.delete}
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center py-4">
          <button
            onClick={onAddAnother}
            className="btn-gradient py-4 px-8 flex items-center justify-center gap-2 animate-pulse-slow"
          >
            <Plus size={20} />
            <span className="font-medium">{t.addProduct}</span>
          </button>
        </div>

        <button
          onClick={onManualEntry}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <span className="font-medium">{t.manualEntry}</span>
        </button>

        <div className="grid grid-cols-3 gap-3 pt-3">
          <button
            onClick={handleCopy}
            disabled={entries.length === 0}
            className="btn-secondary py-4 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-xs font-medium">{t.copiedToClipboard}</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span className="text-xs font-medium">{t.copyList}</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            disabled={entries.length === 0}
            className="btn-secondary py-4 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            <span className="text-xs font-medium">CSV</span>
          </button>

          <button
            onClick={onDownloadExcel}
            disabled={entries.length === 0}
            className="btn-secondary py-4 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet size={18} />
            <span className="text-xs font-medium">Excel</span>
          </button>
        </div>

        <button
          onClick={() => setShowFinishConfirm(true)}
          disabled={entries.length === 0}
          className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {t.finish}
        </button>
      </div>

      {showFinishConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-800 light:bg-white rounded-2xl max-w-sm w-full p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">{t.finishConfirm}</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 btn-secondary py-3"
              >
                {t.backButton}
              </button>
              <button
                onClick={handleFinishConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-colors font-medium"
              >
                {t.confirmButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
