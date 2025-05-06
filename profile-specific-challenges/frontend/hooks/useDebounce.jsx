// https://github.com/streamich/react-use/blob/master/docs/useDebounce.md
import { useState, useEffect, useCallback, useRef } from "react";

export function useDebounce(fn, delay, deps) {
  const timerRef = useRef();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, delay);
  }, [fn, delay, deps]);

  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
  }, []);

  const isReady = () => timerRef?.current === undefined;

  return [isReady, cancel];
}
