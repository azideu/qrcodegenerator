import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { BatchGenerator } from './components/BatchGeneratorModal';
import { HistoryModal } from './components/HistoryModal';
import { DEFAULT_QR_CONFIG } from './utils/qrPresets';
import type { QRConfig, SavedQRItem } from './types/qr';

export function App() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedQRItem[]>([]);

  // Load history from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('qrcraft_saved_history');
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  const handleConfigChange = (updated: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };
  const handleSaveQR = () => {
    const newItem: SavedQRItem = {
      id: `qr-${Date.now()}`,
      title: config.qrType.toUpperCase() + ' - ' + (config.data.substring(0, 24) || 'QR Code'),
      data: config.data,
      createdAt: Date.now(),
      config: { ...config }
    };

    const updated = [newItem, ...savedItems];
    setSavedItems(updated);
    localStorage.setItem('qrcraft_saved_history', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setSavedItems([]);
    localStorage.removeItem('qrcraft_saved_history');
  };

  const handleDeleteOneHistory = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    localStorage.setItem('qrcraft_saved_history', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-zinc-100 selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-zinc-500/[0.02] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openHistory={() => setIsHistoryOpen(true)}
        savedCount={savedItems.length}
      />

      {/* Main App Workspace */}
      <main className="flex-1 w-full max-w-[2400px] mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-8">
        
        {activeTab === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Column 1: Input & Content Type */}
            <div>
              <InputPanel config={config} onChange={handleConfigChange} />
            </div>

            {/* Column 2: Live Interactive Preview & Export (Sticky) */}
            <div className="lg:sticky lg:top-28">
              <PreviewPanel
                config={config}
                onSaveQR={handleSaveQR}
              />
            </div>

          </div>
        ) : (
          <BatchGenerator config={config} />
        )}

      </main>

      {/* History Drawer Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedItems={savedItems}
        onRestore={(savedConfig) => setConfig(savedConfig)}
        onClear={handleClearHistory}
        onDeleteOne={handleDeleteOneHistory}
      />

    </div>
  );
}

export default App;
