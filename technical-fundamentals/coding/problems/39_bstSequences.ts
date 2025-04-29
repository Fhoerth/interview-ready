// 9. *BST Sequences*: A binary search tree was created by traversing through an array from left to right and inserting each element.
// Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.

import { Queue } from '../ds/Queue';

// ```
// EXAMPLE Input:
/*
            2
           / \
          1   3
*/
// Output: [[2, 1, 3], [2, 3, 1]]
// ```

/**
 * Notes about this problem:
 * This is the problem I liked the most, since I had to
 * play around with several BST to figure out that, given
 * a sequence of numbers to create a BST,
 * if a permutation is performed at any level it will produce
 * the same output.
 * I'm not pretty sure how to calculate the complexity for
 * this algorithm since the worst case scenario is when
 * a complete balanced, I'm not pretty sure the complexity
 * of the algorithm but should be close to:
 * O((n/2)!) where n = number of nodes in the tree
 */
import { TreeNode } from '../utils/bst';

export { TreeNode };

type ParentMap<T> = Map<TreeNode<T>, boolean>;
type ChildrenMap<T> = Map<TreeNode<T>, TreeNode<T>[]>;

function buildDependencies<T>(root: TreeNode<T>): {
  nodes: TreeNode<T>[];
  parentMap: ParentMap<T>;
  childrenMap: ChildrenMap<T>;
} {
  const nodes: TreeNode<T>[] = [];
  const parentMap: ParentMap<T> = new Map();
  const childrenMap: ChildrenMap<T> = new Map();

  const queue = new Queue<TreeNode<T>>();
  queue.enqueue(root);
  parentMap.set(root, true);

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;

    nodes.push(node);
    childrenMap.set(node, []);

    if (node.left) {
      parentMap.set(node.left, false);
      childrenMap.get(node)!.push(node.left);
      queue.enqueue(node.left);
    }

    if (node.right) {
      parentMap.set(node.right, false);
      childrenMap.get(node)!.push(node.right);
      queue.enqueue(node.right);
    }
  }

  return { nodes, parentMap, childrenMap };
}

function permute<T>(
  nodes: TreeNode<T>[],
  parentMap: ParentMap<T>,
  childrenMap: ChildrenMap<T>
): TreeNode<T>[][] {
  const result: TreeNode<T>[][] = [];
  const visited: Set<TreeNode<T>> = new Set();

  function backtrack(currentSolution: TreeNode<T>[]): void {
    if (currentSolution.length === nodes.length) {
      result.push([...currentSolution]);
      return;
    }

    for (let j = 0; j < nodes.length; j += 1) {
      if (visited.has(nodes[j])) continue;
      if (!parentMap.get(nodes[j])) continue;

      currentSolution.push(nodes[j]);
      visited.add(nodes[j]);
      for (const child of childrenMap.get(nodes[j]) || []) parentMap.set(child, true);

      backtrack(currentSolution);

      for (const child of childrenMap.get(nodes[j]) || []) parentMap.set(child, false);
      visited.delete(nodes[j]);
      currentSolution.pop();
    }
  }

  backtrack([]);

  return result;
}

function pluckValues<T>(nodes: TreeNode<T>[]) {
  return nodes.map((node) => node.value);
}

export default function bstSequences<T extends number>(root: TreeNode<T>): number[][] {
  const { nodes, parentMap, childrenMap } = buildDependencies(root);
  return permute(nodes, parentMap, childrenMap).map(pluckValues);
}
