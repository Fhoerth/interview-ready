import { assert } from '../utils/assert';

export class Node<T> {
  value: T;
  next?: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

class Handler<T> {
  #idx: number;
  #node: Node<T>;
  #previousNode?: Node<T>;
  #removeFn: (node: Node<T>, previousNode?: Node<T>) => void;

  constructor(
    idx: number,
    node: Node<T>,
    removeFn: (node: Node<T>, previousNode?: Node<T>) => void,
    previusNode?: Node<T>,
  ) {
    this.#idx = idx;
    this.#node = node;
    this.#removeFn = removeFn;
    this.#previousNode = previusNode;
  }

  value(): T {
    return this.#node.value;
  }

  remove(): void {
    this.#removeFn(this.#node, this.#previousNode);
  }

  idx(): number {
    return this.#idx;
  }

  /**
   * WARNING: Only for testing purposes.
   * It returns the node and it breaks encapsulation.
   * It allows the linked list invariant to be broken.
   */
  unsafeNode(): Node<T> {
    return this.#node;
  }
}

class Iterator<T> {
  #idx: number;
  #list: LinkedList<T>;
  #currentNode: Node<T> | undefined;

  constructor(head: Node<T> | undefined, list: LinkedList<T>) {
    this.#idx = 0;
    this.#currentNode = head;
    this.#list = list;
  }

  next(): IteratorResult<Handler<T>> {
    if (!this.#currentNode) {
      return { value: undefined as any, done: true };
    }
  
    const handler = new Handler<T>(
      this.#idx,
      this.#currentNode,
      (node: Node<T>, previousNode?: Node<T>) => this.#list.remove(node, previousNode)
    );
  
    this.#currentNode = this.#currentNode.next;
    this.#idx += 1;
      
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
   * WARNING: Only for testing purposes.
   * It returns the head node and it breaks encapsulation.
   * It allows the linked list invariant to be broken.
   */
  unsafeHead(): Node<T> | undefined {
    return this.#head;
  }
}
