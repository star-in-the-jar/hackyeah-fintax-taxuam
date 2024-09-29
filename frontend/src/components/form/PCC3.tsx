import { AutonomousMessageGroup } from "../chat/MessageGroup";
import DatePicker from "../ui/datepicker";
import { Input } from "../ui/input";
import { produce } from "immer";
import { miasta } from "@/mocks/miasta";
import Combobox from "../ui/combobox";
import { powiaty } from "@/mocks/powiaty";
import { wojewodztwa } from "@/mocks/wojewodztwa";
import { urzedySkarboweNazwy } from "@/mocks/urzedy-skarbowe-id";
import { useLocationOptions } from "../ui/hooks/useLocationOptions";

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
  UrzadSkarbowy: string;
  Podmiot: Podmiot;
  opis: string;
  kwotaPodatek1Proc: string;
  kwotaPodatek2Proc: string;
}

export const pcc3: NewForm = {
  UrzadSkarbowy: "Urząd Skarbowy w Katowicach",
  Podmiot: {
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
  opis: "Przykładowy opis",
};

const formatNewDateToString = (newDate: Date) => {
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface FormDisplay {
  formData: NewForm;
  onChange: (newData: NewForm) => void;
}

export const FormDisplay = ({ formData, onChange }: FormDisplay) => {
  const { selected, setSelected, cities, districts, voivodeships } =
    useLocationOptions();

  return (
    <div id="form-display">
      <AutonomousMessageGroup label="Urząd skarbowy">
        <Combobox
          placeholder="Urząd skarbowy"
          options={urzedySkarboweNazwy}
          initValue={formData.UrzadSkarbowy}
          onChange={(newValue) => {
            onChange(
              produce(formData, (draft) => {
                draft["UrzadSkarbowy"] = newValue;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Imię">
        <Input
          value={formData.Podmiot.OsobaFizyczna.ImiePierwsze}
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.Podmiot.OsobaFizyczna.ImiePierwsze = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Nazwisko">
        <Input
          value={formData.Podmiot.OsobaFizyczna.Nazwisko}
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.Podmiot.OsobaFizyczna.Nazwisko = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="PESEL">
        <Input
          value={formData.Podmiot.OsobaFizyczna.PESEL}
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.Podmiot.OsobaFizyczna.PESEL = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>

      <AutonomousMessageGroup label="Data urodzenia">
        <DatePicker
          onSelect={(newDate) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["OsobaFizyczna"]["DataUrodzenia"] =
                  formatNewDateToString(newDate);
              })
            );
          }}
          value={formData["Podmiot"]["OsobaFizyczna"]["DataUrodzenia"]}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Województwo">
        <Combobox
          placeholder="Wojęwództwo"
          options={voivodeships}
          onChange={(newValue) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "Wojewodztwo"
                ] = newValue;
              })
            );
            setSelected({
              type: "setVoivodeship",
              payload: newValue,
            });
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Miejscowość">
        <Combobox
          placeholder="Miejscowosc"
          options={cities}
          onChange={(newValue) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "Miejscowosc"
                ] = newValue;
              })
            );
            setSelected({
              type: "setCity",
              payload: newValue,
            });
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Powiat">
        <Combobox
          placeholder="Powiat"
          options={districts}
          onChange={(newValue) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "Powiat"
                ] = newValue;
              })
            );
            setSelected({
              type: "setDistrict",
              payload: newValue,
            });
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Gmina">
        <Input
          value={
            formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "Gmina"
            ]
          }
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "Gmina"
                ] = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Ulica">
        <Input
          value={
            formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "Ulica"
            ]
          }
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "Ulica"
                ] = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Nr domu">
        <Input
          value={
            formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "NrDomu"
            ]
          }
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "NrDomu"
                ] = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Nr lokalu">
        <Input
          value={
            formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "NrLokalu"
            ]
          }
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "NrLokalu"
                ] = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>

      <AutonomousMessageGroup label="Kod pocztowy">
        <Input
          value={
            formData["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
              "KodPocztowy"
            ]
          }
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft["Podmiot"]["AdresZamieszkaniaSiedziby"]["AdresPol"][
                  "KodPocztowy"
                ] = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>

      <AutonomousMessageGroup label="Opis">
        <Input
          value={formData.opis}
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.opis = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
      <AutonomousMessageGroup label="Stawka Podatku 1%">
        {" "}
        <Input
          value={formData.kwotaPodatek1Proc}
          pattern="\d+"
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.kwotaPodatek1Proc = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>

      <AutonomousMessageGroup label="Stawka podatku 2%">
        <Input
          value={formData.kwotaPodatek2Proc}
          pattern="\d+"
          onChange={(e) => {
            onChange(
              produce(formData, (draft) => {
                draft.kwotaPodatek2Proc = e.target.value;
              })
            );
          }}
        />
      </AutonomousMessageGroup>
    </div>
  );
};
