// 1. *Three in One*: Describe how you could use a single array to implement three stacks.
import { assert } from "../utils/assert";
export default class ThreeStacks<T> {
  private array: (T | null)[] = [];
  private nextIndexes = new Map<number, number>();
  private numStacks = 3;

  constructor(arrayLength: number) {
    for (let j = 0; j < arrayLength; j += 1) {
      this.array.push(null);
    }

    for (let j = 0; j < this.numStacks; j += 1) {
      this.nextIndexes.set(j, j);
    }
  }

  private getStackCurrentIdx(stackNum: number): number {
    const nextIdx = this.nextIndexes.get(stackNum);
    assert(nextIdx);

    const currentIdx = nextIdx - this.numStacks;

    return currentIdx;
  }

  push(stackNum: number, value: T): void {
    const nextIdx = this.nextIndexes.get(stackNum);
    assert(nextIdx);

    this.array[nextIdx] = value;
    this.nextIndexes.set(stackNum, nextIdx + this.numStacks);
  }

  pop(stackNum: number): T | undefined {
    const currentIdx = this.getStackCurrentIdx(stackNum);

    if (currentIdx < 0) {
      return undefined;
    }

    const item = this.array[currentIdx];

    this.nextIndexes.set(stackNum, currentIdx);
    this.array[currentIdx] = null;

    return item === null ? undefined : item;
  }

  peek(stackNum: number): T | undefined {
    const currentIdx = this.getStackCurrentIdx(stackNum);

    if (currentIdx < 0) {
      return undefined;
    }

    const item = this.array[currentIdx];

    return item === null ? undefined : item;
  }
}
