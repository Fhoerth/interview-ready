// Write the basic tree algorithms of Depth-first-search and Breadth-first search.
import { Queue } from '../ds/Queue';
import { Stack } from '../ds/Stack';

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export class Tree<T> {
  bfs(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {
    const queue = new Queue<TreeNode<T> | undefined>();

    queue.enqueue(node);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();

      if (!node) continue;

      visit(node);

      queue.enqueue(node.left);
      queue.enqueue(node.right);
    }
  }

  dfs_recursive(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {
    if (!node) return;

    visit(node);
    this.dfs(node.left, visit);
    this.dfs(node.right, visit);
  }

  dfs(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {
    if (!node) return;

    const stack = new Stack<TreeNode<T> | undefined>();

    stack.push(node);

    while (!stack.isEmpty()) {
      const node = stack.pop();

      if (!node) continue;

      visit(node);

      stack.push(node.right);
      stack.push(node.left);
    }
  }
}
