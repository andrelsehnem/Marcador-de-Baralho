export interface Score {
  id: string;
  valor: number;
  timestamp: number; // para ordenar cronologicamente
}

export interface CanastraConfig {
  pontosFinais: number;
  pontosMaras: number;
}

export interface CanastraGame {
  tempoAbertura: number;
  configPadrao: CanastraConfig;
  nomeTime1: string;
  nomeTime2: string;
  pontosTime1: Score[];
  pontosTime2: Score[];
  vencedor: 'time1' | 'time2' | null;
}

export const DEFAULT_CONFIG: CanastraConfig = {
  pontosFinais: 4000,
  pontosMaras: 2000,
};

export const DEFAULT_GAME: CanastraGame = {
  tempoAbertura: Date.now(),
  configPadrao: DEFAULT_CONFIG,
  nomeTime1: 'Nós',
  nomeTime2: 'Eles',
  pontosTime1: [],
  pontosTime2: [],
  vencedor: null,
};
