export interface CountryData {
  [continent: string]: string[];
}

export interface FlagResponse {
  flags: {
    png: string;
    svg: string;
  };
}