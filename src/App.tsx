import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScanStep } from './components/ScanStep';
import { ConfirmStep } from './components/ConfirmStep';
import { QuantityStep } from './components/QuantityStep';
import { ProductList } from './components/ProductList';
import { ManualEntryStep } from './components/ManualEntryStep';
import { processImageSmart } from './utils/smartRecognition';
import { getCategoryFromModel } from './utils/categoryAutomation';
import { loadEntries, saveEntries } from './utils/storage';
import { copyToClipboard, downloadCSV, downloadExcel } from './utils/export';
import { playSuccessSound } from './utils/sound';
import { AppStep, ProductEntry } from './types';
import { useApp } from './context/AppContext';

function AppContent() {
  const { soundEnabled } = useApp();
  const [step, setStep] = useState<AppStep>('scan');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [detectedModel, setDetectedModel] = useState<string | null>(null);
  const [detectedQuantity, setDetectedQuantity] = useState<number | null>(null);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);
  const [detectedType, setDetectedType] = useState<'hikvision' | 'non-hikvision' | null>(null);
  const [detectedUnit, setDetectedUnit] = useState<'pcs' | 'meter'>('pcs');
  const [cableRollInfo, setCableRollInfo] = useState<string | null>(null);
  const [entries, setEntries] = useState<ProductEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEntries(loadEntries());

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleScan = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const result = await processImageSmart(file, setProgress);

      if (result.model) {
        setDetectedModel(result.model);
        const categoryInfo = getCategoryFromModel(result.model, result.isHikvision);
        setDetectedCategory(categoryInfo.category);
        setDetectedUnit(categoryInfo.unit);
        setDetectedType(result.isHikvision ? 'hikvision' : 'non-hikvision');

        if (result.cableRolls) {
          setCableRollInfo(
            `${result.cableRolls.rolls} × ${result.cableRolls.metersPerRoll}m = ${result.cableRolls.totalMeters}m`
          );
          setDetectedQuantity(result.cableRolls.totalMeters);
        } else if (result.quantity) {
          setDetectedQuantity(result.quantity);
        }

        setStep('confirm');
      } else {
        setError('No product information detected. For best results:\n\n• Hold the camera steady\n• Ensure good lighting\n• Keep text clearly visible\n• Avoid blurry images\n• Make sure the label is in focus');
      }
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process image. Please try again with:\n\n• Better lighting\n• Steadier camera position\n• Clearer focus on the label\n• Less reflection or glare');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleConfirm = () => {
    setStep('quantity');
  };

  const handleRetry = () => {
    resetDetectionState();
    setStep('scan');
    setError(null);
  };

  const handleQuantitySubmit = (quantity: number, unit: 'pcs' | 'meter') => {
    if (detectedModel) {
      const newEntry: ProductEntry = {
        id: Date.now().toString(),
        model: detectedModel,
        quantity,
        unit,
        timestamp: Date.now(),
        category: detectedCategory || undefined,
        type: detectedType || undefined,
      };

      setEntries([...entries, newEntry]);
      resetDetectionState();
      setStep('list');
      playSuccessSound(soundEnabled);
    }
  };

  const handleAddAnother = () => {
    resetDetectionState();
    setStep('scan');
    setError(null);
  };

  const handleEdit = (id: string, quantity: number, model?: string) => {
    setEntries(entries.map((e) => {
      if (e.id === id) {
        if (model) {
          const isHikvision = /^(DS-|IDS-|IPC-|THC-|DVR-|NVR-|CS-)/i.test(model);
          const categoryInfo = getCategoryFromModel(model, isHikvision);
          return {
            ...e,
            quantity,
            model,
            category: categoryInfo.category,
            type: isHikvision ? 'hikvision' : 'non-hikvision'
          };
        }
        return { ...e, quantity };
      }
      return e;
    }));
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleCopy = () => {
    copyToClipboard(entries);
    playSuccessSound(soundEnabled);
  };

  const handleDownload = () => {
    downloadCSV(entries);
  };

  const handleDownloadExcel = () => {
    downloadExcel(entries);
  };

  const handleFinish = () => {
    setEntries([]);
    resetDetectionState();
    setStep('scan');
  };

  const handleBackFromQuantity = () => {
    setStep('confirm');
  };

  const handleManualEntry = () => {
    setStep('manual');
  };

  const handleManualSubmit = (model: string, quantity: number, unit: 'pcs' | 'meter') => {
    const isHikvision = /^(DS-|IDS-|IPC-|THC-|DVR-|NVR-)/i.test(model);
    const categoryInfo = getCategoryFromModel(model, isHikvision);

    const newEntry: ProductEntry = {
      id: Date.now().toString(),
      model,
      quantity,
      unit,
      timestamp: Date.now(),
      category: categoryInfo.category,
      type: isHikvision ? 'hikvision' : 'non-hikvision',
    };

    setEntries([...entries, newEntry]);
    setStep('list');
  };

  const handleBackFromManual = () => {
    if (entries.length > 0) {
      setStep('list');
    } else {
      setStep('scan');
    }
  };

  const resetDetectionState = () => {
    setDetectedModel(null);
    setDetectedQuantity(null);
    setDetectedCategory(null);
    setDetectedType(null);
    setDetectedUnit('pcs');
    setCableRollInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 light:bg-gradient-to-br light:from-slate-50 light:via-white light:to-slate-100 transition-colors duration-300">
      <div className="safe-area-container">
        <Header />

        <main className="max-w-2xl mx-auto px-4 py-8">
          {step === 'scan' && (
            <ScanStep
              onScan={handleScan}
              isProcessing={isProcessing}
              progress={progress}
              onManualEntry={handleManualEntry}
              error={error}
            />
          )}

          {step === 'confirm' && detectedModel && (
            <ConfirmStep
              model={detectedModel}
              onConfirm={handleConfirm}
              onRetry={handleRetry}
              cableRollInfo={cableRollInfo}
            />
          )}

          {step === 'quantity' && detectedModel && (
            <QuantityStep
              model={detectedModel}
              onSubmit={handleQuantitySubmit}
              onBack={handleBackFromQuantity}
              initialQuantity={detectedQuantity}
              initialUnit={detectedUnit}
            />
          )}

          {step === 'manual' && (
            <ManualEntryStep onSubmit={handleManualSubmit} onBack={handleBackFromManual} />
          )}

          {step === 'list' && (
            <ProductList
              entries={entries}
              onAddAnother={handleAddAnother}
              onManualEntry={handleManualEntry}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopy={handleCopy}
              onDownload={handleDownload}
              onDownloadExcel={handleDownloadExcel}
              onFinish={handleFinish}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
