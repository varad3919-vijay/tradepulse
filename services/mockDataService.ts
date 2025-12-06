import { Stock, MarketIndex, SectorPerformance, FIIDIIData, TrendGroup, OptionChainData, OptionStrike, DeliveryStock, FutureStock } from '../types';

// Initial Mock Data
const INITIAL_STOCKS: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2450.00, change: 12.5, changePercent: 0.51, volume: 5000000, high: 2460, low: 2440, open: 2445, prevClose: 2437.5, sector: 'Energy' },
  { symbol: 'TCS', name: 'Tata Consultancy Svcs', price: 3500.00, change: -15.0, changePercent: -0.43, volume: 1200000, high: 3520, low: 3480, open: 3515, prevClose: 3515, sector: 'IT' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1650.00, change: 8.0, changePercent: 0.49, volume: 3000000, high: 1660, low: 1640, open: 1642, prevClose: 1642, sector: 'Finance' },
  { symbol: 'INFY', name: 'Infosys', price: 1420.00, change: 5.5, changePercent: 0.39, volume: 2500000, high: 1430, low: 1410, open: 1415, prevClose: 1414.5, sector: 'IT' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 950.00, change: -2.0, changePercent: -0.21, volume: 4500000, high: 960, low: 945, open: 955, prevClose: 952, sector: 'Finance' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 580.00, change: 6.0, changePercent: 1.05, volume: 8000000, high: 585, low: 570, open: 572, prevClose: 574, sector: 'Finance' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 890.00, change: 4.5, changePercent: 0.51, volume: 1500000, high: 895, low: 880, open: 885, prevClose: 885.5, sector: 'Telecom' },
  { symbol: 'ITC', name: 'ITC Ltd', price: 445.00, change: -1.5, changePercent: -0.34, volume: 6000000, high: 450, low: 440, open: 448, prevClose: 446.5, sector: 'FMCG' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1800.00, change: -10.0, changePercent: -0.55, volume: 1000000, high: 1820, low: 1790, open: 1815, prevClose: 1810, sector: 'Finance' },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 2900.00, change: 25.0, changePercent: 0.87, volume: 800000, high: 2920, low: 2880, open: 2885, prevClose: 2875, sector: 'Construction' },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 980.00, change: 9.0, changePercent: 0.93, volume: 2200000, high: 985, low: 970, open: 972, prevClose: 971, sector: 'Finance' },
  { symbol: 'HUL', name: 'Hindustan Unilever', price: 2550.00, change: -5.0, changePercent: -0.20, volume: 500000, high: 2570, low: 2540, open: 2560, prevClose: 2555, sector: 'FMCG' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 620.00, change: 12.0, changePercent: 1.97, volume: 9500000, high: 625, low: 605, open: 608, prevClose: 608, sector: 'Auto' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 9500.00, change: -45.0, changePercent: -0.47, volume: 200000, high: 9600, low: 9450, open: 9550, prevClose: 9545, sector: 'Auto' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1150.00, change: 8.5, changePercent: 0.74, volume: 1100000, high: 1160, low: 1140, open: 1145, prevClose: 1141.5, sector: 'Pharma' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7200.00, change: 50.0, changePercent: 0.70, volume: 400000, high: 7250, low: 7150, open: 7180, prevClose: 7150, sector: 'Finance' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3200.00, change: -12.0, changePercent: -0.37, volume: 600000, high: 3230, low: 3180, open: 3220, prevClose: 3212, sector: 'Consumer' },
  { symbol: 'TITAN', name: 'Titan Company', price: 3000.00, change: 15.0, changePercent: 0.50, volume: 700000, high: 3020, low: 2980, open: 2990, prevClose: 2985, sector: 'Consumer' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 8200.00, change: 40.0, changePercent: 0.49, volume: 150000, high: 8250, low: 8150, open: 8180, prevClose: 8160, sector: 'Materials' },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2400.00, change: -50.0, changePercent: -2.04, volume: 3500000, high: 2480, low: 2350, open: 2460, prevClose: 2450, sector: 'Metals' },
  { symbol: 'WIPRO', name: 'Wipro', price: 405.00, change: -2.5, changePercent: -0.61, volume: 1800000, high: 410, low: 400, open: 408, prevClose: 407.5, sector: 'IT' },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1180.00, change: 10.0, changePercent: 0.85, volume: 900000, high: 1190, low: 1170, open: 1175, prevClose: 1170, sector: 'IT' },
  { symbol: 'NTPC', name: 'NTPC Ltd', price: 220.00, change: 3.0, changePercent: 1.38, volume: 10000000, high: 222, low: 218, open: 219, prevClose: 217, sector: 'Energy' },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', price: 245.00, change: 1.5, changePercent: 0.61, volume: 8000000, high: 247, low: 243, open: 244, prevClose: 243.5, sector: 'Energy' },
];

