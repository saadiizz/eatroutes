import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (effect, delay, dependancy) => {
  const callback = useCallback(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependancy]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
};
