// 6. *Successor*:

// Write an algorithm to find the "next" node
// (i.e., in-order successor) of a given node in a binary search tree.
// You may assume that each node has a link to its parent.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
  parent?: TreeNode<T>; // Link to parent node
};

function leftMost<T>(node: TreeNode<T> | undefined): TreeNode<T> | undefined {
  if (!node) return undefined;
  return leftMost(node?.left) || node;
}

export default function successor<T extends number>(node: TreeNode<T>): TreeNode<T> | undefined {
  if (!node) return undefined;

  if (node.right) return leftMost(node.right);
  let currentNode: TreeNode<T> | undefined = node;

  while (currentNode && currentNode.value <= node.value) {
    currentNode = currentNode.parent;
  }

  return currentNode;
}
