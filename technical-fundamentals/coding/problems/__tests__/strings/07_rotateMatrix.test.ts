import rotateMatrix from "../../07_rotateMatrix";

describe("07 - rotateMatrix", () => {
  test("rotates 2x2 matrix clockwise", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [3, 1],
      [4, 2],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });

  test("rotates 3x3 matrix clockwise", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });

  test("rotates 4x4 matrix clockwise", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const expected = [
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });

  test("rotates 5x5 matrix clockwise", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    const expected = [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });

  test("rotates 6x6 matrix clockwise", () => {
    const matrix = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36],
    ];
    const expected = [
      [31, 25, 19, 13, 7, 1],
      [32, 26, 20, 14, 8, 2],
      [33, 27, 21, 15, 9, 3],
      [34, 28, 22, 16, 10, 4],
      [35, 29, 23, 17, 11, 5],
      [36, 30, 24, 18, 12, 6],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });
});
