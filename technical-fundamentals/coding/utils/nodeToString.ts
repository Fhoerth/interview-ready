import { Node } from '../ds/LinkedList';

export function nodeToString<T>(head?: Node<T> | undefined): string {
  let result = '[';
  let node: Node<T> | undefined = head;

  while (node) {
    result.concat(`${node.value}`).concat(', ');
    node = node.next;
  }

  return result.concat(']');
}
