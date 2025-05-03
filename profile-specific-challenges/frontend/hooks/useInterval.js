import { useRef, useEffect } from 'react';

export function useInterval(fn, delay) {
  const intervalRef = useRef();

  useEffect(() => {
    clearInterval(intervalRef.current);

    if (delay !== null) {
      intervalRef.current = setInterval(fn, delay);
    }
  }, [fn, delay]);
}
