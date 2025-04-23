import { MiniLinkedList } from './MiniLinkedList';

export class Queue<T> {
  #list = new MiniLinkedList<T>();

  enqueue(val: T) {
    this.#list.pushRight(val);
  }

  dequeue(): T | undefined {
    return this.#list.popLeft()?.value;
  }

  isEmpty(): boolean {
    return !this.#list.size();
  }

  peek(): T | undefined {
    return this.#list.head()?.value;
  }
}
