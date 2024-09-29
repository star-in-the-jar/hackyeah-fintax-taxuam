import { NewForm } from "../form/PCC3";
import IndexLink from "./IndexLink/IndexLink";
import { RenderNodesParams, TreeNode } from "./IndexTree.types";

const nodes: TreeNode[] = [
  {
    title: "B: Dane podatnika dokonującego zapłaty",
    children: [
      { isLeaf: true, title: "Urząd skarbowy" },
      { isLeaf: true, title: "Imię" },
      { isLeaf: true, title: "Nazwisko" },
      { isLeaf: true, title: "PESEL" },
      { isLeaf: true, title: "Data urodzenia" },
      { isLeaf: true, title: "Województwo" },
      { isLeaf: true, title: "Powiat" },
      { isLeaf: true, title: "Gmina" },
      { isLeaf: true, title: "Nr domu" },
      { isLeaf: true, title: "Nr lokalu" },
      { isLeaf: true, title: "Miejscowość" },
      { isLeaf: true, title: "Opis" },
      { isLeaf: true, title: "Kod pocztowy" },
    ],
  },
  {
    title: "D: Obliczenie należnego podatku",
    children: [
      { isLeaf: true, title: "Stawka Podatku 1%" },
      { isLeaf: true, title: "Stawka Podatku 2%" },
    ],
  },
];

const IndexTree = ({ formData }: { formData: NewForm }) => {
  return <div>{renderNodes({ nodes, parentKey: "tree", formData })}</div>;
};

// abandon hope all ye who enter here
const renderNodes = ({ nodes, parentKey, formData }: RenderNodesParams) =>
  nodes.map((node, index) => {
    const key = `${parentKey}-${index}`;

    // Kiedyś zapytano mnie, czy to działa.
    // Odpowiedziałem, że tak.
    // Nie powiedziałem im jednak jakim kosztem.

    let value = "";
    const indicator = node.title;
    if (indicator === "Imię") {
      value = formData.Podmiot.OsobaFizyczna.ImiePierwsze;
    } else if (indicator === "Nazwisko") {
      value = formData.Podmiot.OsobaFizyczna.Nazwisko;
    } else if (indicator === "PESEL") {
      value = formData.Podmiot.OsobaFizyczna.PESEL;
    } else if (indicator === "Data urodzenia") {
      value = formData.Podmiot.OsobaFizyczna.DataUrodzenia;
    } else if (indicator === "Województwo") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Wojewodztwo;
    } else if (indicator === "Powiat") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Powiat;
    } else if (indicator === "Gmina") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Gmina;
    } else if (indicator === "Nr domu") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrDomu;
    } else if (indicator === "Nr lokalu") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrLokalu;
    } else if (indicator === "Miejscowość") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Miejscowosc;
    } else if (indicator === "Opis") {
      value = formData.opis;
    } else if (indicator === "Stawka Podatku 1%") {
      value = formData.kwotaPodatek1Proc;
    } else if (indicator === "Stawka Podatku 2%") {
      value = formData.kwotaPodatek2Proc;
    } else if (indicator === "Kod pocztowy") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.KodPocztowy;
    } else if (indicator === "Urząd skarbowy") {
      value = formData.UrzadSkarbowy;
    }

    return (
      <IndexLink
        key={key}
        title={node.title}
        value={value}
        isLeaf={node.isLeaf ?? false}
      >
        {node.children && (
          <div>
            {renderNodes({ nodes: node.children, parentKey: key, formData })}
          </div>
        )}
      </IndexLink>
    );
  });

export default IndexTree;
