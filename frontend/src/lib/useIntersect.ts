/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
import { useEffect, useState, RefObject } from 'react';

/**
 * A typescript-safe implementation of generic "useIntersectionObserver" hook.
 *
 * @tutorial https://usehooks-typescript.com/react-hook/use-intersection-observer
 * @link https://react-query.tanstack.com/
 * @file defines useIntersectionObserver and its interface typedef
 * @since 4.04.21
 */

/**
 * Props interface for useIntersectionObserver.
 * @interface
 * @extends InterSectionObserverInit
 */
interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  enabled?: boolean;
  onIntersect?: () => void;
}
/**
 * useIntersectionObserver hook.
 *
 *
 * @implements {Args}
 * @param  {RefObject<Element>} elementRef
 * @param  {num} threshold
 * @param  {} root
 * @param  {} rootMargin
 * @param  {boolean} freezeOnceVisible
 * @param  {boolean} enabled
 * @param  {()=>{}} onIntersect
 */
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
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

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
