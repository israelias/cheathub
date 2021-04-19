import { useEffect, useRef } from 'react';

interface EventHandler<T extends Event = Event> {
  (event: T): void;
}

export function useWindowEvent<
  K extends keyof HTMLElementEventMap,
  H extends HTMLElementEventMap[K]
>(key: K, handler: EventHandler<H>, elem: HTMLElement): void;
export function useWindowEvent<
  K extends keyof WindowEventMap,
  H extends WindowEventMap[K]
>(key: K, handler: EventHandler<H>, elem?: Window): void;
/**
 * Generic DOM hook for attaching a callback function to a specific event on a
 * target element.
 * @param eventName event to subscribe to
 * @param handler callback to invoke when the event occurs
 * @param element target element to listen to, default to window
 */
export function useWindowEvent(
  eventName: string,
  handler: EventHandler,
  element: Window | HTMLElement = window
) {
  /**
   * Using the useRef hook allows us to make sure that the _instance_ of the
   * handler being passed is the same instance as the handler being used by
   * the event listener.
   *
   * Another reason for useRef is that consumption of the handler is a DOM
   * callback, which _may_ not be prioritized to happen in the same event loop
   * as the enclosed handler. This helps preserve the _reference_ to the handler
   * that the user has passed in during the JavaScript execution of the event
   * handler.
   *
   * See: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
   */
  const handlerRef = useRef<EventHandler>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener: EventHandler = (event) =>
      handlerRef?.current && handlerRef.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
