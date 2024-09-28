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

export const renderXML = (data: any) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
<Deklaracja xmlns="http://crd.gov.pl/wzor/2023/12/13/13064/">
    <Naglowek>
        <KodFormularza kodSystemowy="PCC-3 (6)" kodPodatku="PCC" rodzajZobowiazania="Z"
            wersjaSchemy="1-0E">PCC-3</KodFormularza>
        <WariantFormularza>6</WariantFormularza>
        <CelZlozenia poz="P_6">1</CelZlozenia>
        <Data poz="P_4">2024-07-29</Data>
        <KodUrzedu>0271</KodUrzedu>
    </Naglowek>
    <Podmiot1 rola="Podatnik">
        <OsobaFizyczna>
            <PESEL>${entityEncode(data.pesel)}</PESEL>
            <ImiePierwsze>KAMIL</ImiePierwsze>
            <Nazwisko>WIRTUALNY</Nazwisko>
            <DataUrodzenia>1954-12-18</DataUrodzenia>
        </OsobaFizyczna>
        <AdresZamieszkaniaSiedziby rodzajAdresu="RAD">
            <AdresPol>
                <KodKraju>PL</KodKraju>
                <Wojewodztwo>ŚLĄSKIE</Wojewodztwo>
                <Powiat>M. KATOWICE</Powiat>
                <Gmina>M. KATOWICE</Gmina>
                <Ulica>ALPEJSKA</Ulica>
                <NrDomu>6</NrDomu>
                <NrLokalu>66</NrLokalu>
                <Miejscowosc>KATOWICE</Miejscowosc>
                <KodPocztowy>66-666</KodPocztowy>
            </AdresPol>
        </AdresZamieszkaniaSiedziby>
    </Podmiot1>
    <PozycjeSzczegolowe>
        <P_7>2</P_7>
        <P_20>1</P_20>
        <P_21>1</P_21>
        <P_22>1</P_22>
        <P_23>Sprzedałem auto</P_23>
        <P_24>10000</P_24>
        <P_25>100</P_25>
        <P_46>100</P_46>
        <P_53>100</P_53>
        <P_62>1</P_62>
    </PozycjeSzczegolowe>
<Pouczenia>1</Pouczenia>
</Deklaracja>
`;
};
