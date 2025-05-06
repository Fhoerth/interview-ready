import { describe, test } from "vitest";
import { SilverPromise } from "../promise.mjs";

describe("Promise Benchmarks", () => {
  test("Native Promise", async () => {
    console.time("Native Promise");

    for (let i = 0; i < 10000; i++) {
      await Promise.resolve(1)
        .then(() => 2)
        .then(() => 3);
    }

    console.timeEnd("Native Promise");
  });

  test("SilverPromise", async () => {
    console.time("SilverPromise");

    for (let i = 0; i < 10000; i++) {
      await SilverPromise.resolve(1)
        .then(() => 2)
        .then(() => 3);
    }

    console.timeEnd("SilverPromise");
  });
});
