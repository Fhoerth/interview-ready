// 3. *Stack of Plates*:

// Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack
// exceeds some threshold. Implement a data structure SetOfStacks that mimics this.
// SetOfStacks should be composed of several stacks and should create a new stack once
// the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should behave
// identically to a single stack (that is, pop() should return the same values as it would if
// there were just a single stack).

// FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

export default class StackOfPlates<T> {
  #capacity: number;

  #stacks: T[][] = [[]];
  #startingIdxs: number[] = [0];
  #currentStack = 0;

  constructor(capacity: number) {
    this.#capacity = capacity;
  }

  push(value: T): void {
    if (this.#stacks[this.#currentStack].length < this.#capacity) {
      this.#stacks[this.#currentStack].push(value);
      return;
    }

    this.#stacks.push([]);
    this.#startingIdxs.push(0);
    this.#currentStack += 1;

    this.push(value);
  }

  pop(): T | undefined {
    const idx = (): number => this.#stacks[this.#currentStack].length;
    const isCurrentStackEmpty = (): boolean =>
      !idx() || idx() === this.#startingIdxs[this.#currentStack];

    if (isCurrentStackEmpty()) return undefined;

    const item = this.#stacks[this.#currentStack].pop();

    if (isCurrentStackEmpty() && this.#currentStack > 0) {
      this.#stacks.pop();
      this.#startingIdxs.pop();
      this.#currentStack -= 1;
    }

    return item;
  }

  popAt(stackNum: number): T | undefined {
    if (stackNum > this.#currentStack) {
      return undefined;
    }

    const item = this.#stacks[stackNum].pop();

    for (let j = stackNum + 1; j < this.#stacks.length; j += 1) {
      this.#startingIdxs[j] += 1;
      // Shift bottom element to left
      this.#stacks[j - 1].push(this.#stacks[j][0]);
    }

    return item;
  }
}
