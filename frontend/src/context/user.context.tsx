/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import * as React from 'react';
import { checkLogoutEvent } from '../lib/checkStorage';

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

  // const eventName = 'app_logout';
  // const userLocal = window.localStorage.getItem('username');
  // const logoutEvent = window.localStorage.getItem('app_logout');
  // const shouldTerminate = !(userLocal || logoutEvent);

  // React.useEffect(() => {
  //   if (shouldTerminate) {
  //     console.log('what');
  //     setLoggedIn(false);
  //     setUsername('');
  //     setAccessToken('');
  //   }
  // }, [shouldTerminate, userLocal, logoutEvent]);

  // React.useEffect(() => {
  //   checkLogoutEvent();
  // }, []);

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
