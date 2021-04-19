import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 * A date parser.
 *
 * Parses a date string and returns ... ago
 * Parses a date to ISO format to have acceptable time element
 * Date format from API is ddd, dd MMM yyyy HH':'mm':'ss 'GMT'
 *
 * @requires dayjs
 * @requires dayjs/relativeTime
 * @link https://react-query.tanstack.com/
 * @file defines TimeAgo and TimeAgoProps
 * @since 4.04.21
 *
 */

/**
 * Props interface for TimeAgo.
 * @interface
 * @extends InterSectionObserverInit
 */

interface TimeAgoProps {
  date: string;
}

/**
 * TimeAgo component.
 *
 * @implements {TimeAgoProps}
 * @example
 * dayjs.extend(relativeTime);
 * dayjs('1999-01-01').fromNow(); // 20 years ago
 */

export const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  dayjs.extend(relativeTime);
  return (
    <time dateTime={dayjs(date).toISOString()}>
      {dayjs(date).fromNow()}
    </time>
  );
};
