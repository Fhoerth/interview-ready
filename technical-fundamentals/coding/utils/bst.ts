export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export class BST<T extends number> {
  root?: TreeNode<T>;

  recursiveInsert(currentNode: TreeNode<T> | undefined, node: TreeNode<T>): TreeNode<T> {
    if (!currentNode) return node;

    if (node.value >= currentNode.value) {
      currentNode.right = this.recursiveInsert(currentNode.right, node);
    } else {
      currentNode.left = this.recursiveInsert(currentNode.left, node);
    }

    return currentNode;
  }

  insert(value: T): void {
    const node: TreeNode<T> = { value };
    this.root = this.recursiveInsert(this.root, node);
  }
}

export function isIncluded<T extends number>(
  nodeA: TreeNode<T> | undefined,
  nodeB: TreeNode<T> | undefined
): boolean {
  if (nodeA && nodeB) {
    return (
      nodeA.value === nodeB.value &&
      isIncluded(nodeA.left, nodeB.left) &&
      isIncluded(nodeA.right, nodeB.right)
    );
  }

  return !nodeA && !nodeB;
}
