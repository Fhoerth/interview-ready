// 3. *List of Depths*:

import { Queue } from '../ds/Queue';

// Given a binary tree, design an algorithm which creates a linked list
// of all the nodes at each depth (e.g., if you have a tree with depth D,
// you'll have D linked lists).

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export type ListNode<T> = {
  value: T;
  next?: ListNode<T>;
};

export default function listOfDepths<T>(root: TreeNode<T> | null): ListNode<T>[] {
  const levels: ListNode<T>[] = [];
  const queue = new Queue<TreeNode<T> | undefined | null>();

  queue.enqueue(root);

  while (!queue.isEmpty()) {
    let levelListHeadNode: ListNode<T> | undefined;
    let currentListNode: ListNode<T> | undefined;
    let size = queue.size();

    while (size > 0) {
      const treeNode = queue.dequeue();

      if (!treeNode) {
        size -= 1;
        continue;
      }

      const listNode = { value: treeNode.value };

      if (!levelListHeadNode) levelListHeadNode = listNode;
      else currentListNode!.next = listNode;

      currentListNode = listNode;

      queue.enqueue(treeNode.left);
      queue.enqueue(treeNode.right);

      size -= 1;
    }

    if (levelListHeadNode) levels.push(levelListHeadNode);
  }

  return levels;
}
