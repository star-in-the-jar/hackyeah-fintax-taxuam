import React from 'react';
import IndexLink from './IndexLink/IndexLink';
import { RenderNodesParams, TreeNode } from './IndexTree.types';
import { useStateManager } from '@/state';

const mockedData: TreeNode[] = [
  {
    href: 'PESEL',
    title: 'Część A: Dane osobowe',
    children: [
      { href: 'Imie', title: 'Imie' },
      { href: '#', title: 'Nazwisko' },
      { href: '#', title: 'PESEL' }
    ]
  },
  {
    href: '#',
    title: 'Część B: Dane podatkowe',
    children: [
      { href: '#', title: 'Przychód' },
      { href: '#', title: 'Koszty' },
      { href: '#', title: 'Dochód' }
    ]
  }
]

const IndexTree: React.FC = () => {
  const stateManager = useStateManager();

  return (
    <div className="index-tree ">
      {renderNodes({ nodes: mockedData, parentKey: 'tree' })}
    </div>
  );
};

const renderNodes = ({ nodes, parentKey }: RenderNodesParams) =>
  nodes.map((node, index) => {
    const key = `${parentKey}-${index}`;

    return (
      <IndexLink key={key} href={node.href} title={node.title}>
        {node.children && (
          <div className="ml-4">
            {renderNodes({ nodes: node.children, parentKey: key })}
          </div>
        )}
      </IndexLink>
    );
  });


export default IndexTree;
