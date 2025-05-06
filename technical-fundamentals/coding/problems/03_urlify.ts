// 3.  URLify:

// Write a method to replace all spaces in a string with '%20'.
// You may assume that the string has sufficient space at the end to hold the additional characters,
// and that you are given the "true" length of the string.

/**
 * Note:
 * This could be done in-place if the input string were represented as a character array
 * with enough trailing space to accommodate the additional characters.
 * In that scenario, and if the true length of the string were provided,
 * we could perform the transformation from the end of the array backwards,
 * replacing spaces with '%20' without allocating extra memory.
 *
 * However, in JavaScript, strings are immutable, and the input here
 * does not include the extra space or true length. Therefore, we simply
 * return a new string with spaces replaced.
 */
export default function URLify(s1: string): string {
  return s1.replace(/ /g, "%20");
}
