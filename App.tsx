import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Comparison from './views/Comparison';
import Bilancio2026 from './views/Bilancio2026';
import MarketStats from './views/MarketStats';
import FiscalCalculator from './views/FiscalCalculator';

// 1. Configurazione Voci di Navigazione (AUDIT TFR Rimosso)
const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/market-stats', label: 'Mercato', icon: '📈' },
  { path: '/comparison', label: 'Confronto', icon: '⚖️' },
  { path: '/bilancio-2026', label: 'Legge 2026', icon: '📜' },
  { path: '/calculator', label: 'Fiscale', icon: '🧮' },
];

// 2. Componente Sidebar Desktop (Definito qui per evitare errori di import)
const DesktopSidebar: React.FC = () => (
  <div className="hidden lg:flex w-72 bg-slate-950 text-white min-h-screen fixed left-0 top-0 p-8 flex-col z-50 border-r border-slate-800">
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">V</div>
        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Gruppo <span className="text-blue-500">Vomero</span></h1>
      </div>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Advanced Pension Advisor</p>
    </div>
    <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
              isActive 
                ? 'bg-blue-600 text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)]' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`
          }
        >
          <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
          <span className="font-bold text-[11px] uppercase tracking-widest">{item.label}</span>
        </NavLink>
      ))}
    </nav>
    <div className="mt-auto pt-8 border-t border-slate-900">
      <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-xs font-black shadow-lg italic">RC</div>
        <div className="overflow-hidden">
          <p className="text-sm font-black truncate text-white uppercase tracking-tight italic">R. Camposano</p>
          <p className="text-[9px] text-blue-500 uppercase font-black tracking-widest">Group Manager</p>
        </div>
      </div>
    </div>
  </div>
);

// 3. Navigazione Mobile
const MobileBottomNav: React.FC = () => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800 flex justify-around items-center px-2 py-4 z-50 shadow-2xl">
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 min-w-[65px] transition-all duration-300 ${
            isActive ? 'text-blue-500 scale-110' : 'text-slate-500'
          }`
        }
      >
        <span className="text-xl">{item.icon}</span>
        <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

// 4. Componente Principale App
const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
        <DesktopSidebar />
        <main className="flex-1 p-4 lg:p-12 lg:ml-72 mb-24 lg:mb-0 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market-stats" element={<MarketStats />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/bilancio-2026" element={<Bilancio2026 />} />
            <Route path="/calculator" element={<FiscalCalculator />} />
          </Routes>
        </main>
        <MobileBottomNav />
      </div>
    </HashRouter>
  );
};

export default App;