export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    svg: string;
  };
  ccn3: string;
}