// 7. *Build Order*:

// You are given a list of projects and a list of dependencies
// (which is a list of pairs of projects, where the second project is
// dependent on the first project). All of a project's dependencies
// must be built before the project is. Find a build order that will allow
// the projects to be built. If there is no valid build order, return an error.

// ```
// EXAMPLE Input:
// projects: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
// Output: e, f, a, b, d, c
// ```

import { Queue } from '../ds/Queue';

type Project = string;
type Node = {
  din: number;
  project: Project;
  visited: boolean;
  dependents: Node[];
};

function bfs(node: Node, result: Project[]) {
  const queue = new Queue<Node>();

  queue.enqueue(node);

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;

    result.push(node.project);

    for (const dependent of node.dependents) {
      if (dependent.visited) continue;
      dependent.visited = true;
      queue.enqueue(dependent);
    }
  }
}

function setKey(
  acc: Record<Project, number>,
  project: Project,
  idx: number
): Record<Project, number> {
  acc[project] = idx;
  return acc;
}

/**
 * Requires a Directed Acyclic Graph (DAG) input.
 */
export default function buildOrder(
  projects: Project[],
  dependencies: string[][]
): string[] | string {
  const result: Project[] = [];
  const nodes: Node[] = projects.map((project) => ({
    project,
    din: 0,
    visited: false,
    dependents: [],
  }));
  const map = projects.reduce(
    (acc, project, idx) => setKey(acc, project, idx),
    {} as Record<Project, number>
  );

  dependencies = dependencies.sort(
    ([dependent1, dependency1], [dependent2, dependency2]) =>
      dependent1.charCodeAt(0) - dependent2.charCodeAt(0) ||
      dependency1.charCodeAt(0) - dependency2.charCodeAt(0)
  );

  for (const [dependency, dependent] of dependencies) {
    try {
      nodes[map[dependent]].din += 1;
      nodes[map[dependency]].dependents.push(nodes[map[dependent]]);
    } catch {
      throw new Error('No valid build order exists');
    }
  }

  for (let j = 0; j < nodes.length; j += 1) {
    if (nodes[j].din > 0) continue;
    bfs(nodes[j], result);
  }

  return result;
}
