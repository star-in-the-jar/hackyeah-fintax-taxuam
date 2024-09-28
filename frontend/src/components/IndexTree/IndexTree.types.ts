export interface TreeNode {
  href: string;
  title: string;
  children?: TreeNode[];
}

export interface RenderNodesParams {
  nodes: TreeNode[],
  parentKey: string,
}
