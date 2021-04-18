interface ICheckAuth {
  username: string;
}

export function checkAuth({ username }: ICheckAuth) {
  const userMemory = username;
  const userLocal = localStorage.getItem('username');
  const shouldRedirect = !(userMemory || userLocal);
  if (shouldRedirect) {
    return false;
  }
  return true;
}
