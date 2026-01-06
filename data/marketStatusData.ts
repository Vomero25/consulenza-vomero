
export interface MarketStatItem {
  id: string;
  category: 'FPN' | 'FPA' | 'PIP';
  provider: string;
  nomeProdotto?: string;
  aderenti: number;
  patrimonio: number; // in Milioni di Euro
  marketShare: number;
  growth: number;
  iscMedio: number;
  comparti: {
    gar: number; // % Linea Garantita
    bil: number; // % Linea Bilanciata
    azn: number; // % Linea Azionaria
  };
}

export const MARKET_STATUS_DATA: MarketStatItem[] = [
  // --- 33 FONDI PENSIONE NEGOZIALI (FPN) ---
  { id: 'fpn-1', category: 'FPN', provider: 'Fonchim', nomeProdotto: 'Chimici', aderenti: 175000, patrimonio: 8800, marketShare: 12.8, growth: 0.7, iscMedio: 0.32, comparti: { gar: 10, bil: 60, azn: 30 } },
  { id: 'fpn-2', category: 'FPN', provider: 'Fondenergia', nomeProdotto: 'Energia', aderenti: 45000, patrimonio: 2800, marketShare: 4.1, growth: 1.2, iscMedio: 0.33, comparti: { gar: 15, bil: 55, azn: 30 } },
  { id: 'fpn-3', category: 'FPN', provider: 'Quadri Fiat', nomeProdotto: 'Fiat', aderenti: 38000, patrimonio: 1950, marketShare: 2.8, growth: 0.5, iscMedio: 0.35, comparti: { gar: 20, bil: 60, azn: 20 } },
  { id: 'fpn-4', category: 'FPN', provider: 'Cometa', nomeProdotto: 'Metalmeccanici', aderenti: 450000, patrimonio: 14500, marketShare: 21.2, growth: 1.1, iscMedio: 0.35, comparti: { gar: 15, bil: 70, azn: 15 } },
  { id: 'fpn-5', category: 'FPN', provider: 'Fondosanità', nomeProdotto: 'Sanitari', aderenti: 32000, patrimonio: 950, marketShare: 1.4, growth: 2.1, iscMedio: 0.45, comparti: { gar: 10, bil: 50, azn: 40 } },
  { id: 'fpn-6', category: 'FPN', provider: 'Solidarietà Veneto', nomeProdotto: 'Regionale', aderenti: 65000, patrimonio: 1800, marketShare: 2.6, growth: 3.5, iscMedio: 0.42, comparti: { gar: 20, bil: 50, azn: 30 } },
  { id: 'fpn-7', category: 'FPN', provider: 'Previambiente', nomeProdotto: 'Igiene Ambientale', aderenti: 115000, patrimonio: 1400, marketShare: 2.0, growth: 3.8, iscMedio: 0.36, comparti: { gar: 30, bil: 60, azn: 10 } },
  { id: 'fpn-8', category: 'FPN', provider: 'Alifond', nomeProdotto: 'Alimentari', aderenti: 48000, patrimonio: 1600, marketShare: 2.3, growth: 1.1, iscMedio: 0.34, comparti: { gar: 18, bil: 62, azn: 20 } },
  { id: 'fpn-9', category: 'FPN', provider: 'Laborfonds', nomeProdotto: 'Regionale Trentino', aderenti: 135000, patrimonio: 3800, marketShare: 5.5, growth: 1.9, iscMedio: 0.40, comparti: { gar: 25, bil: 50, azn: 25 } },
  { id: 'fpn-10', category: 'FPN', provider: 'Fopen', nomeProdotto: 'Enel', aderenti: 42000, patrimonio: 2400, marketShare: 3.5, growth: 0.5, iscMedio: 0.35, comparti: { gar: 5, bil: 45, azn: 50 } },
  { id: 'fpn-11', category: 'FPN', provider: 'Pegaso', nomeProdotto: 'Utility/Energia', aderenti: 35000, patrimonio: 1500, marketShare: 2.2, growth: 0.8, iscMedio: 0.38, comparti: { gar: 15, bil: 55, azn: 30 } },
  { id: 'fpn-12', category: 'FPN', provider: 'Telemaco', nomeProdotto: 'Telecom', aderenti: 55000, patrimonio: 2200, marketShare: 3.2, growth: 0.4, iscMedio: 0.35, comparti: { gar: 12, bil: 68, azn: 20 } },
  { id: 'fpn-13', category: 'FPN', provider: 'Arco', nomeProdotto: 'Legno/Arredo', aderenti: 32000, patrimonio: 1100, marketShare: 1.6, growth: 1.2, iscMedio: 0.40, comparti: { gar: 20, bil: 70, azn: 10 } },
  { id: 'fpn-14', category: 'FPN', provider: 'Foncer', nomeProdotto: 'Ceramica', aderenti: 28000, patrimonio: 980, marketShare: 1.4, growth: 0.9, iscMedio: 0.38, comparti: { gar: 15, bil: 65, azn: 20 } },
  { id: 'fpn-15', category: 'FPN', provider: 'Fondapi', nomeProdotto: 'PMI Metalm.', aderenti: 82000, patrimonio: 950, marketShare: 1.4, growth: 2.5, iscMedio: 0.38, comparti: { gar: 20, bil: 60, azn: 20 } },
  { id: 'fpn-16', category: 'FPN', provider: 'Previmoda', nomeProdotto: 'Moda', aderenti: 45000, patrimonio: 1250, marketShare: 1.8, growth: 1.1, iscMedio: 0.36, comparti: { gar: 15, bil: 60, azn: 25 } },
  { id: 'fpn-17', category: 'FPN', provider: 'Concreto', nomeProdotto: 'Cemento', aderenti: 18000, patrimonio: 650, marketShare: 0.9, growth: 0.4, iscMedio: 0.38, comparti: { gar: 10, bil: 80, azn: 10 } },
  { id: 'fpn-18', category: 'FPN', provider: 'Fon.Te', nomeProdotto: 'Commercio', aderenti: 285000, patrimonio: 5900, marketShare: 8.6, growth: 3.2, iscMedio: 0.34, comparti: { gar: 20, bil: 65, azn: 15 } },
  { id: 'fpn-19', category: 'FPN', provider: 'Byblos', nomeProdotto: 'Editoria', aderenti: 24000, patrimonio: 850, marketShare: 1.2, growth: 0.7, iscMedio: 0.40, comparti: { gar: 12, bil: 68, azn: 20 } },
  { id: 'fpn-20', category: 'FPN', provider: 'Gomma Plastica', nomeProdotto: 'Gomma', aderenti: 38000, patrimonio: 1200, marketShare: 1.8, growth: 1.4, iscMedio: 0.38, comparti: { gar: 10, bil: 60, azn: 30 } },
  { id: 'fpn-21', category: 'FPN', provider: 'Mediafond', nomeProdotto: 'Mediaset/Stampa', aderenti: 12000, patrimonio: 650, marketShare: 0.9, growth: 0.3, iscMedio: 0.42, comparti: { gar: 5, bil: 40, azn: 55 } },
  { id: 'fpn-22', category: 'FPN', provider: 'Prevaer', nomeProdotto: 'Trasporto Aereo', aderenti: 15000, patrimonio: 1100, marketShare: 1.6, growth: 0.5, iscMedio: 0.42, comparti: { gar: 10, bil: 70, azn: 20 } },
  { id: 'fpn-23', category: 'FPN', provider: 'Eurofer', nomeProdotto: 'Ferrovieri', aderenti: 95000, patrimonio: 1800, marketShare: 2.6, growth: 0.9, iscMedio: 0.33, comparti: { gar: 10, bil: 70, azn: 20 } },
  { id: 'fpn-24', category: 'FPN', provider: 'Prevedi', nomeProdotto: 'Edili', aderenti: 1250000, patrimonio: 1200, marketShare: 1.8, growth: 4.2, iscMedio: 0.30, comparti: { gar: 90, bil: 8, azn: 2 } },
  { id: 'fpn-25', category: 'FPN', provider: 'Priamo', nomeProdotto: 'Trasporti', aderenti: 110000, patrimonio: 1900, marketShare: 2.8, growth: 1.3, iscMedio: 0.32, comparti: { gar: 15, bil: 70, azn: 15 } },
  { id: 'fpn-26', category: 'FPN', provider: 'Fondemain', nomeProdotto: 'Regionale VDA', aderenti: 12000, patrimonio: 450, marketShare: 0.7, growth: 1.5, iscMedio: 0.40, comparti: { gar: 25, bil: 50, azn: 25 } },
  { id: 'fpn-27', category: 'FPN', provider: 'Fondoposte', nomeProdotto: 'Poste', aderenti: 110000, patrimonio: 2800, marketShare: 4.1, growth: 0.8, iscMedio: 0.36, comparti: { gar: 30, bil: 65, azn: 5 } },
  { id: 'fpn-28', category: 'FPN', provider: 'Scuola Espero', nomeProdotto: 'Scuola', aderenti: 105000, patrimonio: 2100, marketShare: 3.1, growth: 2.4, iscMedio: 0.38, comparti: { gar: 20, bil: 75, azn: 5 } },
  { id: 'fpn-29', category: 'FPN', provider: 'Astri', nomeProdotto: 'Trasporti/Serv.', aderenti: 18000, patrimonio: 620, marketShare: 0.9, growth: 1.1, iscMedio: 0.40, comparti: { gar: 25, bil: 65, azn: 10 } },
  { id: 'fpn-30', category: 'FPN', provider: 'Agrifondo', nomeProdotto: 'Agricoli', aderenti: 35000, patrimonio: 980, marketShare: 1.4, growth: 0.9, iscMedio: 0.40, comparti: { gar: 20, bil: 70, azn: 10 } },
  { id: 'fpn-31', category: 'FPN', provider: 'Perseo Sirio', nomeProdotto: 'PA/Sanità', aderenti: 210000, patrimonio: 1100, marketShare: 1.6, growth: 5.5, iscMedio: 0.36, comparti: { gar: 40, bil: 45, azn: 15 } },
  { id: 'fpn-32', category: 'FPN', provider: 'Fondaereo', nomeProdotto: 'Volo', aderenti: 8500, patrimonio: 750, marketShare: 1.1, growth: 0.2, iscMedio: 0.40, comparti: { gar: 10, bil: 60, azn: 30 } },
  { id: 'fpn-33', category: 'FPN', provider: 'Prev. Coop', nomeProdotto: 'Coop', aderenti: 85000, patrimonio: 1800, marketShare: 2.6, growth: 2.8, iscMedio: 0.45, comparti: { gar: 20, bil: 50, azn: 30 } },

  // --- 33 PIANI INDIVIDUALI PENSIONISTICI (PIP) ---
  { id: 'pip-1', category: 'PIP', provider: 'Alleanza Ass.', nomeProdotto: 'Alleata Prev.', aderenti: 950000, patrimonio: 12500, marketShare: 23.5, growth: 2.1, iscMedio: 2.65, comparti: { gar: 60, bil: 30, azn: 10 } },
  { id: 'pip-2', category: 'PIP', provider: 'Allianz Global', nomeProdotto: 'Moneyfarm', aderenti: 45000, patrimonio: 850, marketShare: 1.6, growth: 15.2, iscMedio: 1.95, comparti: { gar: 0, bil: 40, azn: 60 } },
  { id: 'pip-3', category: 'PIP', provider: 'Allianz S.p.A.', nomeProdotto: 'Elios Prev.', aderenti: 180000, patrimonio: 3200, marketShare: 6.0, growth: 1.8, iscMedio: 2.35, comparti: { gar: 45, bil: 40, azn: 15 } },
  { id: 'pip-4', category: 'PIP', provider: 'Arca Vita', nomeProdotto: 'Progressive', aderenti: 120000, patrimonio: 2100, marketShare: 4.0, growth: 3.2, iscMedio: 2.45, comparti: { gar: 30, bil: 40, azn: 30 } },
  { id: 'pip-5', category: 'PIP', provider: 'Athora Italia', nomeProdotto: 'Athora Futuro', aderenti: 35000, patrimonio: 750, marketShare: 1.4, growth: 0.5, iscMedio: 2.50, comparti: { gar: 50, bil: 35, azn: 15 } },
  { id: 'pip-6', category: 'PIP', provider: 'Axa Ass.', nomeProdotto: 'Progetto Pens.', aderenti: 180000, patrimonio: 2400, marketShare: 4.5, growth: 1.5, iscMedio: 2.65, comparti: { gar: 50, bil: 35, azn: 15 } },
  { id: 'pip-7', category: 'PIP', provider: 'Axa MPS Vita', nomeProdotto: 'Prev. Attiva', aderenti: 110000, patrimonio: 1950, marketShare: 3.7, growth: 1.1, iscMedio: 2.55, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-8', category: 'PIP', provider: 'BCC Vita', nomeProdotto: 'Modus', aderenti: 28000, patrimonio: 540, marketShare: 1.0, growth: 2.8, iscMedio: 2.50, comparti: { gar: 30, bil: 40, azn: 30 } },
  { id: 'pip-9', category: 'PIP', provider: 'BNP Paribas', nomeProdotto: 'BNL Pianopens.', aderenti: 45000, patrimonio: 920, marketShare: 1.7, growth: 1.4, iscMedio: 2.55, comparti: { gar: 35, bil: 45, azn: 20 } },
  { id: 'pip-10', category: 'PIP', provider: 'CNP Unicredit', nomeProdotto: 'Seniorvita', aderenti: 140000, patrimonio: 2100, marketShare: 4.0, growth: 2.2, iscMedio: 2.55, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-11', category: 'PIP', provider: 'Compagnia Ital.', nomeProdotto: 'Feelgood', aderenti: 12000, patrimonio: 320, marketShare: 0.6, growth: 0.3, iscMedio: 2.45, comparti: { gar: 55, bil: 35, azn: 10 } },
  { id: 'pip-12', category: 'PIP', provider: 'Poste Vita', nomeProdotto: 'Postaprevidenza', aderenti: 1100000, patrimonio: 13000, marketShare: 24.5, growth: 2.4, iscMedio: 2.65, comparti: { gar: 80, bil: 15, azn: 5 } },
  { id: 'pip-13', category: 'PIP', provider: 'Sara Vita', nomeProdotto: 'Multistrategy', aderenti: 55000, patrimonio: 980, marketShare: 1.8, growth: 4.5, iscMedio: 2.60, comparti: { gar: 30, bil: 40, azn: 30 } },
  { id: 'pip-14', category: 'PIP', provider: 'Zurich Bank', nomeProdotto: 'Z-Pension ESG', aderenti: 450000, patrimonio: 6200, marketShare: 11.6, growth: 7.2, iscMedio: 2.10, comparti: { gar: 20, bil: 40, azn: 40 } },
  { id: 'pip-15', category: 'PIP', provider: 'Generali Italia', nomeProdotto: 'Generazione Prev.', aderenti: 920000, patrimonio: 10500, marketShare: 19.8, growth: 1.6, iscMedio: 2.40, comparti: { gar: 65, bil: 25, azn: 10 } },
  { id: 'pip-16', category: 'PIP', provider: 'Genertellife', nomeProdotto: 'PensioneLife', aderenti: 180000, patrimonio: 2400, marketShare: 4.5, growth: 2.8, iscMedio: 2.25, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-17', category: 'PIP', provider: 'Groupama', nomeProdotto: 'Orizzonte Prev.', aderenti: 65000, patrimonio: 1100, marketShare: 2.1, growth: 1.1, iscMedio: 2.55, comparti: { gar: 50, bil: 35, azn: 15 } },
  { id: 'pip-18', category: 'PIP', provider: 'Helvetia', nomeProdotto: 'Aura', aderenti: 42000, patrimonio: 850, marketShare: 1.6, growth: 2.2, iscMedio: 2.50, comparti: { gar: 45, bil: 40, azn: 15 } },
  { id: 'pip-19', category: 'PIP', provider: 'Intesa Vita', nomeProdotto: 'Il Mio Futuro', aderenti: 310000, patrimonio: 3900, marketShare: 7.3, growth: 3.8, iscMedio: 2.45, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-20', category: 'PIP', provider: 'Mediolanum Vita', nomeProdotto: 'Tax Benefit New', aderenti: 395000, patrimonio: 4800, marketShare: 9.0, growth: 4.5, iscMedio: 2.65, comparti: { gar: 35, bil: 35, azn: 30 } },
  { id: 'pip-21', category: 'PIP', provider: 'Reale Mutua', nomeProdotto: 'Reale Prev.', aderenti: 68000, patrimonio: 1250, marketShare: 2.4, growth: 1.5, iscMedio: 2.40, comparti: { gar: 55, bil: 35, azn: 10 } },
  { id: 'pip-22', category: 'PIP', provider: 'UnipolSai Vita', nomeProdotto: 'Unipol Futura', aderenti: 290000, patrimonio: 3300, marketShare: 6.2, growth: 2.1, iscMedio: 2.50, comparti: { gar: 55, bil: 30, azn: 15 } },
  { id: 'pip-23', category: 'PIP', provider: 'Crédit Agricole', nomeProdotto: 'Stella', aderenti: 12000, patrimonio: 2200, marketShare: 4.1, growth: 3.5, iscMedio: 2.30, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-24', category: 'PIP', provider: 'Credemvita', nomeProdotto: 'Credem Prev.', aderenti: 45000, patrimonio: 950, marketShare: 1.8, growth: 2.4, iscMedio: 2.35, comparti: { gar: 40, bil: 45, azn: 15 } },
  { id: 'pip-25', category: 'PIP', provider: 'Cronos Vita', nomeProdotto: 'Eurovita Prev.', aderenti: 35000, patrimonio: 650, marketShare: 1.2, growth: -5.2, iscMedio: 2.50, comparti: { gar: 60, bil: 30, azn: 10 } },
  { id: 'pip-26', category: 'PIP', provider: 'Medvida', nomeProdotto: 'Piano Progetto', aderenti: 55000, patrimonio: 650, marketShare: 1.2, growth: 0.9, iscMedio: 2.70, comparti: { gar: 60, bil: 30, azn: 10 } },
  { id: 'pip-27', category: 'PIP', provider: 'MetLife', nomeProdotto: 'MetLife Prev.', aderenti: 18000, patrimonio: 420, marketShare: 0.8, growth: 1.1, iscMedio: 2.40, comparti: { gar: 40, bil: 40, azn: 20 } },
  { id: 'pip-28', category: 'PIP', provider: 'Old Mutual', nomeProdotto: 'OM Wealth', aderenti: 24000, patrimonio: 1100, marketShare: 2.1, growth: 3.8, iscMedio: 2.20, comparti: { gar: 30, bil: 40, azn: 30 } },
  { id: 'pip-29', category: 'PIP', provider: 'Sella Life', nomeProdotto: 'Sella Prev.', aderenti: 15000, patrimonio: 380, marketShare: 0.7, growth: 4.2, iscMedio: 2.30, comparti: { gar: 35, bil: 45, azn: 20 } },
  { id: 'pip-30', category: 'PIP', provider: 'Vera Vita', nomeProdotto: 'Vera Prev.', aderenti: 38000, patrimonio: 720, marketShare: 1.4, growth: 1.2, iscMedio: 2.50, comparti: { gar: 50, bil: 35, azn: 15 } },
  { id: 'pip-31', category: 'PIP', provider: 'Prudential', nomeProdotto: 'Pramerica Prev.', aderenti: 22000, patrimonio: 1400, marketShare: 2.6, growth: 5.1, iscMedio: 2.15, comparti: { gar: 25, bil: 45, azn: 30 } },
  { id: 'pip-32', category: 'PIP', provider: 'Zurich Ass.', nomeProdotto: 'Pensione per Te', aderenti: 85000, patrimonio: 1800, marketShare: 3.4, growth: 2.8, iscMedio: 2.15, comparti: { gar: 35, bil: 40, azn: 25 } },
  { id: 'pip-33', category: 'PIP', provider: 'Aviva Vita', nomeProdotto: 'Aviva Prev.', aderenti: 42000, patrimonio: 920, marketShare: 1.7, growth: -1.2, iscMedio: 2.50, comparti: { gar: 50, bil: 35, azn: 15 } },
];
