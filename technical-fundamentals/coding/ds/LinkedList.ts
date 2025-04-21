import { assert } from '../utils/assert';

export class Node<T> {
  value: T;
  next: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

class Handler<T> {
  #value: T;
  #removeFn: () => void;

  constructor(
    value: T,
    removeFn: () => void
  ) {
    this.#value = value;
    this.#removeFn = removeFn;
  }

  value() {
    return this.#value;
  }

  remove() {
    this.#removeFn();
  }
}

class Iterator<T> {
  #list: LinkedList<T>;
  #currentNode: Node<T> | undefined;
  #previousNode: Node<T> | undefined = undefined;

  constructor(head: Node<T> | undefined, list: LinkedList<T>) {
    this.#currentNode = head;
    this.#list = list;
  }

  next(): IteratorResult<Handler<T>> {
    if (!this.#currentNode) {
      return { value: undefined as any, done: true };
    }
  
    const node = this.#currentNode;
    const prev = this.#previousNode;
  
    this.#previousNode = this.#currentNode;
    this.#currentNode = this.#currentNode.next;
  
    const handler = new Handler<T>(
      node.value,
      () => this.#list.remove(node, prev || undefined)
    );
  
    return { value: handler, done: false };
  }
}

export class LinkedList<T> {
  #head: Node<T> | undefined = undefined;
  #tail: Node<T> | undefined = undefined;
  #size = 0;

  constructor(head?: Node<T>) {
    let node: Node<T> | undefined = head || undefined;

    while (node) {
      this.append(node.value);
      node = node.next;
    }
  }

  prepend(value: T): Node<T> {
    const node = new Node(value);

    if (!this.#head && !this.#tail) {
      this.#head = node;
      this.#tail = node;
      this.#size += 1;

      return node;
    }

    assert(this.#head);

    node.next = this.#head;

    this.#head = node;
    this.#size += 1;

    return node;
  }

  append(value: T): Node<T> {
    const node = new Node(value);

    if (!this.#head && !this.#tail) {
      this.#head = node;
      this.#tail = node;
      this.#size += 1;

      return node;
    }

    assert(this.#tail);

    this.#tail.next = node;
    this.#tail = node;
    this.#size += 1;

    return node;
  }

  remove(node: Node<T>, previousNode?: Node<T>): void {
    assert(this.#head);
    assert(this.#tail);
    if (this.#head === node) {
      this.removeFirst();
      return;
    }

    if (!previousNode) {
      previousNode = this.#head;

      while (previousNode?.next && previousNode.next !== node) {
        previousNode = previousNode.next;
      }

      if (!previousNode || previousNode.next !== node)
        throw new Error('Node not found in the list');
    }

    previousNode.next = node.next;
    this.#size -= 1;

    if (this.#tail === node) this.#tail = previousNode;
  }

  head(): T | undefined {
    return this.#head?.value || undefined;
  }

  tail(): T | undefined {
    return this.#tail?.value || undefined;
  }

  removeFirst() {
    if (this.#head === this.#tail) {
      this.#head = undefined;
      this.#tail = undefined;
      this.#size = 0;

      return;
    }

    assert(this.#head);

    this.#head = this.#head.next;
    this.#size -= 1;

    if (this.#size === 1) {
      this.#tail = this.#head;
    }
  }

  size(): number {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  [Symbol.iterator](): Iterator<T> {
    return new Iterator(this.#head, this);
  }

  /**
   * Only for testing purposes, it returns the head,
   * it breaks encapsulation.
   */
  unsafeHead(): Node<T> | undefined {
    return this.#head;
  }
}
