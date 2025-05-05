import { useRef, useEffect, useCallback } from 'react';

export function useInterval(fn, delay) {
  const intervalRef = useRef();

  const start = useCallback(() => {
    if (delay !== null) {
      intervalRef.current = setInterval(fn, delay);
    }
  }, [intervalRef, fn, delay]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
  }, [intervalRef]);

  const reset = useCallback(() => {
    start();
  }, [start]);

  useEffect(() => {
    stop();
    start();
  }, [fn, delay]);

  return [reset, stop];
}
