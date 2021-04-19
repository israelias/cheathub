/* eslint-disable no-alert */
/* eslint-disable no-console */
export function checkUserData(e) {
  console.log('TRIGGER');

  if (e.key === 'app_logout') {
    console.log('TRIGGER LOGOUT');
    window.alert('You have been logged out.');
  }
}

export function checkLogoutEvent() {
  window.addEventListener('storage', (e) => checkUserData(e));

  return () => {
    window.removeEventListener('storage', (e) => checkUserData(e));
  };
}
