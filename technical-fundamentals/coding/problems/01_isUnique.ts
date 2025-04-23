// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export default function isUnique(str: string): boolean {
  const chars = new Set<string>();

  for (const char of str) {
    if (chars.has(char)) return false;
    chars.add(char);
  }

  return true;
}
