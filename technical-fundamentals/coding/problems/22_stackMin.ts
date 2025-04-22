// 2. *Stack Min*: How would you design a stack which,
// in addition to push and pop,
// has a function min which returns the minimum element?
// Push, pop, and min should all operate in O(1) time.
//

export default class StackMin<T extends number> {
  constructor() {}
  #minStack: number[] = [Infinity];
  #stack: number[] = [];

  #currentMin(): number {
    return this.#minStack[this.#minStack.length - 1];
  }

  push(value: T): void {
    if (value <= this.#currentMin()) {
      this.#minStack.push(value);
    }

    this.#stack.push(value);
  }

  pop(): number | undefined {
    if (!this.#stack.length) return undefined;

    const item = this.#stack.pop();

    if (item === this.#currentMin()) {
      this.#minStack.pop();
    }

    return item;
  }

  min(): number | undefined {
    if (!this.#stack.length) return undefined;

    return this.#currentMin();
  }
}
