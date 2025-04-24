// 4. *Check Balanced*:

// Implement a function to check if a binary tree is balanced.
// For the purposes of this question, a balanced tree is defined to be a tree
// such that the heights of the two subtrees of any node never differ by more than one.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

type Result = {
  balanced: boolean;
  height: number;
}

function recursivelyCheckBalanced<T>(tree?: TreeNode<T> | null): Result {
  if (!tree) return { balanced: true, height: -1 };

  const left = recursivelyCheckBalanced(tree.left);
  const right = recursivelyCheckBalanced(tree.right);

  const balanced =
    left.balanced &&
    right.balanced &&
    Math.abs(left.height - right.height) <= 1;
  const height = 1 + Math.max(left.height, right.height);

  return { balanced, height };
}

export default function checkBalanced<T>(tree?: TreeNode<T> | null): boolean {
  return recursivelyCheckBalanced(tree).balanced;
}
