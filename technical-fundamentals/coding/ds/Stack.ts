import { MiniLinkedList } from './MiniLinkedList';

export class Stack<T> {
  #list = new MiniLinkedList<T>();

  push(val: T) {
    this.#list.pushLeft(val);
  }

  pop(): T | undefined {
    return this.#list.popLeft()?.value;
  }

  size(): number {
    return this.#list.size();
  }

  peek(): T | undefined {
    return this.#list.head()?.value;
  }

  prepend(otherStack: Stack<T>): void {
    this.#list.prepend(otherStack.__unsafeInternalList()); // accede directamente
  }

  // INTERNAL USAGE ONLY – not part of the public API
  public __unsafeInternalList(): MiniLinkedList<T> {
    return this.#list;
  }
}
