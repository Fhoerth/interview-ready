// 4. *Partition*:

// Write code to partition a linked list around a value x,
// such that all nodes less than x come before all nodes greater than or equal to x.
// If x is contained within the list, the values of x only need to be after the elements
// less than x (see below). The partition element x can appear anywhere in the
// "right partition"; it does not need to appear between the left and right partitions.

// ```
// EXAMPLE
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1[partition=5]
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// ```

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function partition<T>(head: Node<T> | undefined, x: T): Node<T> | undefined {
  let lessThanXHead: Node<T> | undefined = undefined;
  let lessThanXCurr: Node<T> | undefined = undefined;
  let greaterOrEqualThanXHead: Node<T> | undefined = undefined;
  let greaterOrEqualThanXCurr: Node<T> | undefined = undefined;
  let curr: Node<T> | undefined = head;

  while (curr) {
    const node = { value: curr.value };

    if (curr.value < x) {
      if (!lessThanXCurr) {
        lessThanXHead = node;
        lessThanXCurr = node;
      } else {
        lessThanXCurr.next = node;
        lessThanXCurr = node;
      }
    } else {
      if (!greaterOrEqualThanXCurr) {
        greaterOrEqualThanXHead = node;
        greaterOrEqualThanXCurr = node;
      } else {
        greaterOrEqualThanXCurr.next = node;
        greaterOrEqualThanXCurr = node;
      }
    }

    curr = curr.next;
  }

  if (lessThanXHead && lessThanXCurr) {
    lessThanXCurr.next = greaterOrEqualThanXHead;
    return lessThanXHead;
  }

  return greaterOrEqualThanXHead;
}
