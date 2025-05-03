import { useEffect } from 'react';
import { useRendersCount } from './useRendersCount';

export function useUpdateEffect(hook, deps) {
  const count = useRendersCount();

  useEffect(() => {
    if (count <= 1) return;
    hook();
  }, [count, hook, deps]);
}
