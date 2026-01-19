
export type EssayTone = 'Formal' | 'Informal' | 'Persuasive' | 'Descriptive';

export interface EssayRequest {
  topic: string;
  tone: EssayTone;
  words: number;
}

export interface EssayResponse {
  success: boolean;
  text?: string;
  error?: string;
}