export const generateMockStocks = (): Stock[] => {
  return INITIAL_STOCKS.map(stock => {
    // Random fluctuation
    const volatility = stock.price * 0.0005; 
    const change = (Math.random() - 0.5) * volatility;
    let newPrice = stock.price + change;
    
    // Ensure logical high/low updates
    const newHigh = Math.max(stock.high, newPrice);
    const newLow = Math.min(stock.low, newPrice);
    
    const priceChange = newPrice - stock.prevClose;
    const changePercent = (priceChange / stock.prevClose) * 100;

    // Simulate Open Interest (OI)
    const mockOI = 1000000 + Math.random() * 5000000;
    const mockOIChange = (Math.random() - 0.5) * 10; // -5% to +5%

    // Determine Trend (Position)
    let trend: Stock['trend'] = undefined;
    if (changePercent > 0 && mockOIChange > 0) trend = 'Long Build Up';
    else if (changePercent < 0 && mockOIChange > 0) trend = 'Short Build Up';
    else if (changePercent < 0 && mockOIChange < 0) trend = 'Long Unwinding';
    else if (changePercent > 0 && mockOIChange < 0) trend = 'Short Covering';

    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      high: parseFloat(newHigh.toFixed(2)),
      low: parseFloat(newLow.toFixed(2)),
      change: parseFloat(priceChange.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: stock.volume + Math.floor(Math.random() * 1000),
      openInterest: Math.floor(mockOI),
      oiChangePercent: parseFloat(mockOIChange.toFixed(2)),
      trend
    };
  });
};

export const getSectorPerformance = (stocks: Stock[]): SectorPerformance[] => {
  const sectorMap = new Map<string, { totalChange: number, count: number }>();
  
  stocks.forEach(stock => {
    if (!sectorMap.has(stock.sector)) {
      sectorMap.set(stock.sector, { totalChange: 0, count: 0 });
    }
    const data = sectorMap.get(stock.sector)!;
    data.totalChange += stock.changePercent;
    data.count += 1;
  });

  return Array.from(sectorMap.entries()).map(([name, data]) => ({
    name,
    changePercent: parseFloat((data.totalChange / data.count).toFixed(2))
  })).sort((a, b) => b.changePercent - a.changePercent);
};

export const getMarketIndices = (stocks: Stock[]): MarketIndex[] => {
  const niftyChange = stocks.reduce((acc, stock) => acc + stock.changePercent, 0) / stocks.length;
  const bankNiftyStocks = stocks.filter(s => s.sector === 'Finance');
  const bankNiftyChange = bankNiftyStocks.reduce((acc, stock) => acc + stock.changePercent, 0) / bankNiftyStocks.length;

  return [
    { name: 'NIFTY 50', value: 22500 + (niftyChange * 100), change: niftyChange * 100, changePercent: niftyChange },
    { name: 'BANK NIFTY', value: 48000 + (bankNiftyChange * 100), change: bankNiftyChange * 100, changePercent: bankNiftyChange },
    { name: 'SENSEX', value: 74000 + (niftyChange * 200), change: niftyChange * 200, changePercent: niftyChange * 0.9 },
    { name: 'INDIA VIX', value: 12.5 + (Math.random() * 0.5), change: 0.1, changePercent: 0.8 }, 
  ];
};

export const getFIIDIIData = (): FIIDIIData[] => {
  return [
    { category: 'FII Cash', buyValue: 8500.45, sellValue: 9200.10, netValue: -699.65 },
    { category: 'DII Cash', buyValue: 7800.20, sellValue: 6500.80, netValue: 1299.40 },
    { category: 'FII Index Fut', buyValue: 3200.00, sellValue: 2800.00, netValue: 400.00 },
    { category: 'FII Index Opt', buyValue: 15000.00, sellValue: 14200.00, netValue: 800.00 },
  ];
};

export const getStockTrends = (stocks: Stock[]): TrendGroup[] => {
  const trends: Record<string, TrendGroup> = {
    'Long Build Up': { name: 'Long Build Up', count: 0, color: 'text-green-500', stocks: [] },
    'Short Build Up': { name: 'Short Build Up', count: 0, color: 'text-red-500', stocks: [] },
    'Short Covering': { name: 'Short Covering', count: 0, color: 'text-yellow-400', stocks: [] },
    'Long Unwinding': { name: 'Long Unwinding', count: 0, color: 'text-orange-500', stocks: [] }
  };

  stocks.forEach(stock => {
    if (stock.trend && trends[stock.trend]) {
      trends[stock.trend].count++;
      trends[stock.trend].stocks.push(stock);
    }
  });

  Object.values(trends).forEach(group => {
    group.stocks.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  });

  return Object.values(trends);
};

