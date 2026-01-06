
import React, { useState, useMemo } from 'react';
import { PENSION_DATA } from '../data/pensionData';
import { PensionType, LineCategory, PensionLine } from '../types';
import { 
  ArrowUpDown, Zap, TrendingUp, Search, 
  CheckCircle2, AlertCircle, Info, ShieldCheck, Target
} from 'lucide-react';

type SortField = keyof PensionLine;
type SortOrder = 'asc' | 'desc';

const Comparison: React.FC = () => {
  const [activeType, setActiveType] = useState<PensionType | 'ALL'>('ALL');
  const [activeCategory, setActiveCategory] = useState<LineCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('return2024');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [auditMode, setAuditMode] = useState(true);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredData = useMemo(() => {
    return PENSION_DATA.filter(p => {
      const matchesType = activeType === 'ALL' || p.type === activeType;
      const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        p.provider.toLowerCase().includes(searchLower) || 
        p.productName.toLowerCase().includes(searchLower) || 
        p.lineName.toLowerCase().includes(searchLower);
      
      return matchesType && matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const valA = a[sortField] ?? -999;
      const valB = b[sortField] ?? -999;
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [activeType, activeCategory, searchTerm, sortField, sortOrder]);

  const getISCStyle = (isc: number) => {
    if (isc > 2.2) return 'text-rose-600 bg-rose-50 border-rose-200 font-black italic shadow-sm';
    if (isc < 1.0) return 'text-emerald-600 bg-emerald-50 border-emerald-200 font-black';
    return 'text-amber-600 bg-amber-50 border-amber-200 font-bold';
  };

  return (
    <div className="max-w-full mx-auto space-y-4 animate-fade-in pb-20">
      {/* Top Professional Control Bar */}
      <header className="bg-slate-950 rounded-[2.5rem] p-6 shadow-2xl border border-white/5 sticky top-0 z-50">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
                Master <span className="text-blue-500">Audit Ledger</span>
              </h2>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">Data Source: COVIP Docs 2024 | 66 Entities</p>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-3 w-full xl:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Audit Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-9 py-2.5 text-[10px] font-bold uppercase text-white outline-none focus:ring-2 focus:ring-blue-600/50"
              />
            </div>
            
            <select 
              value={activeType} 
              onChange={(e) => setActiveType(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase text-white outline-none appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="ALL" className="bg-slate-900">Tutti i Fondi</option>
              {Object.values(PensionType).map(v => <option key={v} value={v} className="bg-slate-900">{v}</option>)}
            </select>

            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase text-white outline-none appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="ALL" className="bg-slate-900">Tutti i Profili</option>
              {Object.values(LineCategory).map(v => <option key={v} value={v} className="bg-slate-900">{v}</option>)}
            </select>

            <button 
              onClick={() => setAuditMode(!auditMode)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${auditMode ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
            >
              <Target size={14}/> {auditMode ? 'Audit Attivo' : 'Analisi Semplice'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Hardened Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar max-h-[750px] overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead className="bg-slate-950 text-white text-[8px] font-black uppercase tracking-widest sticky top-0 z-40">
              <tr>
                <th className="px-6 py-5 border-b border-white/10 sticky left-0 bg-slate-950 w-[260px] z-50">Soggetto / Prodotto / Linea</th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('category')}>Profilo</th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('return2024')}>2024 <ArrowUpDown size={10} className="inline opacity-30 ml-1"/></th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('return3y')}>3Y <ArrowUpDown size={10} className="inline opacity-30 ml-1"/></th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('return5y')}>5Y <ArrowUpDown size={10} className="inline opacity-30 ml-1"/></th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('return10y')}>10Y <ArrowUpDown size={10} className="inline opacity-30 ml-1"/></th>
                <th className="px-3 py-5 border-b border-white/10 text-center cursor-pointer hover:bg-slate-900" onClick={() => toggleSort('return20y')}>20Y <ArrowUpDown size={10} className="inline opacity-30 ml-1"/></th>
                <th className="px-4 py-5 border-b border-white/10 text-center cursor-pointer bg-blue-600/20 hover:bg-blue-600/30" onClick={() => toggleSort('isc10y')}>ISC Costo <ArrowUpDown size={10} className="inline opacity-50 ml-1"/></th>
                <th className="px-6 py-5 border-b border-white/10 text-center">Outcome Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map(line => {
                const isZurich = line.provider.toLowerCase().includes('zurich');
                const isCritical = line.isc10y > 2.4;
                
                return (
                  <tr 
                    key={line.id}
                    className={`group transition-all ${isZurich ? 'bg-blue-50/70 hover:bg-blue-100 shadow-inner' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 sticky left-0 z-10 bg-inherit border-r border-slate-100 shadow-[2px_0_10px_-5px_rgba(0,0,0,0.1)]">
                      <div className="flex flex-col">
                        <span className={`font-black text-[11px] uppercase italic flex items-center gap-2 ${isZurich ? 'text-blue-600' : 'text-slate-900'}`}>
                          {line.provider}
                          {isZurich && <Zap size={10} className="fill-blue-600 animate-pulse" />}
                        </span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter truncate max-w-[180px]">{line.productName}</span>
                        <span className="text-[8px] font-black text-slate-500 uppercase italic truncate">{line.lineName}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[7px] font-black uppercase border border-slate-100 bg-white">
                        {line.category}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-[11px] font-black text-slate-900">
                       {line.return2024.toFixed(2)}%
                    </td>
                    <td className="px-3 py-4 text-center font-mono text-[10px] text-slate-500">{line.return3y.toFixed(2)}%</td>
                    <td className="px-3 py-4 text-center font-mono text-[10px] text-slate-500">{line.return5y.toFixed(2)}%</td>
                    <td className="px-3 py-4 text-center font-mono text-[11px] font-black text-slate-800">{line.return10y.toFixed(2)}%</td>
                    <td className="px-3 py-4 text-center font-mono text-[11px] font-black text-blue-800">{line.return20y ? `${line.return20y.toFixed(2)}%` : '—'}</td>
                    <td className="px-4 py-4 text-center bg-blue-50/30">
                      <div className={`px-3 py-1.5 rounded-lg text-[10px] inline-block border ${getISCStyle(line.isc10y)}`}>
                        {line.isc10y.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {auditMode && isCritical ? (
                        <div className="flex items-center justify-center gap-1.5 text-rose-500 animate-pulse">
                          <AlertCircle size={14} />
                          <span className="text-[7px] font-black uppercase italic tracking-tighter">Inefficienza Critica</span>
                        </div>
                      ) : auditMode && isZurich ? (
                        <div className="flex items-center justify-center gap-1.5 text-blue-600">
                          <Zap size={14} />
                          <span className="text-[7px] font-black uppercase italic tracking-tighter">Efficienza Zurich</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5 text-emerald-500">
                          <CheckCircle2 size={14} />
                          <span className="text-[7px] font-black uppercase italic tracking-tighter">Standard COVIP</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
         <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg">
           <Info size={28} />
         </div>
         <div className="space-y-1">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest italic">Protocollo Audit Gruppo Vomero</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Il sistema evidenzia in modalità Audit i prodotti con ISC &gt; 2.40%. Questi rappresentano il portafoglio ideale per l'applicazione della portabilità 2026. La riduzione media di costo attesa passando a Zurich è del 0.35-0.50% annuo, con impatto esponenziale sul montante finale.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Comparison;
