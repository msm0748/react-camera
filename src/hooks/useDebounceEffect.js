import { useEffect } from 'react';

export function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
    // 경고 메세지 무시
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
