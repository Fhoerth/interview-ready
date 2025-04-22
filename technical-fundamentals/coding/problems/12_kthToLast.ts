// 2.  *Return Kth to Last*:

// Implement an algorithm to find the kth to last element of a singly linked list.

import { Node, LinkedList } from '../ds/LinkedList';

export { Node };

export default function kthToLast<T>(head: Node<T>, k: number): Node<T> | undefined {
  const list = new LinkedList(head); // O(n)
  const size = list.size();

  for (const handler of list) {
    if (handler.idx() === size - k) {
      return handler.node();
    }
  }

  return undefined;
}
