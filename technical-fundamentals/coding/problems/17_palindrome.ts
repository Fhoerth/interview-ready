// 7. *Palindrome*:

// Implement a function to check if a linked list is a palindrome.

import { Node, LinkedList, Handler } from '../ds/LinkedList';
export { Node };

export default function isPalindrome<T>(head: Node<T> | undefined): boolean {
  const list = new LinkedList<T>(head);

  let handler1: Handler<T> | undefined;

  for (const handler of list) handler1 = handler;
  for (const handler2 of list) {
    if (handler1?.value() != handler2.value()) return false;
    handler1 = handler1.previous();
  }

  return true;
}
