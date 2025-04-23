import { describe, it, test, expect } from 'vitest';
import { MiniLinkedList, Node } from '../MiniLinkedList';
import { assert } from '../../utils/assert';

describe('MiniLinkedList', () => {
  it('assings head and tail correctly when list is empty', () => {
    const list = new MiniLinkedList<number>();

    expect(list.size()).toBe(0);
    list.pushLeft(1);
    expect(list.size()).toBe(1);

    expect(list.head()?.value).toBe(1);
    expect(list.tail()?.value).toBe(1);

    list.popLeft();

    expect(list.head()?.value).toBe(undefined);
    expect(list.tail()?.value).toBe(undefined);
    expect(list.size()).toBe(0);
  });

  test('stress test (pushLeft / popLeft)', () => {
    const list = new MiniLinkedList<number>();
    const iterations = 100_000;

    for (let j = 1; j <= iterations; j += 1) {
      list.pushLeft(j);
      expect(list.size()).toBe(j);
    }

    for (let j = 1; j <= iterations; j += 1) {
      expect(list.head()?.value).toBe(iterations - j + 1);
      expect(list.tail()?.value).toBe(1);
      list.popLeft();
      expect(list.size()).toBe(iterations - j);
    }
  });

  test('stress test (pushRight / popLeft)', () => {
    const list = new MiniLinkedList<number>();
    const iterations = 100_000;

    for (let j = 1; j <= iterations; j += 1) {
      list.pushRight(j);
      expect(list.size()).toBe(j);
    }

    for (let j = 1; j <= iterations; j += 1) {
      expect(list.head()?.value).toBe(j);
      expect(list.tail()?.value).toBe(iterations);
      list.popLeft();
      expect(list.size()).toBe(iterations - j);
    }
  });

  test('prepend lists', () => {
    const iterations = 20;
    const list1 = new MiniLinkedList<number>();
    const list2 = new MiniLinkedList<number>();

    for (let j = 1; j <= iterations; j += 1) {
      if (j <= iterations / 2) {
        list1.pushRight(j);
      } else {
        list2.pushRight(j);
      }
    }

    list2.prepend(list1);

    expect(list2.size()).toBe(iterations);

    for (let j = iterations + 1; j < iterations * 2; j += 1) {
      list2.pushRight(j);
    }

    let node: Node<number> | undefined = list2.popLeft();
    let j = 1;

    while (node) {
      expect(node.value).toBe(j);

      if (list2.size()) {
        node = list2.popLeft();
      } else {
        node = undefined;
      }

      j += 1;
    }
  });

  test('prepend into empty list', () => {
    const list1 = new MiniLinkedList<number>();
    const list2 = new MiniLinkedList<number>();
  
    list1.pushRight(1);
    list1.pushRight(2);
    list1.pushRight(3);
    list2.prepend(list1);
    list2.pushRight(4);
  
    const node = list2.popLeft();

    expect(node?.value).toBe(1);
  });
});
