/* eslint-disable no-console */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { storage } from '../lib/utils';
import {
  signInRequest,
  signUpRequest,
  signOutRequest,
} from '../services/auth.service';

import { deleteRequest } from '../services/crud.service';
import { Prompt } from '../components/modals/toast-feedback';

/**
 * Top-most Context provider for all user authentication: form values, auth errors etc.
 *
 * @since 2021-04-04
 */

export type UserContent = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  returning: boolean;
  setReturning: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleSignOut: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  handleDelete: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
};

export const UserContext = React.createContext<UserContent>(
  undefined!
);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [heading, setHeading] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [returning, setReturning] = React.useState(true);

  const toast = useToast();
  const history = useHistory();

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!returning) {
      try {
        await signUpRequest({
          body: {
            username,
            email,
            password,
          },
        }).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.access_token) {
                setEmail('');
                setPassword('');
                setAccessToken(data.access_token);
                setUsername(data.username);
                setLoggedIn(true);
                storage.setUserLocal(data.username);

                setTimeout(() => {
                  toast({
                    duration: 3000,
                    isClosable: true,
                    render: () => (
                      <Prompt message="Account Created" />
                    ),
                  });
                }, 750);
                setTimeout(() => {
                  setLoading(false);
                  history.push({
                    pathname: `/explore`,
                  });
                }, 1500);
              }
            });
          } else {
            response.json().then((data) => {
              if (data.message) {
                setLoading(false);
                toast({
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Prompt warning message={data.message} />
                  ),
                });
              }
            });
          }
        });
      } catch (err) {
        setLoading(false);
        toast({
          duration: 3000,
          isClosable: true,
          render: () => <Prompt error message={err.message} />,
        });
      }
    } else {
      try {
        await signInRequest({
          body: {
            email,
            password,
          },
        }).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.access_token) {
                setEmail('');
                setPassword('');
                setAccessToken(data.access_token);
                setUsername(data.username);
                setLoggedIn(true);
                storage.setUserLocal(data.username);
                setTimeout(() => {
                  toast({
                    duration: 3000,
                    isClosable: true,
                    render: () => (
                      <Prompt
                        message={`Welcome Back, ${data.username}`}
                      />
                    ),
                  });
                }, 750);
                setTimeout(() => {
                  setLoading(false);
                  history.push(`/explore`);
                }, 1500);
              } else {
                setLoading(false);
                toast({
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Prompt
                      error
                      message={`Access Failed: ${data?.message}`}
                    />
                  ),
                });
              }
            });
          } else {
            response.json().then((data) => {
              if (data.message) {
                setLoading(false);
                toast({
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Prompt warning message={data.message} />
                  ),
                });
              }
            });
          }
        });
      } catch (err) {
        setLoading(false);
        toast({
          duration: 3000,
          isClosable: true,
          render: () => <Prompt error message={err.message} />,
        });
      }
    }
  };

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signOutRequest({ accessToken }).then((response) => {
        if (response.ok) {
          setAccessToken('');
          setUsername('');
          setLoggedIn(false);
          setReturning(true);
          storage.clearUserLocal();
          storage.setLogoutEvent();
          setTimeout(() => {
            toast({
              duration: 3000,
              isClosable: true,
              render: () => <Prompt message="Signed out" />,
            });
          }, 750);
          setTimeout(() => {
            setLoading(false);
            history.push(`/`);
          }, 1500);
        } else {
          setLoading(false);
          toast({
            duration: 3000,
            isClosable: true,
            render: () => <Prompt error message="Sign out Failed" />,
          });
        }
      });
    } catch (err) {
      setHeading(err.message);
    }
  };

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteRequest({
        url: `api/users/${username}`,
        accessToken,
      }).then((res) => {
        if (res.ok) {
          setAccessToken('');
          setUsername('');
          setLoggedIn(false);
          storage.clearUserLocal();
          storage.setLogoutEvent();
          setTimeout(() => {
            toast({
              duration: 3000,
              isClosable: true,
              render: () => <Prompt message="Account Deleted" />,
            });
          }, 750);
          setTimeout(() => {
            setLoading(false);

            history.push('/');
          }, 1500);
        } else {
          setLoading(false);
          toast({
            duration: 3000,
            isClosable: true,
            render: () => <Prompt warning message="Request Failed" />,
          });
        }
      });
    } catch (err) {
      setLoading(false);
      toast({
        duration: 3000,
        isClosable: true,
        render: () => <Prompt error message={err.message} />,
      });
    }
  };

  React.useEffect(() => {
    function checkUserData(e: StorageEvent) {
      if (e.key === 'app_logout') {
        setAccessToken('');
        setUsername('');
        setLoggedIn(false);
        setReturning(true);
        toast({
          duration: 3000,
          isClosable: true,
          render: () => (
            <Prompt
              error
              message="Oops. It seems you've been logged out."
            />
          ),
        });
      }
    }
    window.addEventListener('storage', (e) => checkUserData(e));
    return () => {
      window.removeEventListener('storage', (e) => checkUserData(e));
    };
  }, []);

  React.useEffect(() => {
    if (!(username || accessToken)) {
      history.push('/');
    }
  }, [username, accessToken]);

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
        handleSignIn,
        handleSignOut,
        handleDelete,
        email,
        setEmail,
        password,
        setPassword,
        heading,
        setHeading,
        alert,
        setAlert,
        returning,
        setReturning,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);
