/**
 * Function that checks if a user's username exists in memory or local storage.
 * Used to redirect if the function returns false.
 *
 * @file defines checkAuth
 * @since 2021-04-03
 * @param {string} username
 * @return {boolean}
 */
export function checkAuth({ username }: { username: string }) {
  const userMemory = username && username.length > 0;
  const userLocal = localStorage.getItem('username');
  const shouldRedirect = !(userMemory || userLocal);
  if (shouldRedirect) {
    return false;
  }
  return true;
}
