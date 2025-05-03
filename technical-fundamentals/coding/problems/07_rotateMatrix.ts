// 7. *Rotate Matrix*:

import { M } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

type Matrix = number[][];
type Coords = [number, number];

function next(n: number, coords: Coords): Coords {
  return [coords[1], n - 1 - coords[0]];
}

function get(m: Matrix, coords: Coords): number {
  return m[coords[0]][coords[1]];
}

function swap(m: Matrix, coords1: Coords, coords2: Coords) {
  const tmp = get(m, coords1);
  m[coords1[0]][coords1[1]] = get(m, coords2);
  m[coords2[0]][coords2[1]] = tmp;
}

export default function rotateMatrix(matrix: Matrix) {
  const n = matrix.length;

  for (let layer = 0; layer < Math.floor(n / 2); layer += 1) {
    for (let i = layer; i < n - 1 - layer; i += 1) {
      const topRight = next(n, [i, layer]);
      const bottomRight = next(n, topRight);
      const bottomLeft = next(n, bottomRight);
      const topLeft = next(n, bottomLeft);

      swap(matrix, bottomLeft, topLeft);
      swap(matrix, bottomRight, bottomLeft);
      swap(matrix, topRight, bottomRight);
    }
  }

  return matrix;
}
