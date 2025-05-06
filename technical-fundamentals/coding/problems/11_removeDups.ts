// 1. *Remove Dups*:

// Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?
//
// 1 -> 2 -> 2 -> 2 -> 4

import { Node, LinkedList } from "../ds/LinkedList";

export { Node };

export default function removeDups<T>(head?: Node<T>): Node<T> | undefined {
  const list = new LinkedList(head); // O(n)
  const seen = new Set<T>();

  for (const handler of list) {
    if (seen.has(handler.value())) {
      handler.remove();
      continue;
    }

    seen.add(handler.value());
  }

  return list.head();
}
