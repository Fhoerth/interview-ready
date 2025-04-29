// 3. *Delete Middle Node*:

// Implement an algorithm to delete a node in the middle
// (i.e., any node but the first and last node, not necessarily the exact middle)
// of a singly linked list, given only access to that node.

// ```
// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72
// ```

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function deleteMiddleNode<T>(head: Node<T>, position: number): Node<T> | undefined {
  let previousNode: Node<T> | undefined = undefined;
  let currNode: Node<T> | undefined = head;

  while (position > 0) {
    previousNode = currNode;
    currNode = currNode?.next;
    position -= 1;
  }

  if (previousNode) previousNode.next = previousNode.next?.next;

  return head;
}
