// 3. *Magic Index*:

// A magic index in an array A[0...n-1] is defined to be an index such that A[i] = i.

// Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.

// FOLLOW UP: What if the values are not distinct?

export function findMagicIndexDistinct(arr: number[]): number | null {
  let left = 0;
  let right = arr.length;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] > middle) right = middle - 1;
    else left = middle + 1;
  }

  if (arr[right] === right) return right;
  return null;
}

export function findMagicIndexNonDistinct(arr: number[]): number | null {
  let left = 0;
  let right = arr.length;

  let lowerBound: number = arr[arr.length - 1];

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] <= middle) {
      if (arr[middle] === middle) lowerBound = Math.min(lowerBound, middle);
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  if (arr[lowerBound] === lowerBound) return lowerBound;

  return null;
}
