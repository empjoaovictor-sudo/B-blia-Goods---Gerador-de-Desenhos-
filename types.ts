export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedImage {
  id: string;
  data: string; // Base64 data
  prompt: string;
  timestamp: number;
}

export interface UserProgress {
  score: number;
  drawingsGenerated: number;
  level: string;
  unlockedBadges: string[];
}

export const LEVELS = [
  { threshold: 0, name: "Novo Artista" },
  { threshold: 5, name: "Criativo" },
  { threshold: 15, name: "Ilustrador Bíblico" },
  { threshold: 30, name: "Mestre da Arte" },
  { threshold: 50, name: "Lenda Divina" },
];