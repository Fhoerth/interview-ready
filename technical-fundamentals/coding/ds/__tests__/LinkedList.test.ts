import { describe, it, test, expect } from 'vitest';
import { LinkedList, Node } from '../LinkedList';

describe('LinkedList', () => {
  it('assings head and tail correctly when list is empty', () => {
    const list = new LinkedList<number>();

    expect(list.size()).toBe(0);
    list.prepend(1);
    expect(list.size()).toBe(1);

    expect(list.head()).toBe(1);
    expect(list.tail()).toBe(1);

    list.removeFirst();

    expect(list.head()).toBe(undefined);
    expect(list.tail()).toBe(undefined);
    expect(list.size()).toBe(0);
  });

  test('stress test (prepend)', () => {
    const list = new LinkedList<number>();
    const iterations = 100_000;

    for (let j = 1; j <= iterations; j += 1) {
      list.prepend(j);
      expect(list.size()).toBe(j);
    }

    for (let j = 1; j <= iterations; j += 1) {
      expect(list.head()).toBe(iterations - j + 1);
      list.removeFirst();
      expect(list.size()).toBe(iterations - j);
    }
  });

  test('stress test (append)', () => {
    const list = new LinkedList<number>();
    const iterations = 100_000;

    for (let j = 1; j <= iterations; j += 1) {
      list.append(j);
      expect(list.size()).toBe(j);
    }

    for (let j = 1; j <= iterations; j += 1) {
      expect(list.head()).toBe(j);
      list.removeFirst();
      expect(list.size()).toBe(iterations - j);
    }
  });

  test('stress test (append/prepend)', () => {
    const list = new LinkedList<number>();
    const iterations = 100_000;

    const expected: number[] = [];

    for (let j = 1; j <= iterations; j += 1) {
      if (j % 2 === 0) {
        list.append(j);
        expected.push(j);
      } else {
        list.prepend(j);
        expected.unshift(j);
      }

      expect(list.size()).toBe(j);
    }

    for (let j = 0; j < iterations; j += 1) {
      expect(list.head()).toBe(expected[j]);
      list.removeFirst();
      expect(list.size()).toBe(iterations - j - 1);
    }

    expect(list.size()).toBe(0);
  });

  test('stress test (removeNode)', () => {
    const nodes: Node<number>[] = [];
    const list = new LinkedList<number>();

    const iterations = 100_000;

    for (let j = 1; j <= iterations; j += 1) {
      nodes.push(list.prepend(j));
    }

    for (let j = 2; j < iterations; j += 1) {
      list.remove(nodes[j], nodes[j - 1]);
      expect(list.size()).toEqual(iterations - j + 1);
    }

    expect(list.head() === 1);
    expect(list.tail() === iterations);
    expect(list.size()).toBe(2);

    list.removeFirst();
    expect(list.head() === list.tail());
    expect(list.size()).toBe(1);

    list.removeFirst();
    expect(list.head() === list.tail());
    expect(list.size()).toBe(0);
  });

  test('removes every even element', () => {
    const list = new LinkedList<number>();
    const max = 10;
  
    for (let i = 1; i <= max; i++) {
      list.append(i);
    }
  
    for (const handler of list) {
      if (handler.value() % 2 === 0) {
        handler.remove();
      }
    }
  
    expect([...list].map(h => h.value())).toEqual([1, 3, 5, 7, 9]);
  });
});
