
import React, { useState, useMemo } from 'react';
import { MARKET_STATUS_DATA, MarketStatItem } from '../data/marketStatusData.ts';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip as ReTooltip 
} from 'recharts';
import { 
  Globe, Activity, Search, ArrowUpDown, 
  ChevronDown, ChevronUp, Info, BarChart3, TrendingUp, Users, Target 
} from 'lucide-react';

const COLORS = ['#1e3a8a', '#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bae6fd', '#0ea5e9'];

type SortKey = 'patrimonio' | 'aderenti' | 'marketShare' | 'growth' | 'iscMedio';

const MarketStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FPN' | 'FPA' | 'PIP' | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('patrimonio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const all = MARKET_STATUS_DATA;
    return {
      aum: all.reduce((acc, curr) => acc + curr.patrimonio, 0),
      adherents: all.reduce((acc, curr) => acc + curr.aderenti, 0),
      count: all.length,
      avgIsc: all.reduce((acc, curr) => acc + curr.iscMedio, 0) / all.length
    };
  }, []);

  const chartData = useMemo(() => {
    return MARKET_STATUS_DATA
      .filter(item => activeTab === 'ALL' || item.category === activeTab)
      .sort((a, b) => b.patrimonio - a.patrimonio)
      .slice(0, 8)
      .map(item => ({
        name: item.provider,
        value: item.patrimonio,
        share: item.marketShare
      }));
  }, [activeTab]);

  const filteredData = useMemo(() => {
    let data = MARKET_STATUS_DATA.filter(item => 
      (activeTab === 'ALL' || item.category === activeTab) &&
      (item.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.nomeProdotto?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    data.sort((a, b) => {
      const valA = a[sortKey] || 0;
      const valB = b[sortKey] || 0;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return data;
  }, [activeTab, searchTerm, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', notation: 'compact' }).format(val * 1000000);

  const formatNumber = (val: number) => 
    new Intl.NumberFormat('it-IT', { notation: 'compact' }).format(val);

  return (
    <div className="max-w-full mx-auto space-y-6 md:space-y-10 animate-fade-in pb-24 md:pb-20 px-2 md:px-0">
      {/* Summary Dashboard */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="col-span-2 bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Globe className="text-blue-400" size={18} />
              <h2 className="text-sm md:text-xl font-black uppercase tracking-tighter italic">Mercato <span className="text-blue-400">Integrale</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-1">
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Patrimonio Totale (AUM)</p>
                <p className="text-xl md:text-4xl font-black text-white italic">{formatCurrency(totals.aum)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Entità Censite</p>
                <p className="text-xl md:text-4xl font-black text-white italic">{totals.count}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-[2rem] p-4 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-blue-100 p-2 md:p-3 rounded-xl text-blue-600"><BarChart3 size={16}/></div>
            <span className="text-[8px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full italic">Audit 2025</span>
          </div>
          <div>
            <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Costo Medio (ISC)</p>
            <p className="text-sm md:text-2xl font-black text-slate-900">{totals.avgIsc.toFixed(2)}%</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-4 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="bg-emerald-100 p-2 md:p-3 rounded-xl text-emerald-600"><Users size={16}/></div>
          <div>
            <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Forza Sociale (Aderenti)</p>
            <p className="text-sm md:text-2xl font-black text-emerald-600 uppercase italic">{formatNumber(totals.adherents)}</p>
          </div>
        </div>
      </section>

      <div className="grid xl:grid-cols-12 gap-6 md:gap-10">
        {/* Left Stats */}
        <div className="xl:col-span-3 space-y-6">
           <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 md:sticky md:top-24">
              <div className="space-y-1">
                <h3 className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic">
                  <TrendingUp size={16} className="text-blue-600" /> Top Concentrazione
                </h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Distribuzione Prime 8 Entità</p>
              </div>
              
              <div className="h-44 md:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
                      ))}
                    </Pie>
                    <ReTooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', fontSize: '10px', fontWeight: 'bold'}}
                      formatter={(val: number) => `€${val.toLocaleString()}M`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-2">
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                      <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase truncate">{item.name}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-900 shrink-0">{item.share}%</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                 <div className="flex items-center gap-2 text-blue-600">
                    <Target size={14} />
                    <span className="text-[9px] font-black uppercase">Obiettivo Portabilità</span>
                 </div>
                 <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
                   I player con massa elevata e ISC &gt; 2.4% rappresentano il serbatoio primario per la crescita dei mandati Vomero 26.
                 </p>
              </div>
           </div>
        </div>

        {/* The Bibbia Table */}
        <div className="xl:col-span-9 space-y-4 md:space-y-6">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
               <div className="flex p-1 bg-slate-200 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                 {(['ALL', 'FPN', 'PIP'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[9px] font-black uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tab === 'ALL' ? 'Tutto il Mercato' : tab}
                    </button>
                 ))}
               </div>
               
               <div className="relative w-full md:w-80">
                 <input 
                   type="text"
                   placeholder="Cerca tra i 66 player censiti..."
                   className="w-full bg-white border border-slate-200 rounded-xl px-10 py-2.5 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-600"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
               </div>
            </div>

            <div className="hidden md:block overflow-x-auto max-h-[800px] overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse sticky top-0 bg-white z-10">
                <thead className="bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest sticky top-0">
                  <tr>
                    <th className="px-6 py-5 border-b border-white/10 sticky left-0 bg-slate-950 z-20">Soggetto / Prodotto</th>
                    <th className="px-4 py-5 border-b border-white/10 cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => handleSort('patrimonio')}>
                      AUM (M€) <ArrowUpDown size={10} className="inline ml-1 opacity-50"/>
                    </th>
                    <th className="px-4 py-5 border-b border-white/10 cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => handleSort('aderenti')}>
                      Aderenti <ArrowUpDown size={10} className="inline ml-1 opacity-50"/>
                    </th>
                    <th className="px-4 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => handleSort('iscMedio')}>
                      ISC Costo <ArrowUpDown size={10} className="inline ml-1 opacity-50"/>
                    </th>
                    <th className="px-4 py-5 border-b border-white/10 text-center bg-blue-600/20">Mix Comparti (%)</th>
                    <th className="px-6 py-5 border-b border-white/10 text-center">Mkt Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item) => (
                    <tr key={item.id} className={`hover:bg-blue-50/40 transition-colors group ${item.provider.includes('Zurich') ? 'bg-blue-50/70' : ''}`}>
                      <td className="px-6 py-4 sticky left-0 bg-inherit z-10 shadow-[2px_0_10px_-5px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-[11px] uppercase italic flex items-center gap-2">
                            {item.provider}
                            {item.provider.includes('Zurich') && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter truncate max-w-[220px]">{item.nomeProdotto || item.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-black text-slate-700 text-[11px]">€{item.patrimonio.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-slate-600 text-[10px]">{formatNumber(item.aderenti)}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded font-black text-[9px] border ${item.iscMedio > 2.4 ? 'text-red-600 bg-red-50 border-red-100' : item.iscMedio < 0.5 ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100'}`}>
                          {item.iscMedio.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-4">
                         <div className="flex flex-col gap-1 w-40 mx-auto">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                               <div style={{width: `${item.comparti.gar}%`}} className="bg-emerald-500 h-full"></div>
                               <div style={{width: `${item.comparti.bil}%`}} className="bg-blue-500 h-full"></div>
                               <div style={{width: `${item.comparti.azn}%`}} className="bg-indigo-500 h-full"></div>
                            </div>
                            <div className="flex justify-between text-[7px] font-black text-slate-400 uppercase">
                               <span title="Garantito">{item.comparti.gar}%G</span>
                               <span title="Bilanciato">{item.comparti.bil}%B</span>
                               <span title="Azionario">{item.comparti.azn}%A</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-black text-slate-900 text-[10px] italic">{item.marketShare}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredData.map((item) => (
                <div key={item.id} className={`p-4 space-y-4 ${item.provider.includes('Zurich') ? 'bg-blue-50/50 border-l-4 border-blue-600' : ''}`}>
                  <div className="flex justify-between items-start" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-black text-slate-900 uppercase italic leading-none">{item.provider}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase ${item.category === 'PIP' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{item.nomeProdotto}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-black text-blue-600">€{item.patrimonio.toLocaleString()}M</p>
                      <button className="text-slate-300 mt-1">{expandedId === item.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</button>
                    </div>
                  </div>

                  {expandedId === item.id && (
                    <div className="bg-slate-50 rounded-2xl p-4 space-y-4 animate-slide-down border border-slate-200 shadow-inner">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                          <p className="text-[7px] font-black text-slate-400 uppercase">Forza Sociale</p>
                          <p className="text-[11px] font-black text-slate-900">{formatNumber(item.aderenti)}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                          <p className="text-[7px] font-black text-slate-400 uppercase">ISC Medio</p>
                          <p className={`text-[11px] font-black ${item.iscMedio > 2.4 ? 'text-red-600' : 'text-emerald-600'}`}>{item.iscMedio}%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Asset Mix %</p>
                          <span className="text-[8px] font-black text-blue-600 uppercase">Mkt Share: {item.marketShare}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                          <div style={{width: `${item.comparti.gar}%`}} className="bg-emerald-500 h-full"></div>
                          <div style={{width: `${item.comparti.bil}%`}} className="bg-blue-500 h-full"></div>
                          <div style={{width: `${item.comparti.azn}%`}} className="bg-indigo-500 h-full"></div>
                        </div>
                        <div className="grid grid-cols-3 text-center text-[8px] font-black uppercase">
                          <div className="space-y-0.5">
                             <p className="text-emerald-600">Gar.</p>
                             <p className="text-slate-900 text-[10px]">{item.comparti.gar}%</p>
                          </div>
                          <div className="space-y-0.5 border-x border-slate-200">
                             <p className="text-blue-600">Bil.</p>
                             <p className="text-slate-900 text-[10px]">{item.comparti.bil}%</p>
                          </div>
                          <div className="space-y-0.5">
                             <p className="text-indigo-600">Azn.</p>
                             <p className="text-slate-900 text-[10px]">{item.comparti.azn}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center shadow-2xl border border-slate-800">
             <div className="bg-blue-600 p-4 rounded-2xl text-white shrink-0 shadow-lg shadow-blue-500/20">
               <Info size={28} />
             </div>
             <div className="space-y-2">
                <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest italic flex items-center gap-2">
                  Market Audit Intelligence <span className="text-[8px] bg-slate-800 text-white px-2 py-0.5 rounded-full border border-slate-700">66 Records Active</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  Il database "Bibbia" integra i dati COVIP 2024 per fornire al consulente Vomero la mappatura completa dei 33 Fondi Negoziali (FPN) e dei 33 PIP di mercato. L'evidenza dei costi ISC &gt; 2.50% su masse consolidate (es. Poste, Alleanza) costituisce l'argomento tecnico principale per lo switch verso l'efficienza Zurich (ISC 2.10%).
                </p>
             </div>
          </div>
        </div>
      </div>

      <footer className="text-center pt-10 border-t border-slate-200">
        <div className="flex justify-center gap-12 opacity-30 mb-6 grayscale">
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">COVIP CERTIFIED</span>
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">MARKET DATA 2025</span>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] px-4">
          Terminal Intelligence Vomero 26 | Database Statistico Integrale 66 Player | Elaborazione Dr. Raffaele Camposano
        </p>
      </footer>
    </div>
  );
};

export default MarketStats;
