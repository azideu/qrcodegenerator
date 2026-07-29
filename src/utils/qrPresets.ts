import type { QRPreset, QRConfig } from '../types/qr';

export const DEFAULT_QR_CONFIG: QRConfig = {
  data: 'https://github.com',
  width: 1024,
  height: 1024,
  margin: 16,
  qrType: 'url',

  dotType: 'square',
  dotColor: '#000000',
  useGradient: false,
  gradient: {
    type: 'linear',
    rotation: 45,
    colorStops: [
      { offset: 0, color: '#000000' },
      { offset: 1, color: '#52525b' }
    ]
  },

  cornerSquareType: 'square',
  cornerSquareColor: '#000000',
  cornerDotType: 'square',
  cornerDotColor: '#000000',

  backgroundColor: '#ffffff',
  transparentBackground: false,

  logoSize: 0.25,
  logoMargin: 4,
  hideBackgroundDotsBehindLogo: true,

  frameText: '',
  frameColor: '#000000',
  frameTextColor: '#ffffff',

  exportResolution: 1024
};

export const QR_PRESETS: QRPreset[] = [
  {
    id: 'stark-mono',
    name: 'Stark Monochrome',
    description: 'Crisp black gradient on pure white canvas',
    previewGradient: 'linear-gradient(135deg, #000000, #52525b)',
    config: {
      dotType: 'rounded',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#000000' },
          { offset: 1, color: '#52525b' }
        ]
      },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#000000',
      cornerDotType: 'dot',
      cornerDotColor: '#000000',
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'silver-chrome',
    name: 'Silver Chrome',
    description: 'Platinum to silver gradient dots',
    previewGradient: 'linear-gradient(135deg, #18181b, #a1a1aa)',
    config: {
      dotType: 'classy-rounded',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 90,
        colorStops: [
          { offset: 0, color: '#09090b' },
          { offset: 1, color: '#a1a1aa' }
        ]
      },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#09090b',
      cornerDotType: 'dot',
      cornerDotColor: '#71717a',
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'pure-black-white',
    name: 'Classic Pure Black',
    description: 'Minimal high contrast solid black',
    previewGradient: 'linear-gradient(135deg, #000000, #18181b)',
    config: {
      dotType: 'square',
      useGradient: false,
      dotColor: '#000000',
      cornerSquareType: 'square',
      cornerSquareColor: '#000000',
      cornerDotType: 'square',
      cornerDotColor: '#000000',
      backgroundColor: '#ffffff',
      transparentBackground: false
    }
  },
  {
    id: 'inverted-obsidian',
    name: 'Inverted Dark Mode',
    description: 'Pure white matrix on deep black background',
    previewGradient: 'linear-gradient(135deg, #000000, #27272a)',
    config: {
      dotType: 'dots',
      useGradient: false,
      dotColor: '#ffffff',
      cornerSquareType: 'dot',
      cornerSquareColor: '#ffffff',
      cornerDotType: 'dot',
      cornerDotColor: '#ffffff',
      backgroundColor: '#09090b',
      transparentBackground: false
    }
  },
  {
    id: 'charcoal-dots',
    name: 'Charcoal Round',
    description: 'Soft rounded charcoal dots',
    previewGradient: 'linear-gradient(135deg, #27272a, #71717a)',
    config: {
      dotType: 'dots',
      useGradient: true,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#18181b' },
          { offset: 1, color: '#71717a' }
        ]
      },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#18181b',
      cornerDotType: 'dot',
      cornerDotColor: '#18181b',
      backgroundColor: '#ffffff'
    }
  }
];
