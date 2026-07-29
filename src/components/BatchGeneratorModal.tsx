import React, { useState } from 'react';
import JSZip from 'jszip';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { Layers, Download, RefreshCw } from 'lucide-react';
import type { QRConfig } from '../types/qr';

interface BatchGeneratorProps {
  config: QRConfig;
}

export const BatchGenerator: React.FC<BatchGeneratorProps> = ({ config }) => {
  const [linksText, setLinksText] = useState<string>(
    `https://example.com/1\nhttps://example.com/2`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleBatchDownload = async () => {
    const rawLines = linksText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return;

    setIsGenerating(true);
    setProgress({ current: 0, total: rawLines.length });

    const zip = new JSZip();

    for (let i = 0; i < rawLines.length; i++) {
      const url = rawLines[i];
      setProgress({ current: i + 1, total: rawLines.length });

      const tempDiv = document.createElement('div');
      const qr = new QRCodeStyling({
        width: 1024,
        height: 1024,
        type: 'canvas',
        data: url,
        margin: config.margin,
        dotsOptions: {
          type: config.dotType,
          color: config.useGradient ? undefined : config.dotColor,
          gradient: config.useGradient
            ? {
                type: 'linear',
                rotation: (config.gradient.rotation * Math.PI) / 180,
                colorStops: config.gradient.colorStops
              }
            : undefined
        },
        cornersSquareOptions: {
          type: config.cornerSquareType,
          color: config.useGradient ? config.gradient.colorStops[0].color : config.cornerSquareColor
        },
        cornersDotOptions: {
          type: config.cornerDotType,
          color: config.useGradient ? config.gradient.colorStops[1]?.color || config.gradient.colorStops[0].color : config.cornerDotColor
        },
        backgroundOptions: {
          color: config.transparentBackground ? 'transparent' : config.backgroundColor
        },
        image: config.logoUrl || undefined,
        imageOptions: {
          hideBackgroundDots: config.hideBackgroundDotsBehindLogo,
          imageSize: config.logoSize,
          margin: config.logoMargin
        }
      });

      qr.append(tempDiv);
      await new Promise((r) => setTimeout(r, 100));

      const blob = await qr.getRawData('png');
      if (blob) {
        const safeName = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
        zip.file(`qr_${i + 1}_${safeName}.png`, blob);
      }
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const downloadUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `qr_batch_${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(downloadUrl);

    setIsGenerating(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const lineCount = linksText.split('\n').map((l) => l.trim()).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Intro Card */}
      <div className="glass-panel p-4 sm:p-6 lg:p-8 space-y-6 border border-white/20">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-white text-black shadow-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-syne text-lg sm:text-xl md:text-2xl font-extrabold text-white">Batch generator</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Generate multiple QR codes at once. Put each URL on a new line, then download them as a ZIP file.
            </p>
          </div>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-sm text-zinc-300">
            <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">URLs (one per line)</span>
            <span className="font-mono bg-white/10 px-2.5 py-0.5 text-white font-bold text-xs">
              {lineCount} links
            </span>
          </div>
          <textarea
            rows={10}
            value={linksText}
            onChange={(e) => setLinksText(e.target.value)}
            placeholder="https://example.com/1&#10;https://example.com/2"
            className="glass-input w-full p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">

          <button
            onClick={handleBatchDownload}
            disabled={isGenerating || lineCount === 0}
            className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-3 text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Generating {progress.current} of {progress.total}...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download ZIP ({lineCount} files)</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
