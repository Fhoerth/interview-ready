// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export default function isOneAway(str1: string, str2: string): boolean {
  if (str1 === str2) return true;
  if (Math.abs(str1.length - str2.length) > 1) return false;

  let i: number = 0;
  let j: number = 0;
  let numberOfEdits: number = 0;

  while (numberOfEdits <= 1 && i < str1.length && j < str2.length) {
    if (str1[i] !== str2[j]) {
      if (str2.length < str1.length) i += 1;
      numberOfEdits += 1;
    }

    i += 1;
    j += 1;
  }

  return numberOfEdits <= 1;
}
