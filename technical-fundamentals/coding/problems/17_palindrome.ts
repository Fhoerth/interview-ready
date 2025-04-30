// 7. *Palindrome*:

// Implement a function to check if a linked list is a palindrome.

import { reverseList } from '../utils/reverseList';

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function isPalindrome<T>(head: Node<T> | undefined): boolean {
  let curr: Node<T> | undefined = head;
  let slowPointer: Node<T> | undefined = head;
  let fastPointer: Node<T> | undefined = head;

  while (fastPointer) {
    slowPointer = slowPointer?.next;
    fastPointer = fastPointer?.next?.next;
  }

  slowPointer = reverseList(slowPointer);

  while (slowPointer && curr) {
    if (slowPointer.value !== curr.value) return false;

    curr = curr?.next;
    slowPointer = slowPointer.next;
  }

  return !slowPointer;
}
