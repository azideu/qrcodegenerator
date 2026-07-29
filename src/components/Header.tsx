import React from 'react';
import { QrCode, Layers, History } from 'lucide-react';

interface HeaderProps {
  activeTab: 'single' | 'batch';
  setActiveTab: (tab: 'single' | 'batch') => void;
  openHistory: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openHistory,
  savedCount
}) => {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-black/90 backdrop-blur-2xl sticky top-0 z-40">
      <div className="w-full max-w-[2400px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Mode Switcher */}
        <div className="flex bg-zinc-900 p-1 border border-zinc-800">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'single'
                ? 'bg-white text-black shadow-xl'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Single</span>
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'batch'
                ? 'bg-white text-black shadow-xl'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Batch</span>
          </button>
        </div>

        {/* History Button */}
        <button
          onClick={openHistory}
          className="relative flex items-center justify-center gap-2 p-3 md:px-4 md:py-3 text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-all"
          title="Saved QR codes"
        >
          <History className="w-4 h-4 text-white shrink-0" />
          <span className="hidden md:inline">Saved</span>
          {savedCount > 0 && (
            <span className="px-2 py-0.5 bg-white text-black text-xs font-black">
              {savedCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
};
