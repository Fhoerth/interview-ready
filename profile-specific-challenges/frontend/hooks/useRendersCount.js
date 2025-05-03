import { useEffect, useRef } from 'react';

export function useRendersCount() {
  const counter = useRef(1);

  useEffect(() => {
    counter.current += 1;
  });

  return counter.current;
}
