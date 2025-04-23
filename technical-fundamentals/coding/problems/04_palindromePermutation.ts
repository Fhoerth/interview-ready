// 4. *Palindrome Permutation*:

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

/**
 * A string can be rearranged into a palindrome if:
 * - Every character appears an even number of times, or
 * - At most one character appears an odd number of times (if the string length is odd).
 * Blank spaces are ignored.
 */
export default function palindromePermutation(str: string): boolean {
  const freq = new Map<string, number>();

  let isEven: boolean = true;
  let lowerCasedChar: string = '';

  for (const char of str) {
    if (char === ' ') continue;

    lowerCasedChar = char.toLowerCase();
    isEven = !isEven;

    const count = freq.get(lowerCasedChar);

    if (count === 1) freq.delete(lowerCasedChar);
    else freq.set(lowerCasedChar, count !== undefined ? count + 1 : 1);
  }

  return (isEven && freq.size === 0) || (!isEven && freq.size === 1);
}
