
import React, { useState, useRef, useEffect } from 'react';
import { getPensionAdvice } from '../services/geminiService';
import { Send, Bot, User, Sparkles, AlertTriangle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Benvenuto nell\'hub Intelligence del Gruppo Vomero. Sono pronto ad analizzare la Legge di Bilancio 2026 per supportare la tua attività commerciale. Cosa desideri approfondire?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const response = await getPensionAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Errore di elaborazione. Verifica la connessione API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Switch dal Negoziale",
    "Novità Portabilità 2026",
    "Deducibilità 5.300€",
    "Capitale al 60%"
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-220px)] lg:h-[calc(100vh-160px)] flex flex-col gap-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
            <Sparkles className="text-blue-600" /> Vomero <span className="text-blue-600">Intelligence</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Supporto Decisionale Avanzato - R. Camposano</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
          <AlertTriangle size={14} className="text-amber-600" />
          <p className="text-[9px] font-black uppercase text-amber-800 tracking-tight">IA Generativa: Verificare i dati tecnici prima della proposta</p>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-y-auto p-6 lg:p-10 space-y-6 no-scrollbar"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[90%] lg:max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-900'}`}>
                {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-blue-400" />}
              </div>
              <div className={`p-5 rounded-3xl text-sm leading-relaxed font-medium ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-200' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200'
              }`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} className={line.trim() === '' ? 'h-3' : 'mb-1'}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
              <Bot size={14} className="text-blue-400" />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-200 flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {suggestions.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => setInput(s)}
              className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input 
            type="text" 
            placeholder="Interroga la normativa 2026..." 
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-5 pr-20 text-sm font-bold focus:border-blue-600 outline-none shadow-2xl transition-all group-hover:border-slate-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-3 top-3 bottom-3 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-200 transition-transform active:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
