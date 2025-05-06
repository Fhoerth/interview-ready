export class Node<T> {
  value: T;
  next?: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class MiniLinkedList<T> {
  #head: Node<T> | undefined;
  #tail: Node<T> | undefined;
  #size: number = 0;

  head = (): Node<T> | undefined => this.#head;
  tail = (): Node<T> | undefined => this.#tail;
  size = (): number => this.#size;

  #makeTailAndHead(node: Node<T>): void {
    this.#head = node;
    this.#tail = node;
    this.#size = 1;
  }

  pushLeft(value: T): Node<T> {
    const node = new Node(value);

    if (!this.#size) {
      this.#makeTailAndHead(node);
      return node;
    }

    node.next = this.#head;
    this.#head = node;
    this.#size += 1;

    return node;
  }

  pushRight(value: T): Node<T> {
    const node = new Node(value);

    if (!this.#size) {
      this.#makeTailAndHead(node);
      return node;
    }

    this.#tail!.next = node;
    this.#tail = node;
    this.#size += 1;

    return node;
  }

  popLeft(): Node<T> {
    if (!this.#size) throw new Error("Empty List");

    const node = this.#head!;

    this.#head = this.#head!.next;
    if (this.#size === 1) this.#tail = undefined;
    this.#size -= 1;

    return node;
  }

  prepend(otherList: MiniLinkedList<T>): void {
    if (!otherList.size()) return;

    otherList.tail()!.next = this.#head;

    this.#size += otherList.size();
    this.#head = otherList.head();
    if (!this.#tail) this.#tail = otherList.tail();
  }
}
