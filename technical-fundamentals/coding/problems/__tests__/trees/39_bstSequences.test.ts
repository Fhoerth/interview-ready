import bstSequences from "../../39_bstSequences";
import { BST, isIncluded, TreeNode } from "../../../utils/bst";

const createNode = <T>(value: T, left?: TreeNode<T>, right?: TreeNode<T>): TreeNode<T> => {
  return { value, left, right };
};

describe("bstSequences", () => {
  test("returns correct sequences for valid input with 3 nodes", () => {
    /*
                    2
                   / \
                  1   3
        */
    const root1: TreeNode<number> = createNode(2, createNode(1), createNode(3));
    expect(bstSequences(root1)).toEqual(
      expect.arrayContaining([
        [2, 1, 3],
        [2, 3, 1],
      ])
    );
  });

  test("returns correct sequences for valid input", () => {
    /*
                    5
                   / \
                  3   7
                 / \ / \
                2  4 6  8
        */

    const root2: TreeNode<number> = createNode(
      5,
      createNode(3, createNode(2), createNode(4)),
      createNode(7, createNode(6), createNode(8))
    );
    let sequences = bstSequences(root2);
    expect(sequences.length).toEqual(80);
    expect(sequences).toEqual(
      expect.arrayContaining([
        [5, 3, 7, 2, 4, 6, 8],
        [5, 3, 7, 2, 6, 4, 8],
        [5, 3, 7, 4, 2, 6, 8],
        [5, 3, 7, 4, 6, 2, 8],
        [5, 7, 3, 2, 4, 6, 8],
        [5, 7, 3, 2, 6, 4, 8],
        [5, 7, 3, 4, 2, 6, 8],
        [5, 7, 3, 4, 6, 2, 8],
      ])
    );
  });

  test("Simple BST", () => {
    const nodes = [3, 1, 5, 4];
    const tree1 = new BST<number>();

    for (const node of nodes) tree1.insert(node);
    const sequences = bstSequences(tree1.root!);

    for (const sequence of sequences) {
      const tree2 = new BST<number>();
      for (const node of sequence) tree2.insert(node);

      expect(isIncluded(tree1.root, tree2.root));
      expect(isIncluded(tree2.root, tree1.root));
    }
  });
});
