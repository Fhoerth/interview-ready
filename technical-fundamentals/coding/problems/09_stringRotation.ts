// 9. *String Rotation*;

import { createIsSubstring } from "./__utils__/strings";

// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring.
// [e.g., "waterbottle" is a rotation of 'erbottlewat")

export default function stringRotation(s1: string, s2: string): boolean {
  const isSubstring = createIsSubstring();
  return isSubstring(s1.concat(s1), s2);
}
