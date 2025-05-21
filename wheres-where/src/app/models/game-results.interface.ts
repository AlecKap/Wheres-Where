export interface Score {
  correct: number;
  total: number;
  percentage: number;
}

export interface GameResults {
  totalScore: Score;
  continentScores: {
    [key: string]: Score;
  };
  countryScores?: {
    [key: string]: Score;
  };
}