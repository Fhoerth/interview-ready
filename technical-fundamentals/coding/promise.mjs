/*
  Regretfully, at Silver we do sometimes break our promises.
  We wanted to express this in code, but Javascript's native Promises are not easy to modify.
  We need to implement our own Promises that mimic and extend Javascript's core promises.

  Step 1
  ------
  Implement native style promises with the functions then and catch.
  You can consult the reference at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

  Notes:
  - Promise chaining must be supported
  - Then functions carry over resolution values to future calls of the function

  Step 2
  ------
  Implement a "break" method that prevents previous callbacks from being called.
*/

import { Queue } from "./ds/Queue";

function isPromise(maybePromise) {
  return maybePromise instanceof Promise || maybePromise instanceof SilverPromise;
}

function promisify(maybePromise) {
  if (isPromise(maybePromise)) return maybePromise;
  return Promise.resolve(maybePromise);
}

function promisifyCallback(callback, argument) {
  try {
    const result = callback(argument);
    return Promise.resolve(result);
  } catch (errorLike) {
    return Promise.reject(errorLike);
  }
}

export class SilverPromise {
  #state = "pending";
  #value = undefined;
  #errorLike = undefined;
  #broken = false;

  #thenPromises = new Queue();
  #catchPromises = new Queue();

  constructor(callback) {
    callback?.(this.#fulfill.bind(this), this.#reject.bind(this));
  }

  static resolve(value) {
    return new SilverPromise((resolve) => resolve(value));
  }

  static reject(errorLike) {
    return new SilverPromise((_, reject) => reject(errorLike));
  }

  #runThenCallbacks() {
    if (this.#broken) return;

    const value = this.#value;

    while (this.#thenPromises.size()) {
      const [thenPromise, callback] = this.#thenPromises.dequeue();
      const promisifiedValue = promisifyCallback(callback, value);

      promisifiedValue
        .then((value) => thenPromise.#fulfill(value))
        .catch((errorLike) => thenPromise.#reject(errorLike));
    }
  }

  #runCatchCallbacks() {
    if (this.#broken) return;

    const errorLike = this.#errorLike;

    while (this.#catchPromises.size()) {
      const [catchPromise, callback] = this.#catchPromises.dequeue();
      const promisifiedValue = promisifyCallback(callback, errorLike);

      promisifiedValue
        .then((value) => catchPromise.#fulfill(value))
        .catch((thrownErrorLike) => catchPromise.#reject(thrownErrorLike));
    }

    while (this.#thenPromises.size()) {
      const [thenPromise] = this.#thenPromises.dequeue();
      thenPromise.#reject(errorLike);
    }
  }

  async #fulfill(valueOrPromise) {
    this.#state = "fulfilled";
    this.#value = await promisify(valueOrPromise);
    this.#runThenCallbacks();
  }

  async #reject(errorLikeOrPromise) {
    this.#state = "rejected";
    this.#errorLike = await promisify(errorLikeOrPromise);
    this.#runCatchCallbacks();
  }

  then(resolveCallback, rejectCallback) {
    const promise = new SilverPromise();

    this.#thenPromises.enqueue([promise, resolveCallback]);
    if (this.#state === "fulfilled") queueMicrotask(() => this.#runThenCallbacks());

    if (rejectCallback) {
      this.#catchPromises.enqueue([promise, rejectCallback]);
      if (this.#state === "rejected") queueMicrotask(() => this.#runCatchCallbacks());
    }

    return promise;
  }

  catch(callback) {
    const catchPromise = new SilverPromise();

    this.#catchPromises.enqueue([catchPromise, callback]);
    if (this.#state === "rejected") queueMicrotask(() => this.#runCatchCallbacks());

    return catchPromise;
  }

  break() {
    this.#broken = true;
  }
}
