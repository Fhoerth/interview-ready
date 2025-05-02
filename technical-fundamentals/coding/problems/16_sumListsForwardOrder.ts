// 6.  Suppose the digits are stored in forward order. Repeat the above problem.

// ```
// EXAMPLE
// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295
// Output:9 -> 1 -> 2,Thatis,912.
// ```
export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function sumListsForwardOrder(
  head1: Node<number> | undefined,
  head2: Node<number> | undefined
): Node<number> | undefined {
  const stack1: (Node<number> | undefined)[] = [];
  const stack2: (Node<number> | undefined)[] = [];

  let head: Node<number> | undefined;

  let curr1: Node<number> | undefined = head1;
  let curr2: Node<number> | undefined = head2;

  while (curr1 || curr2) {
    if (curr1) stack1.push(curr1);
    if (curr2) stack2.push(curr2);

    curr1 = curr1?.next;
    curr2 = curr2?.next;
  }

  let hasCarryOver: boolean = false;

  while (stack1.length || stack2.length) {
    let val1: number = stack1.pop()?.value || 0;
    let val2: number = stack2.pop()?.value || 0;

    const sum: number = val1 + val2 + (hasCarryOver ? 1 : 0);
    const node: Node<number> = { value: sum % 10 };

    hasCarryOver = sum > 9;

    node.next = head;
    head = node;
  }

  if (hasCarryOver && head) {
    const node: Node<number> = { value: 1 };

    node.next = head;
    head = node;
  }

  return head;
}
