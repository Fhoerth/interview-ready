// 2.  *Return Kth to Last*:

// Implement an algorithm to find the kth to last element of a singly linked list.

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function kthToLast<T>(head: Node<T>, k: number): Node<T> | undefined {
  let j = 0;
  let pointer1: Node<T> | undefined = head;
  let pointer2: Node<T> | undefined = head;

  while (pointer2 && j < k) {
    pointer2 = pointer2.next;
    j += 1;
  }

  if (k > j) return undefined;

  while (pointer2) {
    pointer1 = pointer1?.next;
    pointer2 = pointer2?.next;
  }

  return pointer1;
}
