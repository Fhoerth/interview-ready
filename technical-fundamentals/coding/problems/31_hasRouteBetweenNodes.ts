// 1. *Route Between Nodes*:

// Given a directed graph, design an algorithm to find out whether there is a route
// between two nodes.
import { Queue } from '../ds/Queue';

export type GraphNode = {
  value: number;
  neighbors: GraphNode[];
};

/**
 * Going to implement this by using bfs, since it's more efficient
 *  and has less memory consumption.
 * Plus: I love bfs :).
 */
export default function hasRouteBetweenNodes(start: GraphNode, end: GraphNode): boolean {
  const queue = new Queue<GraphNode>();
  const seen = new Set<GraphNode>();

  queue.enqueue(start);
  seen.add(start);

  while (!queue.isEmpty()) {
    const currentvertex = queue.dequeue()!;

    if (currentvertex === end) return true;

    for (const neighbor of currentvertex.neighbors) {
      if (!seen.has(neighbor)) queue.enqueue(neighbor);
      seen.add(neighbor);
    }
  }

  return false;
}
