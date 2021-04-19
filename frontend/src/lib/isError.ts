import { UseQueryOptions, UseQueryResult } from 'react-query';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function checkStatus(
  status: 'idle' | 'loading' | 'success' | 'error',
  error: unknown
) {
  if (status === 'loading') {
    return 'Loading...';
  }
  if (status === 'error' && isError(error))
    return `Error: ${error.message}`;
  return null;
}
