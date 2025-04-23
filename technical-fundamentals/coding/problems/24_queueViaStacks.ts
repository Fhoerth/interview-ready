// 4. *Queue via Stacks*:

// Implement a MyQueue class which implements a queue using two stacks.
import { L } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';
import { Stack } from '../ds/Stack';

export default class MyQueue<T> {
  constructor() {}

  #stacks: [Stack<T>, Stack<T>] = [new Stack<T>(), new Stack<T>()];
  #idx = 0;

  #currentIdx(): number {
    return this.#idx % 2;
  }

  #otherIdx(): number {
    return (this.#idx + 1) % 2;
  }

  enqueue(value: T): void {
    const currentStack = this.#stacks[this.#currentIdx()];
    const otherStack = this.#stacks[this.#otherIdx()];

    otherStack.push(value);
    otherStack.prepend(currentStack);

    this.#stacks[this.#currentIdx()] = new Stack<T>();
    this.#idx += 1;
  }

  dequeue(): T | undefined {
    const currentStack = this.#stacks[this.#currentIdx()];

    if (!currentStack.size())
      return undefined;

    const element = currentStack.pop();

    return element;
  }

  peek(): T | undefined {
    const currentStack = this.#stacks[this.#currentIdx()];
    return currentStack.peek();
  }

  isEmpty(): boolean {
    const currentStack = this.#stacks[this.#currentIdx()];
    return !currentStack.size();
  }
}
