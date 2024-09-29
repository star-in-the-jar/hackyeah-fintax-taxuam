import { NewForm } from "../form/PCC3";

export interface TreeNode {
  title: string;
  children?: TreeNode[];
  isLeaf?: boolean
}

export interface RenderNodesParams {
  nodes: TreeNode[],
  parentKey: string,
  formData: NewForm
}
