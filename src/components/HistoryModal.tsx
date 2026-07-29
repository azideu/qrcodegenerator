import React from 'react';
import { X, Trash2, ArrowUpRight, Calendar } from 'lucide-react';
import type { SavedQRItem, QRConfig } from '../types/qr';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedQRItem[];
  onRestore: (config: QRConfig) => void;
  onClear: () => void;
  onDeleteOne: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRestore,
  onClear,
  onDeleteOne
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="glass-panel w-full max-w-3xl p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl border border-white/20 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <h2 className="font-syne text-xl sm:text-2xl font-extrabold text-white">Saved QR codes</h2>
            <p className="text-sm text-zinc-400 mt-0.5">QR codes saved in your browser</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-zinc-400 hover:text-white bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 space-y-3">
              <p className="text-base font-bold text-white">No saved QR codes</p>
              <p className="text-sm text-zinc-400">Click "Save QR code" on any preview to keep it here.</p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 bg-white/5 hover:bg-white/15 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
              >
                <div className="space-y-1 min-w-0 flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-bold text-base text-white truncate">{item.title}</span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 bg-white/10 px-2 py-0.5 w-fit">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-zinc-300 truncate">{item.data}</p>
                </div>

                <div className="flex items-center justify-end space-x-2.5 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                  <button
                    onClick={() => {
                      onRestore(item.config);
                      onClose();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-extrabold bg-white text-black hover:bg-zinc-200 flex items-center justify-center space-x-1.5 shadow"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteOne(item.id)}
                    className="p-2.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/15 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedItems.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-white/15">
            <button
              onClick={onClear}
              className="text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-bold"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
            <span className="text-xs text-zinc-400 font-mono font-bold">{savedItems.length} saved</span>
          </div>
        )}

      </div>
    </div>
  );
};
