// 8. *First Common Ancestor*:

// Design an algorithm and write code to find the first common ancestor of two nodes
// in a binary tree. Avoid storing additional nodes in a data structure.
// NOTE: This is not necessarily a binary search tree.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

function belongs<T>(root: TreeNode<T> | undefined, node: TreeNode<T>): boolean {
  if (!root) return false;
  return root === node || belongs(root.left, node) || belongs(root.right, node);
}

function findFirstCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  p: TreeNode<T>,
  q: TreeNode<T>
): TreeNode<T> | undefined {
  if (!root) return undefined;

  const onRoot = belongs(root, p) && belongs(root, q);

  if (onRoot) {
    if (belongs(root.left, p) && belongs(root.left, q)) return root.left;
    if (belongs(root.right, p) && belongs(root.right, q)) return root.right;

    return root;
  }

  return undefined;
}

export default function firstCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  p: TreeNode<T>,
  q: TreeNode<T>
): TreeNode<T> | undefined {
  return findFirstCommonAncestor(root, p, q);
}
