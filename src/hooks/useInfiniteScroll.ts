import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (
  onIntersect: () => void,
  enabled: boolean = true
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const setTarget = useCallback((element: HTMLDivElement | null) => {
    targetRef.current = element;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersect, enabled]);

  useEffect(() => {
    if (!targetRef.current || !observerRef.current || !enabled) return;

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current && targetRef.current) {
        observerRef.current.unobserve(targetRef.current);
      }
    };
  }, [targetRef.current, enabled]);

  return { setTarget };
}; 