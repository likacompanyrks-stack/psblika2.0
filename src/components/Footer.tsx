import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

const APP_VERSION = '2.0.0';
const BUILD_DATE = '2025-10-16';

export const Footer = () => {
  const { language } = useApp();
  const t = translations[language];
  const [showChangelog, setShowChangelog] = useState(false);

  const changelogData = [
    {
      version: '1.0.0',
      date: '2025-09-01',
      features: [
        'Initial release',
        'Camera OCR scanning',
        'Manual entry',
        'CSV export',
        'Basic PWA support'
      ]
    },
    {
      version: '2.0.0',
      date: BUILD_DATE,
      features: [
        'Smart text and barcode recognition',
        'Automatic cable length detection (rolls × meters)',
        'Sound feedback on copy',
        'Category automation (Hikvision & Non-Hikvision)',
        'Multilingual interface (Albanian + English)',
        'Light / Dark mode',
        'Finish button to clear product list',
        'Excel export with category and type',
        'Enhanced PWA features'
      ]
    }
  ];

  return (
    <>
      <footer className="max-w-2xl mx-auto px-4 pb-8 pt-4">
        <div className="text-center">
          <button
            onClick={() => setShowChangelog(true)}
            className="text-xs text-slate-500 light:text-slate-600 hover:text-slate-400 light:hover:text-slate-700 transition-colors flex items-center gap-1 mx-auto"
          >
            <span>{t.moreUpdates}</span>
            <ChevronDown size={14} />
          </button>
          <p className="text-xs text-slate-600 light:text-slate-500 mt-2">
            {t.version} {APP_VERSION}
          </p>
        </div>
      </footer>

      {showChangelog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-800 light:bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-slate-800 light:bg-white border-b border-slate-700 light:border-slate-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white light:text-slate-900">{t.changelog}</h3>
              <button
                onClick={() => setShowChangelog(false)}
                className="w-8 h-8 rounded-lg bg-slate-700 light:bg-slate-100 hover:bg-slate-600 light:hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-slate-300 light:text-slate-700" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {changelogData.map((release) => (
                <div key={release.version} className="border-l-2 border-cyan-500 pl-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="text-md font-semibold text-white light:text-slate-900">
                      {t.version} {release.version}
                    </h4>
                    <span className="text-xs text-slate-400 light:text-slate-600">
                      {release.date}
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-300 light:text-slate-700">
                    {release.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-500 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="text-xs text-slate-500 light:text-slate-600 text-center pt-4 border-t border-slate-700 light:border-slate-200">
                {t.lastUpdated}: {BUILD_DATE}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
