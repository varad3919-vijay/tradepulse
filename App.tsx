import React, { useState, useEffect } from 'react';
import { Stock, MarketIndex, SectorPerformance as ISectorPerformance, FIIDIIData, TrendGroup, TabView, OptionChainData, DeliveryStock, FutureStock } from './types';
import { generateMockStocks, getMarketIndices, getSectorPerformance, getFIIDIIData, getStockTrends, getOptionChainData, getHighDeliveryStocks, getStockFutures } from './services/mockDataService';
import StockTable from './components/StockTable';
import MarketBreadth from './components/MarketBreadth';
import SectorPerformance from './components/SectorPerformance';
import AIInsights from './components/AIInsights';
import FIIDIIDashboard from './components/FIIDIIDashboard';
import MarketTrend from './components/MarketTrend';
import OptionDashboard from './components/OptionDashboard';
import DeliveryVolumeWidget from './components/DeliveryVolumeWidget';
import FuturesWidget from './components/FuturesWidget';
import { SearchIcon } from './components/Icons';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [sectors, setSectors] = useState<ISectorPerformance[]>([]);
  const [fiiDiiData, setFiiDiiData] = useState<FIIDIIData[]>([]);
  const [trends, setTrends] = useState<TrendGroup[]>([]);
  
  // Option Chain States
  const [niftyOptionChain, setNiftyOptionChain] = useState<OptionChainData | null>(null);
  const [bankNiftyOptionChain, setBankNiftyOptionChain] = useState<OptionChainData | null>(null);
  const [selectedOptionSymbol, setSelectedOptionSymbol] = useState<'NIFTY 50' | 'BANK NIFTY'>('NIFTY 50');

  const [deliveryStocks, setDeliveryStocks] = useState<DeliveryStock[]>([]);
  const [futures, setFutures] = useState<FutureStock[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);

  // Simulation Engine
  useEffect(() => {
    // Initial fetch
    const refreshData = () => {
      const newStocks = generateMockStocks();
      const newIndices = getMarketIndices(newStocks);
      
      setStocks(newStocks);
      setIndices(newIndices);
      setSectors(getSectorPerformance(newStocks));
      setFiiDiiData(getFIIDIIData());
      setTrends(getStockTrends(newStocks));
      
      // Get NIFTY 50 Value for Option Chain Mock
      const niftyValue = newIndices.find(i => i.name === 'NIFTY 50')?.value || 22500;
      setNiftyOptionChain(getOptionChainData('NIFTY 50', niftyValue));

      // Get BANK NIFTY Value for Option Chain Mock
      const bankNiftyValue = newIndices.find(i => i.name === 'BANK NIFTY')?.value || 48000;
      setBankNiftyOptionChain(getOptionChainData('BANK NIFTY', bankNiftyValue));
      
      // New Data Feeds
      setDeliveryStocks(getHighDeliveryStocks(newStocks));
      setFutures(getStockFutures(newStocks));
      
      setLastUpdate(new Date());
    };

    refreshData();

    // Live update interval
    const interval = setInterval(refreshData, 3000); // Slower update for better readability
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-trade-bg text-trade-text font-sans pb-10">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-trade-card/80 backdrop-blur-md border-b border-trade-border shadow-xl">
        <div className="max-w-[1800px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(TabView.DASHBOARD)}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/20">
                T
              </div>
              <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                TradePulse <span className="text-trade-accent font-light">Pro</span>
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1 bg-trade-bg/50 p-1 rounded-lg border border-trade-border">
              {Object.values(TabView).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-trade-muted hover:text-white hover:bg-trade-card'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <input 
                type="text" 
                placeholder="Search Symbol..." 
                className="bg-trade-bg border border-trade-border rounded-lg px-4 py-2 pl-10 text-sm w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
              />
              <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-trade-muted group-focus-within:text-blue-500" />
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-green-400 flex items-center gap-1 font-bold tracking-wider">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-green"></span>
                 MARKET OPEN
               </span>
               <span className="text-[10px] text-trade-muted">
                 Last updated: {lastUpdate.toLocaleTimeString()}
               </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Ticker Tape */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-trade-border h-10 overflow-hidden flex items-center">
        <div className="animate-[scroll_40s_linear_infinite] whitespace-nowrap flex gap-8 px-4 hover:pause">
          {[...indices, ...stocks].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono cursor-pointer hover:bg-white/5 px-2 rounded">
              <span className="font-bold text-gray-300">
                {'symbol' in item ? item.symbol : item.name}
              </span>
              <span className={item.change >= 0 ? 'text-trade-up' : 'text-trade-down'}>
                {'price' in item ? item.price : item.value.toFixed(2)}
              </span>
              <span className={`text-[10px] ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.changePercent >= 0 ? '▲' : '▼'} {Math.abs(item.changePercent).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 py-6 space-y-6">
        
        {activeTab === TabView.DASHBOARD && (
          <>
            {/* Row 1: Market Indices Highlight */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {indices.map((index) => (
                <div key={index.name} className="relative overflow-hidden bg-trade-card rounded-xl p-5 border border-trade-border hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${index.change >= 0 ? 'from-green-500/10' : 'from-red-500/10'} to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
                  <div className="relative z-10">
                    <div className="text-trade-muted text-xs font-bold uppercase tracking-wider mb-2">{index.name}</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold font-mono ${index.change >= 0 ? 'text-white' : 'text-white'}`}>
                        {index.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm font-bold ${index.change >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${index.changePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {index.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Breadth, FII/DII, AI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                 <MarketBreadth stocks={stocks} />
              </div>
              <div className="lg:col-span-5">
                 <FIIDIIDashboard data={fiiDiiData} />
              </div>
              <div className="lg:col-span-4">
                 <AIInsights stocks={stocks} />
              </div>
            </div>

            {/* Row 3: Stock Positions / F&O Trends */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">Stock Positions</h2>
                <span className="text-xs bg-trade-accent px-2 py-0.5 rounded text-white">F&O Trends</span>
              </div>
              <MarketTrend trends={trends} />
            </div>

            {/* Row 4: New Dashboard Widgets (High Delivery & Futures) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DeliveryVolumeWidget stocks={deliveryStocks} />
                <FuturesWidget futures={futures} />
            </div>

            {/* Row 5: Data Tables & Sectors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Detailed Tables */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[450px]">
                  <StockTable title="Top Gainers" stocks={stocks} filter="GAINERS" showOI={true} />
                  <StockTable title="Top Losers" stocks={stocks} filter="LOSERS" showOI={true} />
                </div>
                
                <div className="bg-trade-card rounded-lg border border-trade-border p-0 overflow-hidden shadow-xl">
                   <div className="p-4 border-b border-trade-border flex justify-between items-center bg-slate-800/50">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-trade-accent rounded-full"></span>
                        Market Watch
                      </h2>
                      <div className="flex gap-2">
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded transition-colors shadow-lg shadow-blue-500/20">All Stocks</button>
                        <button className="text-xs bg-trade-bg hover:bg-slate-700 text-trade-muted px-3 py-1 rounded transition-colors">Watchlist</button>
                      </div>
                   </div>
                   <div className="h-[400px]">
                      <StockTable title="" stocks={stocks} filter="ALL" showOI={true} />
                   </div>
                </div>
              </div>

              {/* Right: Sectors & Info */}
              <div className="lg:col-span-4 space-y-6">
                 <SectorPerformance data={sectors} />
                 
                 {/* Info Widget */}
                 <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-trade-border rounded-lg p-5">
                    <h4 className="text-trade-text font-bold text-sm mb-3 flex items-center gap-2">
                      <span className="text-yellow-500">⚡</span> Live Market Commentary
                    </h4>
                    <div className="space-y-3">
                      <div className="text-xs text-trade-muted border-l-2 border-green-500 pl-3">
                        <span className="text-white font-semibold">10:30 AM:</span> Banking sector showing strong momentum led by HDFC Bank.
                      </div>
                      <div className="text-xs text-trade-muted border-l-2 border-red-500 pl-3">
                        <span className="text-white font-semibold">10:15 AM:</span> IT stocks facing resistance near daily highs.
                      </div>
                      <div className="text-xs text-trade-muted border-l-2 border-blue-500 pl-3">
                        <span className="text-white font-semibold">09:45 AM:</span> Nifty 50 opens with a gap up, sustaining above 22,000.
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </>
        )}

        {activeTab === TabView.OPTIONS && (
          <div className="space-y-4">
            <div className="flex justify-center">
               <div className="bg-trade-card border border-trade-border p-1 rounded-lg flex gap-1 shadow-lg">
                 <button 
                   onClick={() => setSelectedOptionSymbol('NIFTY 50')}
                   className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                     selectedOptionSymbol === 'NIFTY 50' 
                     ? 'bg-blue-600 text-white shadow-md' 
                     : 'text-trade-muted hover:text-white hover:bg-trade-cardHover'
                   }`}
                 >
                   NIFTY 50
                 </button>
                 <button 
                   onClick={() => setSelectedOptionSymbol('BANK NIFTY')}
                   className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                     selectedOptionSymbol === 'BANK NIFTY' 
                     ? 'bg-blue-600 text-white shadow-md' 
                     : 'text-trade-muted hover:text-white hover:bg-trade-cardHover'
                   }`}
                 >
                   BANK NIFTY
                 </button>
               </div>
            </div>
            {/* Display Selected Chain */}
            {selectedOptionSymbol === 'NIFTY 50' && niftyOptionChain && (
               <OptionDashboard data={niftyOptionChain} />
            )}
            {selectedOptionSymbol === 'BANK NIFTY' && bankNiftyOptionChain && (
               <OptionDashboard data={bankNiftyOptionChain} />
            )}
          </div>
        )}

        {(activeTab === TabView.SCREENER || activeTab === TabView.NEWS) && (
          <div className="flex items-center justify-center h-64 text-trade-muted bg-trade-card rounded-lg border border-trade-border">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p>This module is currently under development.</p>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .box-shadow-green {
          box-shadow: 0 0 10px #22c55e;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default App;