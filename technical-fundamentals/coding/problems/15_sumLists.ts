// 5. *Sum Lists*: You have two numbers represented by a linked list,
// where each node contains a single digit. The digits are stored in reverse order,
// such that the Vs digit is at the head of the list.
// Write a function that adds the two numbers and returns the sum as a linked list.

// ```
// EXAMPLE
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.
// ```
import { sumTwoLists } from './16_sumListsForwardOrder';

import { Node, LinkedList } from '../ds/LinkedList';

export { Node };

export default function sumLists(
  head1: Node<number> | undefined,
  head2: Node<number> | undefined
): Node<number> | undefined {
  const list1 = new LinkedList<number>(head1);
  const list2 = new LinkedList<number>(head2);

  list1.reverse();
  list2.reverse();

  return sumTwoLists(list1.head(), list2.head(), false);
}
