// 7.Permutations without Dups: Write a method to compute all permutations of a string of unique characters.

function swap(s: string[], i: number, j: number): void {
  const tmp = s[i];
  s[i] = s[j];
  s[j] = tmp;
}

export function permutationsWithoutDups(input: string): string[] {
  const solution: string[] = [];
  const s = input.split("");

  function backtrack(s: string[], currentIdx: number): void {
    if (currentIdx === s.length) {
      solution.push(s.join(""));
      return;
    }

    for (let j = currentIdx; j < input.length; j += 1) {
      swap(s, currentIdx, j);
      backtrack(s, currentIdx + 1);
      swap(s, j, currentIdx);
    }
  }

  backtrack(s, 0);

  return solution;
}

// *Permutations with Dups*: Write a method to compute all permutations of a string whose characters are not necessarily unique. The list of permutations should not have duplicates.

export function permutationsWithDups(input: string): string[] {
  const solution: string[] = [];
  const s = input.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

  function backtrack(s: string[], currentIdx: number): void {
    if (currentIdx === s.length) {
      solution.push(s.join(""));
      return;
    }

    for (let j = currentIdx; j < input.length; j += 1) {
      if (s[j] === s[j + 1]) continue;

      swap(s, currentIdx, j);
      backtrack(s, currentIdx + 1);
      swap(s, j, currentIdx);
    }
  }

  backtrack(s, 0);

  return solution;
}
