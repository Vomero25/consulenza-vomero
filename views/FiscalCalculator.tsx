
import React, { useState, useMemo } from 'react';
import { Info, Calculator, Landmark, ShieldCheck, TrendingUp, Percent, CheckCircle2, AlertTriangle, Scale, Lock } from 'lucide-react';

// Tabella Coefficienti di Conversione (Aggiornata per Audit Gruppo Vomero)
const COEFFICIENTS_INPS: Record<number, number> = {
  60: 0.03875,
  61: 0.03988,
  62: 0.04101,
  63: 0.04223,
  64: 0.04355,
  65: 0.04496,
  66: 0.04648,
  67: 0.04812, // Coefficiente standard vecchiaia
  68: 0.04988,
  69: 0.05179,
  70: 0.05386,
  71: 0.05612
};

const FiscalCalculator: React.FC = () => {
  const [ral, setRal] = useState<number>(45000);
  const [contribution, setContribution] = useState<number>(5300);
  const [age, setAge] = useState<number>(35);
  const [targetAge, setTargetAge] = useState<number>(67);

  const DEDUCTIBILITY_LIMIT = 5300; // Valore Legge di Bilancio 2026

  const results = useMemo(() => {
    // Calcolo IRPEF PROGRESSIVO (Sistema 2025/2026)
    // 0-28.000 -> 23%
    // 28.000 - 50.000 -> 35%
    // > 50.000 -> 43%
    
    const calculateTax = (income: number) => {
      let tax = 0;
      if (income <= 28000) {
        tax = income * 0.23;
      } else if (income <= 50000) {
        tax = (28000 * 0.23) + ((income - 28000) * 0.35);
      } else {
        tax = (28000 * 0.23) + (22000 * 0.35) + ((income - 50000) * 0.43);
      }
      return tax;
    };

    const effectiveDeduction = Math.min(contribution, DEDUCTIBILITY_LIMIT);
    const taxBeforeDeduction = calculateTax(ral);
    const taxAfterDeduction = calculateTax(ral - effectiveDeduction);
    const taxSaving = taxBeforeDeduction - taxAfterDeduction;
    const netCost = contribution - taxSaving;

    // Aliquota Marginale per visualizzazione
    let marginalRate = 0.23;
    if (ral > 50000) marginalRate = 0.43;
    else if (ral > 28000) marginalRate = 0.35;

    // Proiezione Finanziaria
    const yearsToRetire = targetAge - age;
    const estimatedReturn = 0.045; // 4.5% Benchmark Prudenziale
    
    let totalAccumulated = 0;
    for (let i = 0; i < yearsToRetire; i++) {
      totalAccumulated = (totalAccumulated + contribution) * (1 + estimatedReturn);
    }

    // Tassazione agevolata 15-9%
    const participationYears = yearsToRetire + 5; 
    let finalTaxRate = 0.15;
    if (participationYears > 15) {
      finalTaxRate = Math.max(0.09, 0.15 - ((participationYears - 15) * 0.003));
    }
    
    const netAccumulated = totalAccumulated * (1 - finalTaxRate);
    
    // Calcolo con Coefficienti INPS
    const coeff = COEFFICIENTS_INPS[targetAge] || 0.04812;
    const monthlyAnnuity = (netAccumulated * coeff) / 12;

    return {
      marginalRate: (marginalRate * 100).toFixed(0),
      taxSaving,
      netCost,
      netAccumulated,
      monthlyAnnuity,
      finalTaxRate: (finalTaxRate * 100).toFixed(1),
      yearsToRetire,
      coeff: (coeff * 100).toFixed(3),
      isExceeding: contribution > DEDUCTIBILITY_LIMIT
    };
  }, [ral, contribution, age, targetAge]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      <header className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
            <Calculator className="text-blue-600" /> Simulatore <span className="text-blue-600">Audit Fiscale 2026</span>
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Blindaggio Dati FPN/PIP - Gruppo Vomero</p>
        </div>
        <div className="bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 flex items-center gap-3 text-white">
          <Lock className="text-blue-500" size={20} />
          <span className="text-[11px] font-black uppercase tracking-widest italic">Protocollo Dr. Camposano</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* INPUT PANEL */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 italic">
              <Landmark size={16} className="text-blue-600" /> Analisi Reddito & Versamenti
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Reddito Annuo Lordo (RAL)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">€</span>
                  <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-10 pr-5 py-4 font-black text-slate-900 focus:border-blue-600 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Versamento Annuo Proposto</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">€</span>
                  <input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className={`w-full bg-slate-50 border-2 rounded-2xl pl-10 pr-5 py-4 font-black text-slate-900 focus:border-blue-600 outline-none transition-all ${results.isExceeding ? 'border-amber-400' : 'border-slate-100'}`} />
                </div>
                {results.isExceeding && (
                  <p className="text-[9px] text-amber-600 font-black uppercase italic mt-1 flex items-center gap-1">
                    <AlertTriangle size={10} /> Eccedenza Deducibilità 2026 (€5.300)
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Età Attuale</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-black text-slate-900 focus:border-blue-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Età Target</label>
                  <select value={targetAge} onChange={(e) => setTargetAge(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-black text-slate-900 focus:border-blue-600 outline-none">
                    {Object.keys(COEFFICIENTS_INPS).map(a => <option key={a} value={a}>{a} anni</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[3rem] text-white space-y-6 shadow-xl shadow-blue-200">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200 flex items-center gap-2 italic">
              <Scale size={14} /> Audit Coefficienti
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                <p className="text-[10px] font-black uppercase text-blue-200 mb-1">Coeff. Trasformazione INPS</p>
                <p className="text-2xl font-black">{results.coeff}%</p>
                <p className="text-[9px] text-blue-100 mt-1 uppercase">Basato su tavole di mortalità attese</p>
              </div>
              <p className="text-[11px] text-blue-50 leading-relaxed italic font-medium">
                I dati riflettono l'integrazione tra previdenza pubblica e complementare prevista dal protocollo Vomero 26.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2 italic">Risparmio Fiscale Certificato (IRPEF)</p>
              <div className="text-6xl font-black tracking-tighter">€{Math.round(results.taxSaving).toLocaleString('it-IT')}</div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 italic">Costo Netto Reale dell'investimento</p>
                <div className="text-3xl font-black italic text-blue-500">€{Math.round(results.netCost).toLocaleString('it-IT')}</div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Rendita Mensile Netta Stimata</p>
                <p className="text-6xl font-black text-slate-900 tracking-tighter">€{Math.round(results.monthlyAnnuity).toLocaleString('it-IT')}</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Tassazione Agevolata: {results.finalTaxRate}%</span>
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Montante Finale Netto (Proiezione)</p>
                <p className="text-2xl font-black text-blue-600 uppercase">€{Math.round(results.netAccumulated).toLocaleString('it-IT')}</p>
              </div>
            </div>
          </div>

          {/* DISCLAIMER INTEGRALE BLINDATO */}
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-[3rem] space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600" size={24} />
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] italic">Audit Disclaimer & Data Governance</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                <strong>1. Precisione Fiscale:</strong> Il calcolo IRPEF è effettuato per scaglioni progressivi (23/35/43%) secondo le proiezioni 2026. L'effettivo risparmio dipende dalla capienza fiscale e dall'imponibile complessivo dichiarato dal contribuente.
                <br/><br/>
                <strong>2. Coefficienti INPS:</strong> Le stime di rendita utilizzano i coefficienti di trasformazione ex L. 335/95 e successive revisioni ministeriali. Tali valori sono puramente indicativi e soggetti a variazioni triennali.
               </p>
               <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                <strong>3. Rendimenti Finanziari:</strong> L'ipotesi del 4.5% annuo è basata su parametri storici di comparti azionari/bilanciati ESG. Non garantisce performance future.
                <br/><br/>
                <strong>4. Valenza Proposta:</strong> La presente simulazione non costituisce sollecitazione al pubblico risparmio. Prima dell'adesione, consultare i Set Informativi depositati in COVIP. 
                Editing e supervisione tecnica: <strong>Dr. Raffaele Camposano</strong>.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalCalculator;
