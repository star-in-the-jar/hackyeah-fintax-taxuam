import React, { createContext } from 'react';
import IndexLink from './IndexLink/IndexLink';
import { RenderNodesParams, TreeNode } from './IndexTree.types';
import { NewForm } from '../form/PCC3';

const nodes: TreeNode[] = [
  {
    title: 'B: Dane podatnika dokonującego zapłaty',
    children: [
      { title: 'Imię' },
      { title: 'Nazwisko' },
      { title: 'PESEL' },
      { title: 'Data urodzenia' },
      { title: 'Województwo' },
      { title: 'Powiat' },
      { title: 'Gmina' },
      { title: 'Nr domu' },
      { title: 'Nr lokalu' },
      { title: 'Miejscowość' },
      { title: 'Opis' },
      { title: "Kod pocztowy" },

    ]
  },
  {
    title: 'D: Obliczenie należnego podatku',
    children: [
      { title: 'Stawka Podatku 1%' },
      { title: 'Stawka Podatku 2%' },
    ]
  }
]

const IndexTree = ({ formData }: { formData: NewForm }) => {

  return (
    <div>
      {renderNodes({ nodes, parentKey: 'tree', formData })}
    </div>
  );
};

const renderNodes = ({ nodes, parentKey, formData }: RenderNodesParams) =>
  nodes.map((node, index) => {
    const key = `${parentKey}-${index}`;

    let value = ""
    const indicator = node.title
    if (indicator === "Imię") {
      value = formData.Podmiot.OsobaFizyczna.ImiePierwsze
    } else if (indicator === "Nazwisko") {
      value = formData.Podmiot.OsobaFizyczna.Nazwisko
    } else if (indicator === "PESEL") {
      value = formData.Podmiot.OsobaFizyczna.PESEL
    } else if (indicator === "Data urodzenia") {
      value = formData.Podmiot.OsobaFizyczna.DataUrodzenia
    } else if (indicator === "Województwo") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Wojewodztwo
    } else if (indicator === "Powiat") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Powiat
    } else if (indicator === "Gmina") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Gmina
    } else if (indicator === "Nr domu") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrDomu
    } else if (indicator === "Nr lokalu") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.NrLokalu
    } else if (indicator === "Miejscowość") {
      value = formData.Podmiot.AdresZamieszkaniaSiedziby.AdresPol.Miejscowosc
    } else if (indicator === "Opis") {
      value = formData.opis
    } else if (indicator === "Stawka Podatku 1%") {
      value = formData.kwotaPodatek1Proc
    } else if (indicator === "Stawka Podatku 2%") {
      value = formData.kwotaPodatek2Proc
    }

    return (
      <IndexLink key={key} title={node.title} value={value}>
        {node.children && (
          <div className="ml-4">
            {renderNodes({ nodes: node.children, parentKey: key, formData })}
          </div>
        )}
      </IndexLink>
    );
  });


export default IndexTree;
