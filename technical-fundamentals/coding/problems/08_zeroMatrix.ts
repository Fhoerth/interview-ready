// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][];

export default function zeroMatrix(matrix: Matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  const zeroRows: boolean[] = Array(n).fill(false);
  const zeroCols: boolean[] = Array(m).fill(false);

  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < m; i += 1) {
      if (matrix[j][i] === 0) {
        zeroRows[j] = true;
        zeroCols[i] = true;
      }
    }
  }

  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < m; i += 1) {
      if (zeroRows[j] || zeroCols[i]) matrix[j][i] = 0;
    }
  }

  return matrix;
}
