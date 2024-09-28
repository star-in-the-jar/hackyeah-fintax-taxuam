export type FormData = {
  data: string;
  kodUrzedu: string;
} & (
  | {
      celDeklaracji: "zlozenie";
    }
  | {
      celDeklaracji: "korekta";
      powod: string;
    }
) & {
    podatnik: Podatnik;
    adres: Adres;
  };

export type Podatnik =
  | (
      | ({
          type: "os-fiz";
          imie: string;
          nazwisko: string;
          dataUrodzenia: string;
          imieOjca: string | null;
          imieMatki: string | null;
        } & {
          typIdent: "pesel";
          pesel: string;
        })
      | {
          typeIdent: "nip";
          nip: string;
        }
    )
  | {
      type: "inne";
      nip: string;
      pelnaNazwa: string;
      nazwaSkrocona: string;
    };

export type Adres =
  | {
      type: "pl";
      kraj: "POLSKA";
      wojewodzstwo: string;
      powiat: string;
      gmina: string;
      miejscowosc: string;
      ulica: string | null;
      numerDomu: string;
      numerLokalu: string | null;
      kodPocztowy: string;
    }
  | {
      type: "inny";
      miejscowosc: string;
      ulica: string | null;
      numerDomu: string;
      numerLokalu: string | null;
      kodPocztowy: string | null;
    };

export type Przedmiot = {
  type: "umowa" | "zmiana-umowy" | "orzeczenie" | "inne";
  miejscePolozenia: null | "rp" | "inne";
  miejsceDokonania: null | "rp" | "inne";
  zwiezleOkreslenie: string
};
