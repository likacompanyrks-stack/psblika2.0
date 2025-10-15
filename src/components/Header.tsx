import { Package, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

export const Header = () => {
  const { language, setLanguage, theme, setTheme } = useApp();
  const t = translations[language];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'sq' ? 'en' : 'sq');
  };

  return (
    <header className="py-6 px-4 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/90 light:border-slate-200 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Package size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white light:text-slate-900">{t.appName}</h1>
          <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">{t.tagline}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-lg bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} className="text-slate-300 light:text-slate-700" />
          </button>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-slate-300" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
