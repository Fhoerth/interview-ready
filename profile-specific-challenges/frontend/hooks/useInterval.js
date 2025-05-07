import { useRef, useEffect, useCallback } from "react";

export function useInterval(fn, delay, autoStart = true) {
  const intervalRef = useRef();

  const start = useCallback(() => {
    if (delay !== null) {
      intervalRef.current = setInterval(fn, delay);
    }
  }, [fn, delay]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
  }, [intervalRef]);

  useEffect(() => {
    if (autoStart) {
      stop();
      start();
    }
  }, [start, stop]);

  useEffect(() => {
    return stop;
  }, [stop]);

  return [start, stop];
}
