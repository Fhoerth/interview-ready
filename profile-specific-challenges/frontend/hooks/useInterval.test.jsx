import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, render, screen, act } from '@testing-library/react';
import { useState } from 'react';

import { useInterval } from './useInterval';

function TestComponent({ maxLoops = 10 }) {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), count < maxLoops ? 1000 : null);
  return <span>Count:{count}</span>;
}

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function getHook(fn, delay, autoStart = true) {
    const spy = vi.fn();
    const props = { fn: fn || spy, delay: delay || 5, autoStart };

    return [
      spy,
      renderHook(({ fn, delay, autoStart }) => useInterval(fn, delay, autoStart), {
        initialProps: props,
      }),
    ];
  }

  it('runs interval periods and updates the component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Count:0')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText('Count:1')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('Count:2')).toBeInTheDocument();
  });

  it('stops the interval', () => {
    render(<TestComponent maxLoops={1} />);
    expect(screen.getByText('Count:0')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText('Count:1')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText('Count:1')).toBeInTheDocument();
  });

  it('resets/stops the interval by calling `reset` and `stop`', () => {
    const [spy, hook] = getHook();
    let [start, stop] = hook.result.current;

    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(2);

    stop();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);

    start();

    vi.advanceTimersByTime(10);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("doesn't start until `start` is executed", () => {
    const spy = vi.fn();
    const delay = 5;
    const autoStart = false;
    const [, hook] = getHook(spy, delay, autoStart);

    let [start] = hook.result.current;

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(0);

    start();
    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
