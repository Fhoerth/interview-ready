// 8.  *Intersection*;

// Given two (singly) linked lists, determine if the two lists intersect.
// Return the first intersecting node. Note that the intersection is defined
// based on reference, not value.

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default function intersection<T>(
  head1: Node<T> | undefined,
  head2: Node<T> | undefined
): Node<T> | undefined {
  const elements = new Set<Node<T>>();

  let node: Node<T> | undefined;

  node = head1;
  while (node) {
    elements.add(node);
    node = node.next;
  }

  node = head2;
  while (node) {
    if (elements.has(node)) {
      return node;
    }

    node = node.next;
  }

  return;
}
