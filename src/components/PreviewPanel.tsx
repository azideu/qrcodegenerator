import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { Download, Copy, Bookmark, Check, Code, ShieldCheck } from 'lucide-react';
import type { QRConfig } from '../types/qr';

interface PreviewPanelProps {
  config: QRConfig;
  onSaveQR: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  onSaveQR
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resolution, setResolution] = useState<512 | 1024 | 2048>(1024);

  // Initialize and update QRCodeStyling
  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: 320,
        height: 320,
        type: 'canvas',
        data: config.data,
        margin: config.margin,
        qrOptions: {
          errorCorrectionLevel: 'H'
        },
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

      if (ref.current) {
        ref.current.innerHTML = '';
        qrCodeRef.current.append(ref.current);
      }
    } else {
      qrCodeRef.current.update({
        data: config.data,
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
    }
  }, [config]);

  // Download High-Res PNG
  const downloadPNG = async () => {
    if (!qrCodeRef.current) return;
    
    qrCodeRef.current.update({
      width: resolution,
      height: resolution
    });

    await qrCodeRef.current.download({
      name: `qrcode-${Date.now()}`,
      extension: 'png'
    });

    qrCodeRef.current.update({
      width: 320,
      height: 320
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Download Vector SVG
  const downloadSVG = async () => {
    if (!qrCodeRef.current) return;
    await qrCodeRef.current.download({
      name: `qrcode-${Date.now()}`,
      extension: 'svg'
    });
  };

  // Copy PNG image to clipboard
  const copyToClipboard = async () => {
    const canvas = ref.current?.querySelector('canvas');
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleSave = () => {
    onSaveQR();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Canvas Card Frame */}
      <div className="bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden border border-zinc-800 shadow-2xl">
        
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Preview</span>
          </div>
          <span className="text-[10px] font-mono bg-white text-black px-2.5 py-0.5 font-bold">
            {resolution}px PNG
          </span>
        </div>

        {/* QR Code Canvas Container */}
        <div className="relative shadow-2xl flex flex-col items-center justify-center w-full max-w-[320px]">
          <div ref={ref} className="qr-canvas-wrapper w-full flex justify-center" />
        </div>

        {/* Resolution Quality Selector */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-black p-2 border border-zinc-800 w-full">
          <span className="text-xs font-mono font-bold text-zinc-400 px-2 text-center sm:text-left">
            Quality:
          </span>
          <div className="flex items-center space-x-2">
            {([512, 1024, 2048] as (512 | 1024 | 2048)[]).map((res) => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className={`px-4 py-2 text-xs font-mono font-black transition-all ${
                  resolution === res
                    ? 'bg-white text-black shadow-xl'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {`${res}px`}
              </button>
            ))}
          </div>
        </div>

        {/* Main Actions */}
        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={downloadPNG}
            className="btn-primary flex items-center justify-center space-x-2 text-sm py-3 w-full"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG ({resolution}px)</span>
          </button>

          <button
            onClick={downloadSVG}
            className="btn-secondary flex items-center justify-center space-x-2 text-sm py-3 w-full"
          >
            <Code className="w-4 h-4 text-white" />
            <span>Download SVG</span>
          </button>
        </div>

        {/* Secondary Utility Actions */}
        <div className="mt-3 w-full flex flex-col sm:flex-row gap-2.5 text-xs">
          <button
            onClick={copyToClipboard}
            className="w-full sm:flex-1 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center space-x-1.5 border border-zinc-800 transition-all font-bold"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="text-white">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>Copy image</span>
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:flex-1 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center space-x-1.5 border border-zinc-800 transition-all font-bold"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="text-white">Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-zinc-400" />
                <span>Save QR code</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
