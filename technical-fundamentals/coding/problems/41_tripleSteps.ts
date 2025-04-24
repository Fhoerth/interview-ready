// 1. *Triple Step*:

// A child is running up a staircase with n steps and can hop either
// 1 step, 2 steps, or 3 steps at a time. Implement a method to count
// how many possible ways the child can run up the stairs.
//

export default function tripleStep(n: number): number {
  if (n <= 0) return 0;

  let ppp: number = 0;
  let pp: number = 0;
  let curr: number = 1;

  for (let j = 1; j <= n; j += 1) {
    const next = ppp + pp + curr;

    ppp = pp;
    pp = curr;
    curr = next;
  }

  return curr;
}
