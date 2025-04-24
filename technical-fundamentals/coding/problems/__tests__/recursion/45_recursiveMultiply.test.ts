import { recursiveMultiply } from '../../45_recursiveMultiply';

describe('recursiveMultiply', () => {
  test('returns correct product for two positive integers', () => {
    // Test case with two positive integers
    expect(recursiveMultiply(3, 4)).toBe(12); // 3 * 4 = 12
    // expect(recursiveMultiply(5, 7)).toBe(35); // 5 * 7 = 35
    // expect(recursiveMultiply(9, 2)).toBe(18); // 9 * 2 = 18

    // // Test case with one of the numbers being 0
    // expect(recursiveMultiply(0, 10)).toBe(0); // 0 * 10 = 0
    // expect(recursiveMultiply(8, 0)).toBe(0); // 8 * 0 = 0
  });

  test('even multiplications', () => {
    expect(recursiveMultiply(2, 2)).toBe(4);
    expect(recursiveMultiply(3, 4)).toBe(12);
    expect(recursiveMultiply(5, 8)).toBe(40);
    expect(recursiveMultiply(10, 2)).toBe(20);
    expect(recursiveMultiply(10, 10)).toBe(100);
  });

  test('odd multiplications', () => {
    expect(recursiveMultiply(2, 3)).toBe(6);
    expect(recursiveMultiply(3, 7)).toBe(21);
    expect(recursiveMultiply(5, 9)).toBe(45);
    expect(recursiveMultiply(3, 3)).toBe(9);
    expect(recursiveMultiply(17, 1035)).toBe(17595);
  });

  test('negative multiplications', () => {
    expect(recursiveMultiply(-2, 3)).toBe(-6);
    expect(recursiveMultiply(-23, -5)).toBe(92);
  });

});
