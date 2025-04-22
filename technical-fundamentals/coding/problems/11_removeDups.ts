// 1. *Remove Dups*:

// Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?
//
// 1 -> 2 -> 2 -> 2 -> 4

import { Node, LinkedList } from '../ds/LinkedList';

export { Node };

export default function removeDups<T>(head?: Node<T>): Node<T> | undefined {
  const seen = new Set<T>(); // O(1)
  const list = new LinkedList(head); // O(n)

  for (const handler of list) {
    // O(n)
    if (seen.has(handler.value())) {
      // O(1)
      handler.remove(); // O(1)
      continue;
    }

    seen.add(handler.value()); // O(1)
  }

  return list.head();
}
