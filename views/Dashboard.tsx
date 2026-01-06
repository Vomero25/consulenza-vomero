
import React, { useMemo } from 'react';
import { PENSION_DATA } from '../data/pensionData.ts';
import { MARKET_STATUS_DATA } from '../data/marketStatusData.ts';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ShieldCheck, TrendingUp, Users, Target, Zap, ArrowRight, Briefcase } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const topPerformers = useMemo(() => [...PENSION_DATA]
    .sort((a, b) => b.return2024 - a.return2024)
    .slice(0, 6), []);

  const marketStats = useMemo(() => {
    const totalAUM = MARKET_STATUS_DATA.reduce((acc, curr) => acc + curr.patrimonio, 0);
    const totalAderenti = MARKET_STATUS_DATA.reduce((acc, curr) => acc + curr.aderenti, 0);
    return { totalAUM, totalAderenti };
  }, []);

  const categoryISC = [
    { name: 'FPN', value: 0.35, color: '#10b981' },
    { name: 'FPA', value: 1.22, color: '#3b82f6' },
    { name: 'PIP', value: 2.48, color: '#f43f5e' }
  ];

  return (
    <div className="max-w-full mx-auto space-y-6 md:space-y-10 animate-fade-in pb-20">
      {/* Executive Command Header - GRUPPO VOMERO BRANDING */}
      <header className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl"><Zap size={24} className="text-white"/></div>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-400">Gruppo Vomero Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
              Pension Advisor <span className="text-blue-500">- Gruppo Vomero</span>
            </h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xl">
              Sistema di supporto decisionale d'élite. Editing: Dr. Raffaele Camposano Group Manager.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] border-l-4 border-l-blue-500 w-full lg:w-auto">
             <div className="grid grid-cols-2 gap-8 lg:gap-12">
                <div>
                   <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">AUM Totale Analizzato</p>
                   <p className="text-2xl md:text-3xl font-black italic">€{(marketStats.totalAUM/1000).toFixed(1)}B</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Aderenti Censiti</p>
                   <p className="text-2xl md:text-3xl font-black italic">{(marketStats.totalAderenti/1000000).toFixed(1)}M</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Actionable KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all border-b-4 border-b-blue-600">
          <div className="flex justify-between items-start mb-4">
             <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Target size={20}/></div>
             <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Audit Mode</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Delta ISC Medio PIP vs Audit</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">0.38%</p>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium italic">Vantaggio competitivo immediato su portabilità mandati legacy.</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all border-b-4 border-b-emerald-600">
          <div className="flex justify-between items-start mb-4">
             <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><TrendingUp size={20}/></div>
             <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Market Peak</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Miglior Rendimento PIP 2024</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">19.85%</p>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium italic">Riferimento mercato (Analisi Dr. Camposano)</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl group hover:shadow-xl transition-all text-white border-b-4 border-b-amber-500">
          <div className="flex justify-between items-start mb-4">
             <div className="bg-amber-500 p-3 rounded-2xl text-white"><Briefcase size={20}/></div>
             <NavLink to="/bilancio-2026" className="text-[10px] font-black text-amber-500 bg-white/10 px-3 py-1 rounded-full uppercase flex items-center gap-1">Update 2026 <ArrowRight size={10}/></NavLink>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deducibilità Massima</p>
          <p className="text-4xl font-black text-white tracking-tighter">€5.300</p>
          <p className="text-[10px] text-blue-300 mt-4 leading-relaxed font-black uppercase italic">Utilizzo benefici Legge di Bilancio 2026.</p>
        </div>
      </section>

      {/* Advanced Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 italic">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> Ranking Rendimenti 2024
            </h3>
            <NavLink to="/comparison" className="text-[10px] font-black text-blue-600 uppercase hover:underline">Vedi Tutti</NavLink>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPerformers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="lineName" 
                  type="category" 
                  width={120} 
                  tick={{ fontSize: 9, fontWeight: 800, fill: '#64748b' }} 
                  tickFormatter={(val) => val.split(' ')[0]}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                />
                <Bar dataKey="return2024" radius={[0, 10, 10, 0]} barSize={28}>
                  {topPerformers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.provider.includes('Zurich') ? '#2563eb' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-10">
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 italic">
              <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div> Benchmarking Costi (ISC)
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase">Media COVIP 2025</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryISC}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: '#64748b' }} />
                <YAxis unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={60}>
                  {categoryISC.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Footer Branding - UPDATED AS REQUESTED */}
      <footer className="text-center pt-10 border-t border-slate-200">
        <div className="flex items-center justify-center gap-3 mb-4">
           <ShieldCheck className="text-blue-600" size={20} />
           <p className="text-[10px] text-slate-900 font-black uppercase tracking-[0.4em] italic">Intelligence System Napoli Vomero</p>
        </div>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          Proprietà riservata Gruppo Vomero | editing : dr.Raffael Camposano Group Manager
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
