import React, { useState } from 'react';
import { Palette, Image as ImageIcon, Sliders, Layout, Upload, RotateCw } from 'lucide-react';
import type { QRConfig, DotType, CornerSquareType, CornerDotType } from '../types/qr';

interface StylePanelProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
}

const PRESET_LOGOS = [
  { name: 'None', url: '' },
  { name: 'GitHub', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg' },
  { name: 'Twitter / X', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg' },
  { name: 'Instagram', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/instagram.svg' },
  { name: 'YouTube', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/youtube.svg' },
  { name: 'Wi-Fi', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/wifi.svg' },
];

export const StylePanel: React.FC<StylePanelProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState<'pattern' | 'colors' | 'logo' | 'frame'>('pattern');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ logoUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-zinc-950 p-8 sm:p-10 border border-zinc-800 space-y-8 shadow-2xl">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
        <div>
          <h2 className="font-syne text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            2. CUSTOMIZE VISUAL STYLE
          </h2>
          <p className="text-base text-zinc-400 font-mono mt-1">
            Fine-tune dot shapes, monochrome colors, gradients, and embedded logos
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black p-2 border border-zinc-800">
        <button
          onClick={() => setActiveTab('pattern')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 text-sm sm:text-base font-extrabold transition-all ${
            activeTab === 'pattern'
              ? 'bg-white text-black shadow-2xl scale-[1.02]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Pattern</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 text-sm sm:text-base font-extrabold transition-all ${
            activeTab === 'colors'
              ? 'bg-white text-black shadow-2xl scale-[1.02]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Colors</span>
        </button>

        <button
          onClick={() => setActiveTab('logo')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 text-sm sm:text-base font-extrabold transition-all ${
            activeTab === 'logo'
              ? 'bg-white text-black shadow-2xl scale-[1.02]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Logo</span>
        </button>

        <button
          onClick={() => setActiveTab('frame')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 text-sm sm:text-base font-extrabold transition-all ${
            activeTab === 'frame'
              ? 'bg-white text-black shadow-2xl scale-[1.02]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Frame</span>
        </button>
      </div>

      {/* Tab Content 1: Patterns */}
      {activeTab === 'pattern' && (
        <div className="space-y-8">
          {/* Dots Type */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Matrix Dot Style
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['rounded', 'dots', 'classy-rounded', 'square', 'extra-rounded', 'classy'] as DotType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ dotType: type })}
                  className={`py-4 px-5 border text-base font-bold capitalize transition-all ${
                    config.dotType === type
                      ? 'bg-white text-black border-white shadow-2xl font-black'
                      : 'bg-black border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Square Style */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Corner Square Shape
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['extra-rounded', 'dot', 'square'] as CornerSquareType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ cornerSquareType: type })}
                  className={`py-4 px-5 border text-base font-bold capitalize transition-all ${
                    config.cornerSquareType === type
                      ? 'bg-white text-black border-white shadow-2xl font-black'
                      : 'bg-black border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Dot Style */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Corner Inner Dot Shape
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(['dot', 'square'] as CornerDotType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ cornerDotType: type })}
                  className={`py-4 px-5 border text-base font-bold capitalize transition-all ${
                    config.cornerDotType === type
                      ? 'bg-white text-black border-white shadow-2xl font-black'
                      : 'bg-black border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-8">
          {/* Gradient Toggle */}
          <div className="flex items-center justify-between bg-black p-6 border border-zinc-800">
            <div>
              <span className="text-lg font-bold text-white">Monochrome Dual-Color Gradient</span>
              <p className="text-sm text-zinc-400 mt-1">Smooth monochrome gradient across QR dots</p>
            </div>
            <input
              type="checkbox"
              checked={config.useGradient}
              onChange={(e) => onChange({ useGradient: e.target.checked })}
              className="w-7 h-7 accent-white cursor-pointer"
            />
          </div>

          {config.useGradient ? (
            <div className="space-y-6 bg-black p-6 border border-zinc-800">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono font-black text-zinc-400 block mb-3 uppercase">Start Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={config.gradient.colorStops[0]?.color || '#000000'}
                      onChange={(e) =>
                        onChange({
                          gradient: {
                            ...config.gradient,
                            colorStops: [
                              { offset: 0, color: e.target.value },
                              { offset: 1, color: config.gradient.colorStops[1]?.color || '#52525b' }
                            ]
                          }
                        })
                      }
                      className="w-14 h-14 cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={config.gradient.colorStops[0]?.color || '#000000'}
                      onChange={(e) =>
                        onChange({
                          gradient: {
                            ...config.gradient,
                            colorStops: [
                              { offset: 0, color: e.target.value },
                              { offset: 1, color: config.gradient.colorStops[1]?.color || '#52525b' }
                            ]
                          }
                        })
                      }
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white font-mono text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-black text-zinc-400 block mb-3 uppercase">End Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={config.gradient.colorStops[1]?.color || '#52525b'}
                      onChange={(e) =>
                        onChange({
                          gradient: {
                            ...config.gradient,
                            colorStops: [
                              { offset: 0, color: config.gradient.colorStops[0]?.color || '#000000' },
                              { offset: 1, color: e.target.value }
                            ]
                          }
                        })
                      }
                      className="w-14 h-14 cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={config.gradient.colorStops[1]?.color || '#52525b'}
                      onChange={(e) =>
                        onChange({
                          gradient: {
                            ...config.gradient,
                            colorStops: [
                              { offset: 0, color: config.gradient.colorStops[0]?.color || '#000000' },
                              { offset: 1, color: e.target.value }
                            ]
                          }
                        })
                      }
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-white font-mono text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Angle Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-zinc-300">
                  <span className="flex items-center gap-2 font-bold"><RotateCw className="w-4 h-4 text-white" /> Gradient Angle</span>
                  <span className="font-mono text-white font-black">{config.gradient.rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={config.gradient.rotation}
                  onChange={(e) =>
                    onChange({
                      gradient: { ...config.gradient, rotation: parseInt(e.target.value) }
                    })
                  }
                  className="w-full h-3"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
                Solid Dots Color
              </label>
              <div className="flex items-center space-x-5">
                <input
                  type="color"
                  value={config.dotColor}
                  onChange={(e) => onChange({ dotColor: e.target.value })}
                  className="w-14 h-14 cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={config.dotColor}
                  onChange={(e) => onChange({ dotColor: e.target.value })}
                  className="flex-1 px-5 py-4 bg-black border border-zinc-700 text-white text-lg font-mono"
                />
              </div>
            </div>
          )}

          {/* Background Color & Transparency */}
          <div className="space-y-5 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-black text-zinc-300 uppercase tracking-widest">
                Transparent Background (PNG)
              </span>
              <input
                type="checkbox"
                checked={config.transparentBackground}
                onChange={(e) => onChange({ transparentBackground: e.target.checked })}
                className="w-7 h-7 accent-white cursor-pointer"
              />
            </div>

            {!config.transparentBackground && (
              <div className="flex items-center space-x-5">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-14 h-14 cursor-pointer bg-transparent border-0"
                />
                <span className="text-base text-zinc-300 font-mono font-bold">{config.backgroundColor}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 3: Logo */}
      {activeTab === 'logo' && (
        <div className="space-y-8">
          {/* Quick Preset Logos */}
          <div className="space-y-4">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Quick Brand Icon
            </label>
            <div className="grid grid-cols-3 gap-4">
              {PRESET_LOGOS.map((logo) => (
                <button
                  key={logo.name}
                  onClick={() => onChange({ logoUrl: logo.url })}
                  className={`p-4 border text-base font-extrabold flex items-center justify-center space-x-3 transition-all ${
                    config.logoUrl === logo.url
                      ? 'bg-white text-black border-white shadow-2xl scale-[1.02]'
                      : 'bg-black border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {logo.url && (
                    <img src={logo.url} alt={logo.name} className="w-6 h-6 filter invert" />
                  )}
                  <span>{logo.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload */}
          <div className="space-y-4">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Or Upload Custom PNG Logo
            </label>
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-700 bg-black hover:bg-zinc-900 hover:border-white cursor-pointer transition-all">
              <Upload className="w-10 h-10 text-white mb-3" />
              <span className="text-base font-extrabold text-white">Click to select image file</span>
              <span className="text-xs font-mono text-zinc-400 mt-1">Supports PNG, SVG, JPG</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {config.logoUrl && (
            <div className="space-y-5 bg-black p-6 border border-zinc-800">
              <div className="flex justify-between items-center text-base">
                <span className="text-zinc-300 font-bold">Logo Size Ratio</span>
                <span className="font-mono text-white font-black">{Math.round(config.logoSize * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.35"
                step="0.01"
                value={config.logoSize}
                onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
                className="w-full h-3"
              />

              <button
                onClick={() => onChange({ logoUrl: '' })}
                className="w-full py-3 text-sm font-black text-rose-400 hover:text-rose-300 border border-rose-500/40 bg-rose-500/10"
              >
                Remove Logo
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 4: Frame */}
      {activeTab === 'frame' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest block">
              Bottom Frame Banner Text
            </label>
            <input
              type="text"
              placeholder="e.g. SCAN ME or CONNECT TO WIFI"
              value={config.frameText || ''}
              onChange={(e) => onChange({ frameText: e.target.value })}
              className="w-full px-6 py-4.5 bg-black border border-zinc-700 text-white text-lg focus:border-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-mono font-black text-zinc-400 block mb-3 uppercase">Banner Background</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={config.frameColor}
                  onChange={(e) => onChange({ frameColor: e.target.value })}
                  className="w-14 h-14 bg-transparent cursor-pointer"
                />
                <span className="text-base font-mono text-zinc-300 font-bold">{config.frameColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-black text-zinc-400 block mb-3 uppercase">Text Color</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={config.frameTextColor}
                  onChange={(e) => onChange({ frameTextColor: e.target.value })}
                  className="w-14 h-14 bg-transparent cursor-pointer"
                />
                <span className="text-base font-mono text-zinc-300 font-bold">{config.frameTextColor}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
