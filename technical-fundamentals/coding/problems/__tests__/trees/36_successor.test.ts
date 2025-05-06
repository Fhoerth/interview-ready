import successor, { TreeNode } from "../../36_successor";

function link<T>(parent: TreeNode<T>, child: TreeNode<T>, isLeft: boolean) {
  child.parent = parent;

  if (isLeft) parent.left = child;
  else parent.right = child;
}

describe("successor", () => {
  test("returns correct in-order successor", () => {
    /*
                    5
                   / \
                  3   7
                 / \ / \
                2  4 6  8
        */
    const node2: TreeNode<number> = { value: 2 };
    const node4: TreeNode<number> = { value: 4 };
    const node6: TreeNode<number> = { value: 6 };
    const node8: TreeNode<number> = { value: 8 };

    const node3: TreeNode<number> = { value: 3, left: node2, right: node4 };
    const node7: TreeNode<number> = { value: 7, left: node6, right: node8 };
    const node5: TreeNode<number> = { value: 5, left: node3, right: node7 };

    node2.parent = node3;
    node4.parent = node3;
    node3.parent = node5;

    node6.parent = node7;
    node8.parent = node7;
    node7.parent = node5;

    // Successors
    expect(successor(node2)?.value).toBe(3);
    expect(successor(node3)?.value).toBe(4);
    expect(successor(node4)?.value).toBe(5);
    expect(successor(node5)?.value).toBe(6);
    expect(successor(node6)?.value).toBe(7);
    expect(successor(node7)?.value).toBe(8);
    expect(successor(node8)).toBeUndefined();
  });

  test("returns undefined for node without successor", () => {
    const node1: TreeNode<number> = { value: 1 };
    expect(successor(node1)).toBeUndefined();
  });

  test("handles deep and asymmetric structures", () => {
    const node3: TreeNode<number> = { value: 3 };
    const node5: TreeNode<number> = { value: 5, left: node3 };

    const node13: TreeNode<number> = { value: 13 };
    const node15: TreeNode<number> = { value: 15, left: node13 };

    const node24: TreeNode<number> = { value: 24 };
    const node26: TreeNode<number> = { value: 26 };
    const node25: TreeNode<number> = { value: 25, left: node24, right: node26 };

    const node30: TreeNode<number> = { value: 30, left: node25 };
    const node20: TreeNode<number> = { value: 20, left: node15, right: node30 };

    const node10: TreeNode<number> = { value: 10, left: node5, right: node20 };

    link(node5, node3, true);
    link(node10, node5, true);
    link(node10, node20, false);
    link(node20, node15, true);
    link(node15, node13, true);
    link(node20, node30, false);
    link(node30, node25, true);
    link(node25, node24, true);
    link(node25, node26, false);

    expect(successor(node3)?.value).toBe(5);
    expect(successor(node5)?.value).toBe(10);
    expect(successor(node10)?.value).toBe(13);
    expect(successor(node13)?.value).toBe(15);
    expect(successor(node15)?.value).toBe(20);
    expect(successor(node20)?.value).toBe(24);
    expect(successor(node24)?.value).toBe(25);
    expect(successor(node25)?.value).toBe(26);
    expect(successor(node26)?.value).toBe(30);
    expect(successor(node30)).toBeUndefined();
  });

  test("chaotic successor test", () => {
    const node5: TreeNode<number> = { value: 5 };
    const node3: TreeNode<number> = { value: 3 };

    const node13: TreeNode<number> = { value: 13 };
    const node15: TreeNode<number> = { value: 15 };

    const node24: TreeNode<number> = { value: 24 };
    const node35: TreeNode<number> = { value: 35 };
    const node40: TreeNode<number> = { value: 40 };

    const node20: TreeNode<number> = { value: 20 };
    const node10: TreeNode<number> = { value: 10 };

    link(node10, node5, true);
    link(node10, node20, false);
    link(node5, node3, true);
    link(node20, node15, true);
    link(node15, node13, true);
    link(node20, node40, false);
    link(node40, node35, true);
    link(node35, node24, true);

    expect(successor(node3)?.value).toBe(5);
    expect(successor(node5)?.value).toBe(10);
    expect(successor(node10)?.value).toBe(13);
    expect(successor(node13)?.value).toBe(15);
    expect(successor(node15)?.value).toBe(20);
    expect(successor(node20)?.value).toBe(24);
    expect(successor(node24)?.value).toBe(35);
    expect(successor(node35)?.value).toBe(40);
    expect(successor(node40)).toBeUndefined();
  });

  test("increasing BST", () => {
    const node1: TreeNode<number> = { value: 1 };
    const node2: TreeNode<number> = { value: 2 };
    const node3: TreeNode<number> = { value: 3 };
    const node4: TreeNode<number> = { value: 4 };

    link(node1, node2, false);
    link(node2, node3, false);
    link(node3, node4, false);

    expect(successor(node1)?.value).toBe(2);
    expect(successor(node2)?.value).toBe(3);
    expect(successor(node3)?.value).toBe(4);
    expect(successor(node4)?.value).toBeUndefined();
  });
});
