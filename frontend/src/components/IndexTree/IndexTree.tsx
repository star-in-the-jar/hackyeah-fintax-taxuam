import React from 'react';
import IndexLink from './IndexLink/IndexLink';
import { RenderNodesParams, TreeNode } from './IndexTree.types';

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

const IndexTree: React.FC = () => {
  return (
    <div>
      {renderNodes({ nodes, parentKey: 'tree' })}
    </div>
  );
};

const renderNodes = ({ nodes, parentKey }: RenderNodesParams) =>
  nodes.map((node, index) => {
    const key = `${parentKey}-${index}`;

    return (
      <IndexLink key={key} title={node.title}>
        {node.children && (
          <div className="ml-4">
            {renderNodes({ nodes: node.children, parentKey: key })}
          </div>
        )}
      </IndexLink>
    );
  });


export default IndexTree;
