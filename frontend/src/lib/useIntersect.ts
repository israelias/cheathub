/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
import { useEffect, useState, RefObject } from 'react';
// https://usehooks-typescript.com/react-hook/use-intersection-observer

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  enabled?: boolean;
  onIntersect?: () => void;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    enabled = true,
    onIntersect = () => {},
  }: Args
): IntersectionObserverEntry | undefined {
  const [
    entry,
    setEntry,
  ] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([
    entry,
  ]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    onIntersect();
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(
      updateEntry,
      observerParams
    );
    // const observer = new IntersectionObserver(
    //   (entries) =>
    //     entries.forEach(
    //       (entry) => entry.isIntersecting && onIntersect()
    //     ),
    //   observerParams
    // );

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;
