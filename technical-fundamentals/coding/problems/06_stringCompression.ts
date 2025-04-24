// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export default function stringCompression(str: string): string {
  if (str.length === 1) return str;

  let k: number;
  let j: number;

  const freq = new Set<[string, number]>();

  j = 1;
  while (j < str.length) {
    if (str[j] === str[j - 1]) {
      k = j;
      while (str[j] === str[k]) k += 1;

      freq.add([str[j], k - j + 1]);
      j = k + 1;
      continue;
    }

    freq.add([str[j - 1], 1]);
    j += 1;
  }

  if (freq.size * 2 > str.length) return str;

  const compressedStrVector: string[] = [];

  for (const [key, value] of freq) {
    compressedStrVector.push(key);
    compressedStrVector.push(value.toString());
  }

  return compressedStrVector.join('');
}
