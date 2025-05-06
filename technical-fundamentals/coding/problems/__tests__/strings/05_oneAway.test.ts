import oneAway from "../../05_oneAway";

function testBoth(s1: string, s2: string, expectedResult: boolean): void {
  expect(oneAway(s1, s2)).toEqual(expectedResult);
  expect(oneAway(s2, s1)).toEqual(expectedResult);
}

describe("05 - oneAway", () => {
  test("One Away - Replace", () => {
    testBoth("pale", "bale", true); // Replacement
    testBoth("bbaa", "bcca", false); // Replacement
  });

  test("One Away - Replace", () => {
    testBoth("pale", "bale", true); // Replacement
  });

  test("One Away - Insert", () => {
    testBoth("pale", "ple", true); // Insertion
  });

  test("One Away - Remove", () => {
    testBoth("pale", "pales", true); // Removal
    testBoth("paes", "pales", true); // Removal
  });

  test("Same Strings", () => {
    expect(oneAway("abc", "abc")).toEqual(true); // No edits
  });

  test("More Than One Edit Away", () => {
    testBoth("abcd", "efgh", false); // More than one edit away
  });

  test("More Than One Edit Away #2", () => {
    testBoth("palesa", "pale", false); // More than one edit away #2
  });

  test("Empty Strings", () => {
    expect(oneAway("", "")).toEqual(true); // Empty strings are zero edits away
  });

  test("One Character Difference", () => {
    testBoth("a", "ab", true); // One character difference
  });

  test("Empty and Non-Empty String", () => {
    testBoth("", "a", true); // Empty string and a non-empty string
  });
});
