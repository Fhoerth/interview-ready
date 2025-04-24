// 2. *Minimal Tree*:

// Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.
//
// A binary search tree is a search where for each node,
// lesser elements are on the left node, and greater elements on the right node.
//
// Input: [1,2,3,4,5,6,7,8]
// Output:
//      5
//   2  |  7
// 1   3|6   8
//
//

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

function recursiveMinimalTree<T>(
  sortedArray: T[],
  start: number,
  end: number
): TreeNode<T> | undefined {
  if (start > end) return undefined;

  const middle = Math.ceil((start + end) / 2);

  return {
    value: sortedArray[middle],
    left: recursiveMinimalTree(sortedArray, start, middle - 1),
    right: recursiveMinimalTree(sortedArray, middle + 1, end),
  };
}

export default function minimalTree<T>(sortedArray: T[]): TreeNode<T> | undefined {
  return recursiveMinimalTree(sortedArray, 0, sortedArray.length - 1);
}
