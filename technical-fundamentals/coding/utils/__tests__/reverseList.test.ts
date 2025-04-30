import { describe, it, test, expect } from 'vitest';

import { Node, reverseList } from '../reverseList';
import { L } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';

describe('reverse list', () => {
  it('reverses an empty list', () => {
    const head: Node<number> | undefined = undefined;
    expect(reverseList(head)).toBeUndefined();
  });

  it('reverses a list with 1 element', () => {
    const node1 = { value: 1 };
    expect(reverseList(node1)).toBe(node1);
  });

  it('reverses a list with 2 elements', () => {
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };

    node1.next = node2;

    const head = reverseList(node1);

    expect(head!.value).toBe(2);
    expect(head!.next!.value).toBe(1);
    expect(head!.next!.next!).toBeUndefined();
  });

  it('reverses a list with 3 elements', () => {
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };

    node1.next = node2;
    node2.next = node3;

    const head = reverseList(node1);

    expect(head!.value).toBe(3);
    expect(head!.next!.value).toBe(2);
    expect(head!.next!.next!.value).toBe(1);
    expect(head!.next!.next!.next).toBeUndefined();
  });
});
