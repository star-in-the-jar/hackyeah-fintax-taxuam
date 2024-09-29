import { NewForm } from "../form/PCC3";

export interface TreeNode {
  title: string;
  children?: TreeNode[];
}

export interface RenderNodesParams {
  nodes: TreeNode[],
  parentKey: string,
  formData: NewForm
}
