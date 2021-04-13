import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 * Parses a date string and returns ... ago
 * Parses a date to ISO format to have acceptable time element
 * Date format from API is ddd, dd MMM yyyy HH':'mm':'ss 'GMT'
 * */

// dayjs.extend(relativeTime);
// dayjs('1999-01-01').fromNow(); // 20 years ago

interface TimeAgoProps {
  date: string;
}

export const TimeAgo: React.FC<TimeAgoProps> = ({
  date,
}) => {
  dayjs.extend(relativeTime);
  return (
    <time dateTime={dayjs(date).toISOString()}>
      {dayjs(date).fromNow()}
    </time>
  );
};
