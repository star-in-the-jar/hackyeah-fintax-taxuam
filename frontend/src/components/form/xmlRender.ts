import { urzedySkarboweNazwy } from "../../mocks/urzedy-skarbowe-id";
import { NewForm } from "./PCC3";

const entityEncode = (s: string) => {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
};

const textToBinary = (text: string): ArrayBuffer => {
  const buffer = new TextEncoder().encode(text).buffer;
  return buffer;
};

const b64encode = (data: ArrayBuffer | string) => {
  if (typeof data === "string") {
    data = textToBinary(data); // this way we can b64 encode also multibyte chars
  }
  return btoa(String.fromCharCode(...new Uint8Array(data)));
};

export const download = (content: string, fileName: string) => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  link.download = fileName;
  link.href = `data:application/xml;base64,${b64encode(content)}`;
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
  }, 15000);
};

const renderKwotaPodatkow = (data: NewForm) => {
  let res = [];
  let sum = 0;
  if (data.kwotaPodatek1Proc && data.kwotaPodatek1Proc !== "") {
    const val = Math.ceil(parseFloat(data.kwotaPodatek1Proc) * 0.01);
    sum += val;
    res.push(`<P_24>${entityEncode(data.kwotaPodatek1Proc)}</P_24>
        <P_25>${entityEncode(val.toString())}</P_25>`);
  }
  if (data.kwotaPodatek2Proc && data.kwotaPodatek2Proc !== "") {
    const val = Math.ceil(parseFloat(data.kwotaPodatek2Proc) * 0.02);
    sum += val;
    res.push(`<P_26>${entityEncode(data.kwotaPodatek2Proc)}</P_26>
        <P_27>${entityEncode(val.toString())}</P_27>`);
  }
  return res.join("\n");
};

const urzadDoKodu: { [key: string]: string } = Object.fromEntries(
  [...Object.entries(urzedySkarboweNazwy)].map(([k, v]) => [v, k])
);
export const renderXML = (data: NewForm) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Deklaracja xmlns="http://crd.gov.pl/wzor/2023/12/13/13064/">
    <Naglowek>
        <KodFormularza kodSystemowy="PCC-3 (6)" kodPodatku="PCC" rodzajZobowiazania="Z"
            wersjaSchemy="1-0E">PCC-3</KodFormularza>
        <WariantFormularza>6</WariantFormularza>
        <CelZlozenia poz="P_6">1</CelZlozenia>
        <Data poz="P_4">2024-07-29</Data>
        <KodUrzedu>${urzadDoKodu["data.UrzadSkarbowy"] ?? "0271"}</KodUrzedu>
    </Naglowek>
    <Podmiot1 rola="Podatnik">
        <OsobaFizyczna>
            <PESEL>${entityEncode(data.Podmiot.OsobaFizyczna.PESEL)}</PESEL>
            <ImiePierwsze>${entityEncode(
              data.Podmiot.OsobaFizyczna.ImiePierwsze.toLocaleUpperCase()
            )}</ImiePierwsze>
            <Nazwisko>${entityEncode(
              data.Podmiot.OsobaFizyczna.Nazwisko.toLocaleUpperCase()
            )}</Nazwisko>
            <DataUrodzenia>${entityEncode(
              data.Podmiot.OsobaFizyczna.DataUrodzenia
            )}</DataUrodzenia>
        </OsobaFizyczna>
        <AdresZamieszkaniaSiedziby rodzajAdresu="RAD">
            <AdresPol>
                <KodKraju>PL</KodKraju>
                <Wojewodztwo>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Wojewodztwo.toLocaleUpperCase()
                )}</Wojewodztwo>
                <Powiat>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Powiat.toLocaleUpperCase()
                )}</Powiat>
                <Gmina>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Gmina.toLocaleUpperCase()
                )}</Gmina>
                <Ulica>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Ulica.toLocaleUpperCase()
                )}</Ulica>
                <NrDomu>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrDomu.toLocaleUpperCase()
                )}</NrDomu>
                ${
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrLokalu
                    ? `<NrLokalu>${entityEncode(
                        data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrLokalu.toLocaleUpperCase()
                      )}</NrLokalu>`
                    : ""
                }
                <Miejscowosc>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Miejscowosc.toLocaleUpperCase()
                )}</Miejscowosc>
                <KodPocztowy>${entityEncode(
                  data.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.KodPocztowy.toLocaleUpperCase()
                )}</KodPocztowy>
            </AdresPol>
        </AdresZamieszkaniaSiedziby>
    </Podmiot1>
    <PozycjeSzczegolowe>
        <P_7>2</P_7>
        <P_20>1</P_20>
        <P_21>1</P_21>
        <P_22>1</P_22>
        <P_23>${entityEncode(data.opis)}</P_23>
        ${renderKwotaPodatkow(data)}
        <P_62>1</P_62>
    </PozycjeSzczegolowe>
<Pouczenia>1</Pouczenia>
</Deklaracja>
`;
};
