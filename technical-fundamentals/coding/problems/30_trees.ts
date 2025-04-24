// Write the basic tree algorithms of Depth-first-search and Breadth-first search.
import { Queue } from '../ds/Queue';

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
      let size = queue.size();

      while (size > 0) {
        const node = queue.dequeue();

        if (!node) {
          size -= 1;
          continue;
        }

        visit(node);

        queue.enqueue(node.left);
        queue.enqueue(node.right);

        size -= 1;
      }
    }
  }

  dfs(node: TreeNode<T> | undefined, visit: (node: TreeNode<T>) => void) {
    if (!node) return;

    visit(node);
    this.dfs(node.left, visit);
    this.dfs(node.right, visit);
  }
}
