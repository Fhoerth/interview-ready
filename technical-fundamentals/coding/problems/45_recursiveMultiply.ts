// 5. *Recursive Multiply*:

// Write a recursive function to multiply two positive integers without using the * operator.
// You can use addition, subtraction, and bit shifting.
// But you should minimize the number of those operations.
function negative(x: number): number {
  return ~x + 1;
}

export function recursiveMultiply(a: number, b: number): number {
  const isResultNegative = (a < 0 && b > 0) || (a > 0 && b < 0);

  function multiply(n: number, m: number, powOf2: number): number {
    if (n === 0) return n;
    if (m === 1) {
      if (b - powOf2 > 0) return n + Math.abs(recursiveMultiply(a, b - powOf2));
      else return n;
    }

    return multiply(n << 1, m >> 1, powOf2 << 1);
  }

  const result = multiply(Math.abs(a), Math.abs(b), 1);

  return isResultNegative ? negative(result) : result;
}
