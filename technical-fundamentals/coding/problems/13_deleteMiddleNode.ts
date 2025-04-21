// 3. *Delete Middle Node*:

// Implement an algorithm to delete a node in the middle
// (i.e., any node but the first and last node, not necessarily the exact middle)
// of a singly linked list, given only access to that node.

// ```
// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72
// ```

import { Node, LinkedList } from '../ds/LinkedList';

export { Node };

export default function deleteMiddleNode<T>(head: Node<T>, position: number): Node<T> | undefined {
  const list = new LinkedList(head); // O(n)
  const size = list.size();

  if (position == 0 || position === size - 1) {
    return list.unsafeHead();
  }

  for (const handler of list) {
    if (handler.idx() === position) {
      handler.remove();
    }
  }

  return list.unsafeHead();
}