// Option Chain Generator
export const getOptionChainData = (symbol: string, spotPrice: number): OptionChainData => {
  // NIFTY usually has 50 strike interval, BANK NIFTY has 100
  const step = symbol === 'BANK NIFTY' ? 100 : 50;
  const atmStrike = Math.round(spotPrice / step) * step;
  const strikes: OptionStrike[] = [];
  
  // Generate 5 strikes above and 5 below ATM
  for (let i = -5; i <= 5; i++) {
    const strikePrice = atmStrike + (i * step);
    
    // Simulate data logic
    const distFromAtm = Math.abs(i);
    const baseOI = 2000000 - (distFromAtm * 200000); // Higher OI near ATM usually, but let's tweak for support/resistance
    
    // Calls
    let callOI = baseOI * (Math.random() * 0.5 + 0.8);
    // Add a Resistance (Max Call Writer) at +4 strikes (OTM)
    if (i === 4) callOI = 4500000; 
    
    // Puts
    let putOI = baseOI * (Math.random() * 0.5 + 0.8);
    // Add a Support (Max Put Writer) at -3 strikes (OTM for Puts)
    if (i === -3) putOI = 4800000;

    const callLTP = Math.max(0.05, (spotPrice - strikePrice) + (Math.random() * 50 * Math.exp(-distFromAtm/3))); 
    const putLTP = Math.max(0.05, (strikePrice - spotPrice) + (Math.random() * 50 * Math.exp(-distFromAtm/3)));

    strikes.push({
      strikePrice,
      callOI: Math.floor(callOI),
      callChangeOI: Math.floor((Math.random() - 0.4) * 100000),
      callLTP: parseFloat(Math.max(0, i < 0 ? (spotPrice - strikePrice) + 100 : 100 - (i * 20)).toFixed(2)), // Simple pricing curve
      callChange: parseFloat(((Math.random() - 0.5) * 10).toFixed(2)),
      putOI: Math.floor(putOI),
      putChangeOI: Math.floor((Math.random() - 0.4) * 100000),
      putLTP: parseFloat(Math.max(0, i > 0 ? (strikePrice - spotPrice) + 100 : 100 - (Math.abs(i) * 20)).toFixed(2)),
      putChange: parseFloat(((Math.random() - 0.5) * 10).toFixed(2)),
    });
  }

  // Calculate Totals and Max
  let totalCallOI = 0;
  let totalPutOI = 0;
  let maxCallOI = 0;
  let maxCallOIStrike = 0;
  let maxPutOI = 0;
  let maxPutOIStrike = 0;

  strikes.forEach(s => {
    totalCallOI += s.callOI;
    totalPutOI += s.putOI;
    
    if (s.callOI > maxCallOI) {
      maxCallOI = s.callOI;
      maxCallOIStrike = s.strikePrice;
    }
    if (s.putOI > maxPutOI) {
      maxPutOI = s.putOI;
      maxPutOIStrike = s.strikePrice;
    }
  });

  return {
    symbol: symbol,
    spotPrice,
    pcr: parseFloat((totalPutOI / totalCallOI).toFixed(2)),
    maxCallOI,
    maxCallOIStrike,
    maxPutOI,
    maxPutOIStrike,
    strikes
  };
};

// High Delivery Stocks
export const getHighDeliveryStocks = (stocks: Stock[]): DeliveryStock[] => {
  // Sort by volume and pick top 5
  return stocks
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)
    .map(stock => ({
      symbol: stock.symbol,
      price: stock.price,
      changePercent: stock.changePercent,
      deliveryQuantity: Math.floor(stock.volume * (0.4 + Math.random() * 0.3)), // 40-70% delivery
      deliveryPercent: parseFloat((40 + Math.random() * 30).toFixed(2))
    }));
};

// Stock Futures (Current & Next Month)
export const getStockFutures = (stocks: Stock[]): FutureStock[] => {
  // Pick a few liquid stocks
  const liquidStocks = stocks.filter(s => ['RELIANCE', 'HDFCBANK', 'INFY', 'SBIN', 'TATAMOTORS'].includes(s.symbol));
  const futures: FutureStock[] = [];

  const currentMonth = new Date().toLocaleString('default', { month: 'short' }).toUpperCase();
  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'short' }).toUpperCase();

  liquidStocks.forEach(stock => {
    // Logic for Action (Buying/Selling)
    // If stock up -> Buying, if down -> Selling (simplified)
    const action = stock.changePercent > 0 ? 'Buying' : 'Selling';
    const deliveryVolCurrent = Math.floor(Math.random() * 1000000) + 200000;
    const deliveryVolNext = Math.floor(Math.random() * 500000) + 100000;

    // Current Month
    futures.push({
      symbol: stock.symbol,
      price: parseFloat((stock.price + (Math.random() * 2)).toFixed(2)), // Slightly premium
      change: stock.change,
      changePercent: stock.changePercent,
      expiryDate: `28 ${currentMonth}`,
      type: 'Current',
      premium: parseFloat((Math.random() * 2).toFixed(2)),
      deliveryVolume: deliveryVolCurrent,
      action: action
    });
    // Next Month
    futures.push({
      symbol: stock.symbol,
      price: parseFloat((stock.price + (Math.random() * 5 + 2)).toFixed(2)), // Higher premium
      change: stock.change,
      changePercent: stock.changePercent,
      expiryDate: `25 ${nextMonth}`,
      type: 'Next',
      premium: parseFloat((Math.random() * 5 + 2).toFixed(2)),
      deliveryVolume: deliveryVolNext,
      action: action
    });
  });

  return futures;
};