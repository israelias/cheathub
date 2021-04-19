/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable getter-return */

/**
 * Utility object with keys to functions pertaining to local storage management.
 *
 * @file defines storage object and its children.
 * @since 4.04.21
 */

export const storage = {
  getToken: () =>
    JSON.parse(window.localStorage.getItem('token') || '{}'),
  setToken: (token: string) =>
    window.localStorage.setItem('token', JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem('token'),
  addListener: () =>
    window.addEventListener('storage', (e) => {
      e.key === 'app_logout' &&
        window.alert("You've been logged out");
    }),
  setUserLocal: (username: string) =>
    localStorage.setItem('username', username),
  getUserLocal: () =>
    JSON.parse(window.localStorage.getItem('username') || ''),
  clearUserLocal: () => window.localStorage.removeItem('username'),
  setLogoutEvent: () =>
    window.localStorage.setItem(
      'app_logout',
      JSON.stringify(Date.now())
    ),
};

// function checkUserData(e: StorageEvent) {
//   console.log('TRIGGER');

//   if (e.key === 'app_logout') {
//     console.log('TRIGGER LOGOUT');
//     window.alert('You have been logged out.');
//   }
// }
// window.addEventListener('storage', (e) => checkUserData(e));

// eliminate any white space at the beginning or end of each element in the array
// export const clearSpace = (arr: Array<string>) => {
//   const newArr: string[] = [];
//   arr.forEach((item) => {
//     while (item[0] === ' ') {
//       const newItem = item.slice(1, item.length);
//       item = newItem;
//     }
//     while (item[item.length - 1] === ' ') {
//       const newItem = item.slice(0, item.length - 1);
//       item = newItem;
//     }
//     if (item !== '') {
//       newArr.push(item);
//     }
//   });
//   return newArr;
// };

// listen(callback: (StorageEvent) => void): () => void {
//     const handler = (e) => {
//       if (e.key === this.key && e.storageArea === this.storageArea) {
//         callback(e);
//       }
//     };
//     window.addEventListener('storage', handler);
//     return () => window.removeEventListener('storage', handler);
//   },
