import { useCallback, useRef, useEffect } from "react";

function useAnimation(fn) {
  const frameRef = useRef(null);

  const animate = useCallback(
    (now) => {
      fn(now);
      frameRef.current = requestAnimationFrame(animate);
    },
    [fn]
  );

  function start() {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }

  function stop() {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }

  useEffect(() => {
    return stop;
  }, []);

  return [start, stop];
}

export { useAnimation };
