// 4. *Power Set*:

// Write a method to return all subsets of a set.

// Example
// Input: [1, 2, 3]
// Output: [ [], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3] ];

export function powerSet(set: number[]): number[][] {
  const solution: number[][] = [];

  function backtrack(currentSolution: number[], currentIdx: number): void {
    if (currentIdx === set.length) {
      solution.push([...currentSolution]);
      return;
    }

    currentSolution.push(set[currentIdx]);
    backtrack(currentSolution, currentIdx + 1);
    currentSolution.pop();

    backtrack(currentSolution, currentIdx + 1);
  }

  backtrack([], 0);

  return solution;
}
