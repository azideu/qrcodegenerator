import React from 'react';
import { Globe } from 'lucide-react';
import type { QRConfig } from '../types/qr';

interface InputPanelProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ config, onChange }) => {
  return (
    <div className="bg-zinc-950 p-4 sm:p-6 lg:p-8 border border-zinc-800 space-y-6 shadow-2xl">
      
      {/* Header & Character Count */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="font-syne text-lg sm:text-xl font-black text-white tracking-tight">
            Enter link
          </h2>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            Paste a website URL or link below.
          </p>
        </div>
        <span className="font-mono text-xs text-black bg-white px-3 py-1.5 font-black shadow-lg">
          {config.data.length} characters
        </span>
      </div>

      {/* Inputs */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
          URL
        </label>
        <div className="relative">
          <Globe className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          <input
            type="url"
            value={config.data}
            onChange={(e) => onChange({ data: e.target.value })}
            placeholder="https://example.com"
            className="w-full pl-12 pr-4 py-3.5 bg-black border border-zinc-700 text-white font-mono text-sm sm:text-base lg:text-lg focus:border-white focus:outline-none transition-all shadow-inner"
          />
        </div>
      </div>

    </div>
  );
};
