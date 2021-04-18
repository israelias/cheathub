/* eslint-disable no-alert */
/* eslint-disable no-console */
import * as React from 'react';

// const UserContext = React.createContext<UserContext | null>(
//   {} as UserContext
// );

export type UserContent = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = React.createContext<UserContent>({
  username: '',
  setUsername: () => {},
  accessToken: '',
  setAccessToken: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {},
});

export const useUserContext = () => React.useContext(UserContext);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  console.log('First provider');
  const [username, setUsername] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    function checkUserData(e: StorageEvent) {
      console.log('TRIGGER');

      if (e.key === 'app_logout') {
        console.log('TRIGGER LOGOUT');
        window.alert('You have been logged out.');
      }
    }

    window.addEventListener('storage', (e) => checkUserData(e));

    return () => {
      window.removeEventListener('storage', (e) => checkUserData(e));
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        accessToken,
        setAccessToken,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
