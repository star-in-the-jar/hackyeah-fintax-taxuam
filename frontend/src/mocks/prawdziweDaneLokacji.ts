import data from "./lokacje.json";

export type Lokacja = {
  WOJ: string;
  POW: string;
  GMI: string;
  RODZ: string | number;
  NAZWA: string;
  NAZWA_DOD: string;
  STAN_NA: string;
};

export const prawdziweDaneLokacji: Lokacja[] = data as any;
