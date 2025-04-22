import { describe, it, test, expect } from 'vitest';
import { LinkedList, Node } from '../LinkedList';

describe('LinkedList', () => {
  it('assings head and tail correctly when list is empty', () => {
    const list = new LinkedList<number>();

    expect(list.size()).toBe(0);
    list.prepend(1);
    expect(list.size()).toBe(1);

    expect(list.head()?.value).toBe(1);
    expect(list.tail()?.value).toBe(1);

    list.removeFirst();

    expect(list.head()?.value).toBe(undefined);
    expect(list.tail()?.value).toBe(undefined);
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
      expect(list.head()?.value).toBe(iterations - j + 1);
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
      expect(list.head()?.value).toBe(j);
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
      expect(list.head()?.value).toBe(expected[j]);
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

    expect(list.head()?.value === 1);
    expect(list.tail()?.value === iterations);
    expect(list.size()).toBe(2);

    list.removeFirst();
    expect(list.head()?.value === list.tail());
    expect(list.size()).toBe(1);

    list.removeFirst();
    expect(list.head()?.value === list.tail());
    expect(list.size()).toBe(0);
  });

  test('removes every even element', () => {
    const list = new LinkedList<number>();
    const iterations = 10;
  
    for (let j = 1; j <= iterations; j++) {
      list.append(j);
    }
  
    for (const handler of list) {
      if (handler.value() % 2 === 0) {
        handler.remove();
      }
    }
  
    expect([...list].map(h => h.value())).toEqual([1, 3, 5, 7, 9]);
  });

  test('removes consecutive elements', () => {
    const list = new LinkedList<number>();
    const iterations = 10;
  
    for (let j = 1; j <= iterations; j++) {
      list.append(j);
    }

    for (const handler of list) {
      if (handler.idx() + 1 >= 2 && handler.idx() + 1 <= iterations - 1) {
        handler.remove();
      }
    }

    expect(list.head()?.value).toBe(1);
    expect(list.tail()?.value).toBe(iterations);
    expect(list.size()).toBe(2);
  });

  test('lists concatenation', () => {
    const iterations = 20;
    const list1 = new LinkedList<number>();
    const list2 = new LinkedList<number>();

    for (let j = 1; j <= iterations; j += 1) {
      if (j <= iterations / 2) {
        list1.append(j);
      } else {
        list2.append(j);
      }
    }

    list1.concat(list2);

    expect(list1.size()).toBe(iterations);
    
    for (const handler of list1) {
      expect(handler.idx() + 1).toEqual(handler.value());
    }

    for (const handler of list1)
      handler.remove();
    for (const handler of list2)
      handler.remove();

    expect(list1.size()).toBe(0);
    expect(list2.size()).toBe(0);

    list1.concat(list2);

    expect(list1.size()).toBe(0);

    list2.append(1);
    list1.concat(list2);

    expect(list1.size()).toBe(1);
    expect(list1.head()?.value).toBe(1);
  });
});
