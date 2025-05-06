import { useRef, useEffect } from "react";

export function useInterval(fn, delay, autoStart = true) {
  const intervalRef = useRef();

  function start() {
    if (delay !== null) {
      intervalRef.current = setInterval(fn, delay);
    }
  }

  function stop() {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    if (autoStart) {
      stop();
      start();
    }
  }, [start, stop]);

  return [start, stop];
}
