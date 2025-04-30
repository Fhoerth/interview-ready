export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function reverseList<T>(head: Node<T> | undefined): Node<T> | undefined {
  let prev: Node<T> | undefined = undefined;
  let curr: Node<T> | undefined = head;

  while (curr) {
    const next = curr.next;

    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
