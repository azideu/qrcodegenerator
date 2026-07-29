export type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface GradientConfig {
  type: 'linear';
  rotation: number; // in radians or degrees (0 to 360)
  colorStops: { offset: number; color: string }[];
}

export interface QRConfig {
  data: string;
  width: number;
  height: number;
  margin: number;
  qrType: 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'social';
  
  // Dots & Pattern
  dotType: DotType;
  dotColor: string;
  useGradient: boolean;
  gradient: GradientConfig;
  
  // Corners
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;

  // Background
  backgroundColor: string;
  transparentBackground: boolean;

  // Logo
  logoUrl?: string;
  logoSize: number;
  logoMargin: number;
  hideBackgroundDotsBehindLogo: boolean;

  // Frame
  frameText?: string;
  frameColor: string;
  frameTextColor: string;

  // Export
  exportResolution: 512 | 1024 | 2048 | 4096;
}

export interface QRPreset {
  id: string;
  name: string;
  description: string;
  config: Partial<QRConfig>;
  previewGradient: string;
}

export interface SavedQRItem {
  id: string;
  title: string;
  data: string;
  createdAt: number;
  config: QRConfig;
}
