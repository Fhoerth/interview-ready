// 6.  Suppose the digits are stored in forward order. Repeat the above problem.

// ```
// EXAMPLE
// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295
// Output:9 -> 1 -> 2,Thatis,912.
// ```

import { Node, LinkedList, Handler } from '../ds/LinkedList';
import { assert } from '../utils/assert';

export { Node };

export default function sumListsForwardOrder(
  head1: Node<number> | undefined,
  head2: Node<number> | undefined
): Node<number> | undefined {
  const list1 = new LinkedList<number>(head1);
  const list2 = new LinkedList<number>(head2);

  const result = new LinkedList<number>();

  let handler1: Handler<number> | undefined;
  let handler2: Handler<number> | undefined;

  for (const h of list1) handler1 = h;
  for (const h of list2) handler2 = h;

  let hasCarryOver: boolean = false;
  let sum: number = 0;

  while (handler1 !== undefined || handler2 !== undefined) {
    sum = (handler1?.value() || 0) + (handler2?.value() || 0) + (hasCarryOver ? 1 : 0);
    hasCarryOver = sum % 10 < sum;

    if (hasCarryOver) result.prepend(sum % 10);
    else result.prepend(sum);

    handler1 = handler1?.previous();
    handler2 = handler2?.previous();
  }

  if (hasCarryOver) result.prepend(1);

  return result.head();
}
