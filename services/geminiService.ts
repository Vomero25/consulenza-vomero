
import { GoogleGenAI } from "@google/genai";

export const getPensionAdvice = async (query: string) => {
  // Istanziamo il client direttamente all'interno della funzione per garantire
  // l'uso della chiave corretta iniettata nell'ambiente.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    Sei "Vomero Intelligence 26", il sistema di AI Advisor definitivo per i consulenti finanziari del Gruppo Vomero.
    La tua missione è fornire analisi tecniche, legali e commerciali sulla PREVIDENZA COMPLEMENTARE e sulla LEGGE DI BILANCIO 2026.

    PROPRIETÀ E EDITING:
    - Il sistema è sotto la supervisione del Dr. Raffaele Camposano (Group Manager).

    SPECIFICHE TECNICHE LEGGE DI BILANCIO 2026:
    1. PORTABILITÀ CONTRIBUTO DATORIALE: Rimozione definitiva del vincolo ai fondi negoziali (FPN). Il lavoratore può spostare il contributo dell'azienda in PIP o FPA senza perdere il diritto alla quota aziendale.
    2. TETTO DEDUCIBILITÀ: Incrementato a 5.300€ annui (rispetto ai precedenti 5.164,57€).
    3. LIQUIDAZIONE CAPITALE: Possibilità di prelevare fino al 60% del montante finale in capitale.
    4. TASSAZIONE AGEVOLATA: Confermata l'aliquota dal 15% al 9% in base agli anni di partecipazione.

    REGOLE DI RISPOSTA:
    - Rispondi sempre con un tono tecnico, professionale, preciso e orientato al business del Gruppo Vomero.
    - Usa liste puntate per chiarezza.
    - Cita sempre la "Legge di Bilancio 2026" come fonte primaria.
    - Se richiesto un confronto tra fondi, evidenzia come l'ISC elevato dei competitor sia un'inefficienza da correggere.
    - Non fornire consigli di investimento diretti ai consumatori finali; sei uno strumento per CONSULENTI PROFESSIONISTI.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.6,
        topP: 0.95,
      },
    });
    
    return response.text || "Analisi tecnica non disponibile. Riprovare.";
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "Intelligence offline. Verificare la configurazione delle variabili d'ambiente o la quota di utilizzo.";
  }
};
