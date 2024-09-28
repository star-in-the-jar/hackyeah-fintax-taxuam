import { AutonomousMessageGroup } from "../chat/MessageGroup";
import DatePicker from "../ui/datepicker";
import { Input } from "../ui/input";
import { produce } from "immer";
import React from "react";

export interface OsobaFizyczna {
  PESEL: string;
  ImiePierwsze: string;
  Nazwisko: string;
  DataUrodzenia: string;
}

export interface AdresPol {
  KodKraju: string;
  Wojewodztwo: string;
  Powiat: string;
  Gmina: string;
  Ulica: string;
  NrDomu: string;
  NrLokalu: string;
  Miejscowosc: string;
  KodPocztowy: string;
}

export interface AdresZamieszkaniaSiedziby {
  rodzajAdresu: string;
  AdresPol: AdresPol;
}

export interface Podmiot {
  // rola: string;
  OsobaFizyczna: OsobaFizyczna;
  AdresZamieszkaniaSiedziby: AdresZamieszkaniaSiedziby;
}

export interface NewForm {
  Podmiot: Podmiot;
  opis: string,
  kwotaPodatek1Proc: string,
  kwotaPodatek2Proc: string,
}

export const pcc3: NewForm = {
  // Naglowek: {
  //   KodFormularza: {
  //     kodSystemowy: "PCC-3 (6)",
  //     kodPodatku: "PCC",
  //     rodzajZobowiazania: "Z",
  //     wersjaSchemy: "1-0E",
  //     value: "PCC-3",
  //   },
  //   WariantFormularza: "6",
  //   Data: "2024-07-29",
  //   KodUrzedu: "0271",
  // },
  Podmiot: {
    // rola: "Podatnik",
    OsobaFizyczna: {
      PESEL: "54121832134",
      ImiePierwsze: "KAMIL",
      Nazwisko: "WIRTUALNY",
      DataUrodzenia: "1954-12-18",
    },
    AdresZamieszkaniaSiedziby: {
      rodzajAdresu: "RAD",
      AdresPol: {
        KodKraju: "PL",
        Wojewodztwo: "ŚLĄSKIE",
        Powiat: "M. KATOWICE",
        Gmina: "M. KATOWICE",
        Ulica: "ALPEJSKA",
        NrDomu: "6",
        NrLokalu: "66",
        Miejscowosc: "KATOWICE",
        KodPocztowy: "66-666",
      },
    },
  },
  kwotaPodatek1Proc: "0",
  kwotaPodatek2Proc: "0",
  opis: "",

};

const formatNewDateToString = (newDate: Date) => {
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const FormDisplay = (props: {
  formData: NewForm;
  onChange: (newData: NewForm) => void;
}) => {
  return (
    <div>
      <Input
        value={props.formData.Podmiot.OsobaFizyczna.PESEL}
        onChange={
          (e) => {
            props.onChange(
              produce(props.formData, (draft) => {
                draft.Podmiot.OsobaFizyczna.PESEL = e.target.value;
              })
            );
          }
          // (props.formData["Podmiot"]["OsobaFizyczna"]["PESEL"] = e.target.value)
        }
      />
      <Input
        value={props.formData.Podmiot.OsobaFizyczna.ImiePierwsze}
        onChange={(e) => {
          props.onChange(
            produce(props.formData, (draft) => {
              draft.Podmiot.OsobaFizyczna.ImiePierwsze = e.target.value;
            })
          );
        }}
      />
      <Input
        value={props.formData.Podmiot.OsobaFizyczna.Nazwisko}
        onChange={(e) => {
          props.onChange(
            produce(props.formData, (draft) => {
              draft.Podmiot.OsobaFizyczna.Nazwisko = e.target.value;
            })
          );
        }}
      />

      <DatePicker
        onSelect={(newDate) => {
          props.onChange(
            produce(props.formData, (draft) => {
              draft["Podmiot"]["OsobaFizyczna"]["DataUrodzenia"] =
                formatNewDateToString(newDate)
            })
          );
        }

        }
      />

      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "Wojewodztwo"
          ]
        }
        onChange={(e) => {
          props.onChange(
            produce(props.formData, draft => {
              draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                "Wojewodztwo"
              ] = e.target.value
            })
          )
        }
        }
      />
      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "Powiat"
          ]
        }
        onChange={(e) => {
          props.onChange(
            produce(props.formData, draft => {
              draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                "Powiat"
              ] = e.target.value
            })
          )
        }}
      />
      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "Gmina"
          ]
        }
        onChange={(e) => {
          props.onChange(
            produce(props.formData, draft => {
              draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                "Gmina"
              ] = e.target.value
            })
          )
        }
        }
      />

      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "Ulica"
          ]
        }
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "Ulica"
            ] = e.target.value
          }))
        }

        }
      />

      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "NrDomu"
          ]
        }
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "NrDomu"
            ] = e.target.value
          }))
        }
        }
      />

      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "NrLokalu"
          ]
        }
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "NrLokalu"
            ] = e.target.value
          }))
        }
        }
      />

      <Input
        value={
          props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
          "Miejscowosc"
          ]
        }
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "Miejscowosc"
            ] = e.target.value
          }))
        }}
      />


      <Input
        value={
          props.formData.opis
        }
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft.opis = e.target.value
          }))
        }}
      />

      <Input
        value={
          props.formData.kwotaPodatek1Proc
        }
        pattern="\d+"
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft.opis = e.target.value
          }))
        }}
      />
      <Input
        value={
          props.formData.kwotaPodatek2Proc
        }
        pattern="\d+"
        onChange={(e) => {
          props.onChange(produce(props.formData, draft => {
            draft.opis = e.target.value
          }))
        }}
      />
      <AutonomousMessageGroup
        label="Moje pole łyse pole"
      >
        <Input
          value={
            props.formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
            "KodPocztowy"
            ]
          }
          onChange={(e) => {
            props.onChange(produce(props.formData, draft => {
              draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                "KodPocztowy"
              ] = e.target.value
            }))
          }}
        />
      </AutonomousMessageGroup>

    </div>
  );
};
