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

function swap(level: number[], a: number, b: number): void {
  const tmp = level[a];
  level[a] = level[b];
  level[b] = tmp;
}

function flatMap(comb: number[][]): number[] {
  return comb.reduce((acc, curr) => [...acc, ...curr], [] as number[]);
}

function permute(level: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(currentIdx: number): void {
    if (currentIdx === level.length) {
      result.push([...level]);
      return;
    }

    for (let j = currentIdx; j < level.length; j += 1) {
      swap(level, j, currentIdx);
      backtrack(currentIdx + 1);
      swap(level, currentIdx, j);
    }
  }

  backtrack(0);

  return result;
}

function combine(permutations: number[][][]): number[][] {
  const result: number[][] = [];

  function backtrack(currentCombination: number[][], currentIdx: number): void {
    if (currentIdx === permutations.length) {
      result.push([...flatMap(currentCombination)]);
      return;
    }

    for (let j = 0; j < permutations[currentIdx].length; j += 1) {
      currentCombination.push(permutations[currentIdx][j]);
      backtrack(currentCombination, currentIdx + 1);
      currentCombination.pop();
    }
  }

  backtrack([], 0);

  return result;
}

export default function bstSequences<T extends number>(root: TreeNode<T>): number[][] {
  let size: number;
  const queue = new Queue<TreeNode<T>>();
  const levels: T[][] = [];

  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const level: T[] = [];

    size = queue.size();
    while (size > 0) {
      const node = queue.dequeue()!;

      level.push(node.value);
      size -= 1;

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }

    levels.push(level);
  }

  const permutations: number[][][] = levels.map(permute);
  const result: number[][] = combine(permutations);

  return result;
}
