// 5. *Sum Lists*: You have two numbers represented by a linked list,
// where each node contains a single digit. The digits are stored in reverse order,
// such that the Vs digit is at the head of the list.
// Write a function that adds the two numbers and returns the sum as a linked list.

// ```
// EXAMPLE
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.
// ```
export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function sumLists(
  head1: Node<number> | undefined,
  head2: Node<number> | undefined
): Node<number> | undefined {
  let head: Node<number> | undefined;
  let tail: Node<number> | undefined;

  let curr1: Node<number> | undefined = head1;
  let curr2: Node<number> | undefined = head2;

  let hasCarryOver: boolean = false;

  while (curr1 || curr2) {
    const sum: number = (curr1?.value || 0) + (curr2?.value || 0) + (hasCarryOver ? 1 : 0);
    const node: Node<number> = { value: sum % 10 };

    hasCarryOver = sum > 9;

    if (!head) {
      head = node;
      tail = node;
    } else {
      tail!.next = node;
      tail = node;
    }

    curr1 = curr1?.next;
    curr2 = curr2?.next;
  }

  if (hasCarryOver && tail) tail.next = { value: 1 };

  return head;
}
