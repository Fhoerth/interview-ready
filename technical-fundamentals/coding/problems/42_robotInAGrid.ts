// 2. *Robot in a Grid*:

// Imagine a robot sitting on the upper left corner of a grid with r rows and c columns.
// The robot can only move in two directions, right and down, but certain cells are
// "off limits" such that the robot cannot step on them.
// Design an algorithm to find a path for the robot from the top left to the bottom right.

type Grid = boolean[][];
type Path = Array<[number, number]>;

export default function robotInAGrid(grid: Grid): Path | false {
  const m = grid.length;
  const n = grid[0].length;

  function backtrack(currentPath: Path, i: number, j: number): boolean {
    if (i === m - 1 && j === n - 1) {
      currentPath[i + j] = [j, i];
      return true;
    }
    if (i >= m || j >= n) return false;
    if (!grid[i][j]) return false;

    currentPath[i + j] = [j, i];

    return backtrack(currentPath, i + 1, j) || backtrack(currentPath, i, j + 1);
  }

  const path: Path = Array.from({ length: m + n - 1 }, () => [0, 0]);
  const found = backtrack(path, 0, 0);

  return found ? path : false;
}
