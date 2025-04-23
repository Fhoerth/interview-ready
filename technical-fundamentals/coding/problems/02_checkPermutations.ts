// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

export default function checkPermutations(s1: string, s2: string): boolean {
  const freq = new Map<string, number>();

  for (const char of s1) {
    const count = freq.get(char);
    const charFreq = count === undefined ? 1 : count + 1;

    freq.set(char, charFreq);
  }

  for (const char of s2) {
    const count = freq.get(char);

    if (count === undefined) return false;
    else if (count === 1) freq.delete(char);
    else freq.set(char, count - 1);
  }

  return !freq.size;
}
