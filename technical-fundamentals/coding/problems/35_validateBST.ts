// 5. *Validate BST*:

// Implement a function to check if a binary tree is a binary search tree.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

function isSorted(values: number[]): boolean {
  for (let j = 1; j < values.length; j += 1) {
    if (values[j] < values[j - 1]) return false;
  }

  return true;
}

function traverseInOrder<T extends number>(node: TreeNode<T> | undefined, values: number[]): void {
  if (!node) return;

  traverseInOrder(node.left, values);
  values.push(node.value);
  traverseInOrder(node.right, values);
}

export default function validateBST<T extends number>(node: TreeNode<T> | undefined): boolean {
  const values: number[] = [];

  traverseInOrder(node, values);

  return isSorted(values);
}
