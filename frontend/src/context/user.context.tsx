import * as React from 'react';

const UserContext = React.createContext<UserContext | null>({} as UserContext);

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

export const useUserContext = () => React.useContext(UserContext);
