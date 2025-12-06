export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  sector: string;
  openInterest?: number;
  oiChangePercent?: number;
  trend?: 'Long Build Up' | 'Short Build Up' | 'Long Unwinding' | 'Short Covering';
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface MarketStatus {
  isOpen: boolean;
  nextUpdate: Date;
}

export interface SectorPerformance {
  name: string;
  changePercent: number;
}

export interface FIIDIIData {
  category: string;
  buyValue: number;
  sellValue: number;
  netValue: number;
}

export interface TrendGroup {
  name: string;
  count: number;
  color: string;
  stocks: Stock[];
}

export enum TabView {
  DASHBOARD = 'DASHBOARD',
  SCREENER = 'SCREENER',
  OPTIONS = 'OPTIONS',
  NEWS = 'NEWS'
}

export interface AIAnalysisResult {
  summary: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  keyPoints: string[];
}

export interface OptionStrike {
  strikePrice: number;
  callOI: number;
  callChangeOI: number;
  callLTP: number;
  callChange: number;
  putOI: number;
  putChangeOI: number;
  putLTP: number;
  putChange: number;
}

export interface OptionChainData {
  symbol: string;
  spotPrice: number;
  pcr: number;
  maxCallOI: number;
  maxCallOIStrike: number;
  maxPutOI: number;
  maxPutOIStrike: number;
  strikes: OptionStrike[];
}

export interface DeliveryStock {
  symbol: string;
  price: number;
  changePercent: number;
  deliveryQuantity: number;
  deliveryPercent: number;
}

export interface FutureStock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  expiryDate: string;
  type: 'Current' | 'Next';
  premium: number;
  deliveryVolume: number;
  action: 'Buying' | 'Selling' | 'Neutral';
}