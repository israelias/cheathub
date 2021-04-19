import { useState } from 'react';
import { useWindowEvent } from './useWindowEvent';

/**
 *
 * @source https://www.jmptr.com/blog/improving-the-local-storage-hook/
 */

export const useLocalStorage = (prop: string) => {
  const [currentValue, setCurrentValue] = useState(() =>
    localStorage.getItem(prop)
  );

  useWindowEvent('storage', (event) => {
    if (event.storageArea === localStorage && event.key === prop) {
      setCurrentValue(event.newValue);
    }
  });

  return currentValue;
};

export const useMouseOver = (elem: HTMLElement) => {
  const [isMousedOver, setIsMousedOver] = useState(false);
  useWindowEvent(
    'mouseover',
    () => {
      setIsMousedOver(true);
    },
    elem
  );
  useWindowEvent(
    'mouseout',
    () => {
      setIsMousedOver(false);
    },
    elem
  );
  // @ts-ignore
  useWindowEvent(
    'storage',
    () => {
      setIsMousedOver(false);
    },
    elem
  );
  return isMousedOver;
};
