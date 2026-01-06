
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Factory, TrendingUp, ShieldAlert, History, Table as TableIcon, Settings2, Banknote } from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const AuditTFR: React.FC = () => {
  const [initialStock, setInitialStock] = useState<number>(250000);
  const [wageBill, setWageBill] = useState<number>(850000);
  const [mktReturn, setMktReturn] = useState<number>(6.5);

  const simulation = useMemo(() => {
    let currentDebt = initialStock;
    let currentAsset = initialStock;
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const inflations = [0.1, -0.1, 1.2, 1.1, 0.6, -0.2, 1.9, 8.1, 5.7, 1.1];

    return years.map((year, idx) => {
      const yearlyAccrual = wageBill * 0.0741;
      const tfrCoeff = 1.5 + (0.75 * inflations[idx]);
      const revalCost = currentDebt * (tfrCoeff / 100);
      
      currentDebt = currentDebt + revalCost + yearlyAccrual;
      const assetReturn = currentAsset * (mktReturn / 100);
      currentAsset = currentAsset + assetReturn + yearlyAccrual;

      return {
        year,
        tfrCoeff: tfrCoeff.toFixed(2),
        debt: Math.round(currentDebt),
        asset: Math.round(currentAsset),
        revalCost: Math.round(revalCost),
        delta: Math.round(currentAsset - currentDebt)
      };
    });
  }, [initialStock, wageBill, mktReturn]);

  const final = simulation[simulation.length - 1];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      <header className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-slate-700">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl"><Factory size={24}/></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Corporate Advisory Unit</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Audit <span className="text-blue-500">Passività TFR</span></h1>
            <p className="text-slate-400 text-sm font-medium">Analisi del costo reale del mantenimento in azienda vs Esternalizzazione.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 text-right">
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Delta Patrimoniale Stimato</p>
            <p className="text-5xl font-black text-white">+{formatCurrency(final.delta)}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Simulazione su base decennale</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
              <Settings2 size={16} className="text-blue-600" /> Parametri Azienda
            </h4>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <label className="text-[9px] font-black text-slate-500 uppercase block mb-1">Stock TFR in Bilancio (€)</label>
                <input type="number" value={initialStock} onChange={(e) => setInitialStock(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <label className="text-[9px] font-black text-slate-500 uppercase block mb-1">Massa Salariale Annua (€)</label>
                <input type="number" value={wageBill} onChange={(e) => setWageBill(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none" />
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <label className="text-[9px] font-black text-blue-600 uppercase block mb-1">Benchmark Rendimento Fondo (%)</label>
                <input type="number" value={mktReturn} onChange={(e) => setMktReturn(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none" />
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <ShieldAlert className="text-amber-600 shrink-0" size={20} />
              <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                Il TFR in azienda genera un costo di rivalutazione certo (1.5% fisso + 75% inflazione). L'esternalizzazione trasforma un debito in un asset finanziario.
              </p>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm h-[400px]">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Debito TFR vs Asset Previdenziale</h3>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={simulation}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `€${v/1000}k`} tick={{fontSize: 10}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="debt" fill="#f43f5e" fillOpacity={0.05} stroke="#f43f5e" strokeWidth={3} name="Debito TFR (Azienda)" />
                <Line type="monotone" dataKey="asset" stroke="#3b82f6" strokeWidth={4} dot={false} name="Asset Fondi (Esit. Esterna)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic flex items-center gap-2">
                <History size={16} /> Registro Rivalutazioni Storiche
              </h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[9px] font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Esercizio</th>
                  <th className="px-6 py-4 text-center">Coeff. Rivalutazione %</th>
                  <th className="px-6 py-4 text-right">Onero Rivalutazione</th>
                  <th className="px-6 py-4 text-right">Debito Residuo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simulation.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-black text-slate-900">{row.year}</td>
                    <td className="px-6 py-3 text-center text-rose-500 font-black">{row.tfrCoeff}%</td>
                    <td className="px-6 py-3 text-right font-black text-slate-600">{formatCurrency(row.revalCost)}</td>
                    <td className="px-6 py-3 text-right font-black text-slate-900">{formatCurrency(row.debt)}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuditTFR;
