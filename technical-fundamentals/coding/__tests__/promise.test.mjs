import { describe, it, expect, vi } from 'vitest';
import { SilverPromise } from '../promise.mjs';

function sleep(time) {
  return new Promise((r) => setTimeout(r, time));
}

describe('SilverPromises - then and catch methods', () => {
  it('works with async (resolve)', async () => {
    const p1 = new SilverPromise((resolve) => resolve(10));
    const p2 = SilverPromise.resolve(20);

    const value1 = await p1;
    const value2 = await p2;

    expect(value1).toBe(10);
    expect(value2).toBe(20);
  });

  it('works with async (reject)', async () => {
    const error = new Error('Error');
    const createPromise = () => SilverPromise.reject(error);

    let errorThrown = false;

    try {
      await createPromise();
    } catch (thrownError) {
      errorThrown = true;
      expect(thrownError).toBe(error);
    }

    expect(errorThrown).toBe(true);
  });

  it('should call .then even if added after resolve', async () => {
    let finalValue;
    const p = SilverPromise.resolve(42);

    p.then((v) => {
      finalValue = v;
    });

    await sleep(100);

    expect(finalValue).toBe(42);
  });

  it('should call .catch even if added after reject', async () => {
    const error = new Error('Error');
    const promise = SilverPromise.reject(error);

    let caughtError;

    promise.catch((err) => {
      caughtError = err;
    });

    await sleep(100);

    expect(caughtError).toBe(error);
  });

  it('should allow chaining then -> catch -> then', async () => {
    const promise = SilverPromise.resolve(10);
    const error = new Error('Error');

    let finalValue = 0;

    promise
      .then(() => {
        throw error;
      })
      .catch((thrownError) => {
        expect(thrownError).toBe(error);
        return 20;
      })
      .then((v) => {
        finalValue = v;
      });

    await sleep(100);

    expect(finalValue).toBe(20);
  });

  it('bifurcates promises (then)', async () => {
    const promise = SilverPromise.resolve(10);

    const p1 = promise.then((v) => v + 10);
    const p2 = promise.then((v) => v + 20);

    expect(p1 === p2).toBeFalsy();

    let errorThrown = false;
    let p1Resolved = false;
    let p2Resolved = false;

    p1.then((v) => {
      p1Resolved = true;
      expect(v).toBe(20);
    }).catch((e) => {
      errorThrown = true;
    });

    p2.then((v) => {
      p2Resolved = true;
      expect(v).toBe(30);
    }).catch((v) => {
      errorThrown = true;
    });

    await sleep(100);

    expect(p1Resolved).toBe(true);
    expect(p2Resolved).toBe(true);
    expect(errorThrown).toBe(false);
  });

  it('bifurcates promises (catch)', async () => {
    try {
      const error = new Error('Error');
      const promise = SilverPromise.reject(error);

      let catched1 = false;
      let catched2 = false;

      promise.catch((thrownError) => {
        catched1 = true;
        expect(thrownError).toBe(error);
      });

      promise.catch((thrownError) => {
        catched2 = true;
        expect(thrownError).toBe(error);
      });

      await sleep(100);

      expect(catched1).toBe(true);
      expect(catched2).toBe(true);
    } catch (error) {}
  });

  it('skips then callbacks when promise is rejected', async () => {
    const promise = SilverPromise.resolve(10);

    let skipped = true;
    let thrown = false;

    const error = new Error('Error');

    promise
      .then(() => {
        throw error;
      })
      .then(() => {
        skipped = false;
      })
      .then(() => {
        skipped = false;
      })
      .catch((thrownError) => {
        expect(thrownError).toBe(error);
        thrown = true;
      });

    await sleep(100);

    expect(skipped).toBe(true);
    expect(thrown).toBe(true);
  });

  it('chains then callbacks', async () => {
    const promise = SilverPromise.resolve(10);

    let finalValue = 0;

    promise
      .then((v) => v + 10)
      .then((v) => v + 10)
      .then((v) => v + 10)
      .then((v) => {
        finalValue = v;
      });

    await sleep(100);

    expect(finalValue).toBe(40);
  });

  it('chains catch callbacks', async () => {
    const error = new Error('Error 1');
    const promise = SilverPromise.reject(error);
    const errorsThrown = [false, false, false, false, false];

    let finalValue = 0;

    promise
      .catch(() => {
        errorsThrown[0] = true;
        throw new Error(error);
      })
      .catch(() => {
        errorsThrown[1] = true;
        throw new Error(error);
      })
      .catch(() => {
        errorsThrown[2] = true;
        throw new Error(error);
      })
      .catch(() => {
        errorsThrown[3] = true;
        throw new Error(error);
      })
      .catch(() => {
        errorsThrown[4] = true;
        throw new Error(error);
      })
      .catch(() => {
        errorsThrown[5] = true;
        return new Promise((_, reject) => setTimeout(() => reject(error), 50));
      })
      .catch(() => {
        finalValue = 100;
      });

    await sleep(100);

    expect(finalValue).toBe(100);
    expect(errorsThrown.filter(Boolean).length).toBe(errorsThrown.length);
  });

  it('chains then callbacks when callbacks return a promise', async () => {
    const promise = SilverPromise.resolve(20);

    let finalValue = 0;

    promise
      .then((v) => Promise.resolve(v + 20))
      .then((v) => SilverPromise.resolve(v + 20))
      .then((v) => new Promise((resolve) => setTimeout(() => resolve(v + 20)), 20))
      .then((v) => new SilverPromise((resolve) => setTimeout(() => resolve(v + 20)), 20))
      .then((value) => (finalValue = value));

    await sleep(100);

    expect(finalValue).toBe(100);
  });

  it('chains then callbacks after catching', async () => {
    const promise = SilverPromise.resolve(10);
    const error = new Error('Error');

    let finalValue;
    let errorThrown = false;

    promise
      .then(() => {
        throw error;
      })
      .catch((err) => {
        errorThrown = true;
        expect(err).toBe(error);
        return 10;
      })
      .then((v) => v + 10)
      .then((v) => v + 10)
      .then((v) => v + 10)
      .then((v) => {
        finalValue = v;
      });

    await sleep(100);

    expect(errorThrown).toBe(true);
    expect(finalValue).toBe(40);
  });

  it('should resolve and call then function', async () => {
    let fulfillment;
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve('Success'), 100);
    });

    promise.then((result) => {
      fulfillment = result;
    });

    //for testing purposes
    await sleep(200);
    expect(fulfillment).toBe('Success');
  });

  it('should catch errors using catch method', async () => {
    const promise = new SilverPromise((_, reject) => {
      setTimeout(() => reject(new Error('Failure')), 100);
    });

    promise.catch((error) => {
      expect(error.message).toBe('Failure');
    });
  });

  it('should handle then chaining with unresolved promise', async () => {
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve(0), 100);
    });

    const then0 = vi.fn().mockReturnValue(1);
    const then1 = vi.fn().mockReturnValue(2);
    const then2 = vi.fn();

    promise.then(then0).then(then1).then(then2);

    await sleep(200);

    expect(then0).toHaveBeenCalledWith(0);
    expect(then1).toHaveBeenCalledWith(1);
    expect(then2).toHaveBeenCalledWith(2);
  });

  it('should handle then chaining with resolved promise', async () => {
    const promise = new SilverPromise((resolve, reject) => {
      resolve(0);
    });

    const then0 = vi.fn().mockReturnValue(1);
    const then1 = vi.fn().mockReturnValue(2);
    const then2 = vi.fn();

    promise.then(then0).then(then1).then(then2);

    await sleep(200);

    expect(then0).toHaveBeenCalledWith(0);
    expect(then1).toHaveBeenCalledWith(1);
    expect(then2).toHaveBeenCalledWith(2);
  });

  it('should handle breaking promises', async () => {
    const promise = new SilverPromise((resolve) => {
      setTimeout(() => resolve('Success'), 100);
    });

    let error;

    promise.then((result) => {
      error = new Error('Should never be called');
    });
    promise.break();
    await sleep(200);
    expect(error).toBeUndefined();
  });
});
