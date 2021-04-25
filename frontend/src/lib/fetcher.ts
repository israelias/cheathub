/* eslint-disable no-console */
import { RouterProps, RouteProps } from 'react-router';
import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './requests';
import { storage } from './utils';

/**
 * Package managers for CRUD operations via HTTP requests.
 *
 * Auth: Sign in, Sign up, Sign out.
 * General: Post, Put, Get => Add, Edit, etc.
 *
 * This file requires the modules {@link module:isomorphic-unfetch} for fetching the API.
 *
 * @Todo Add Delete
 * @Todo Change logout to signout
 *
 * @requires isomorphic-unfetch
 * @see RequestTicket
 * @see
 * @file defines all CRUD request Handlers
 * @since 4.15.21
 */

/**
 * Props interface for SignupRequest.
 * @interface
 * @see signupRequest
 * @extends RouterProps
 */
interface ISignUpRequest extends RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  redirectTo: string;
  body: {
    username: string;
    email: string;
    password: string;
  };
}

/**
 * Sign up request handler.
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {ISignUpRequest}
 * @param  {function} setAccessToken dispatch action for UserContext accessToken state
 * @param  {function} setUsername dispatch action for UserContext username state
 * @param  {function} setLoggedIn dispatch action for UserContext loggedIn state
 * @param  {function} setLoading dispatch action for UserContext loading state
 * @param  {router} history router History
 * @param  {string} redirectTo url string for History to push to after request
 * @param  {object} body body of sign up request (username, email and password)
 * @return {Promise} handles user's authentication passport once fulfilled
 */
export function signUpRequest({
  setAccessToken,
  setUsername,
  setLoggedIn,
  setLoading,
  history: router,
  redirectTo,
  body,
}: ISignUpRequest) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/signup',
    body: {
      username: body.username,
      email: body.email,
      password: body.password,
    },
  });
  setLoading(true);
  return fetch(request)
    .then((res) => res.json())
    .then((data) => {
      if (data.access_token) {
        setAccessToken(data.access_token);
        setUsername(data.username);
        setLoggedIn(true);
        storage.setUserLocal(data.username);
        setLoading(false);
        router.push({
          pathname: redirectTo + data.username,
        });
      }
    })
    .catch((error) =>
      console.log(error.data, error.status, error.headers)
    );
}

/**
 * Props interface for LoginRequest.
 *
 * @interface
 * @see LoginRequest
 * @extends RouterProps
 */
interface ILoginRequest extends RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  redirectTo: string;
  // from: string | {};
  body: {
    email: string;
    password: string;
  };
}

/**
 * Login request handler.
 *
 * @see RequestTicket
 * @implements {ILoginRequest}
 * @param  {} body body of login requst (email and password only)
 * @param  {} setAccessToken dispatch action for accessToken state
 * @param  {} setUsername dispatch action for UserContext username state
 * @param  {} setLoggedIn dispatch action for UserContext loggedIn state
 * @param  {} history router History
 * @param  {} redirectTo url string for History to push to after request
 * @return {Promise} ? handles user's authentication passport once fulfilled
 */
export async function loginRequest({
  body,
  setAccessToken,
  setUsername,
  setLoggedIn,
  history,
  // from,
  redirectTo,
}: ILoginRequest) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/login',
    body: {
      email: body.email,
      password: body.password,
    },
  });
  const response = await fetch(request);
  const token = await response.json();
  if (token.access_token) {
    setAccessToken(token.access_token);
    setUsername(token.username);
    setLoggedIn(true);
    storage.setUserLocal(token.username);
    console.log(
      `User ${token.username} has logged in.`,
      `Access: ${token.access_token}`
    );
    // history.replace(from);
    history.push({
      pathname: `${redirectTo}/${token.username}`,
      // pathname: redirectTo,
    });
  }
}

/**
 * Props interface for logoutRequest.
 *
 * @interface
 * @see logoutRequest
 * @extends RouterProps
 */
interface ILogoutRequest extends RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  redirectTo: string;
}

/**
 * Logout request handler.
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {ILogoutRequest}
 * @param  {} setUsername dispatch action for UserContext username state
 * @param  {} setLoggedIn dispatch action for UserContext loggedIn state
 * @param  {} setAccessToken dispatch action for UserContext accessToken state
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} history router History
 * @param  {} redirectTo url frontend path for History to push to after request
 * @return {null} handles revoking of user's authentication passport without explicit return
 */
export async function LogoutRequest({
  setUsername,
  setLoggedIn,
  setAccessToken,
  accessToken,
  history,
  redirectTo,
}: ILogoutRequest) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/logout',
    token: accessToken,
  });
  try {
    const res = await fetch(request);
    if (res.ok) {
      setAccessToken('');
      setUsername('');
      setLoggedIn(false);
      storage.clearUserLocal();
      storage.setLogoutEvent();
      // history.replace()
      history.push({
        pathname: redirectTo,
      });
    }
  } catch (error) {
    return console.error(error);
  }
}

/**
 * Props interface for putRequest.
 *
 * @interface
 * @see putRequest
 * @extends RouterProps
 */
interface IPutRequest extends RouterProps {
  accessToken: string;
  url: string;
  body: object;
  redirectTo: string;
}

/**
 * Put request handler.
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {IPutRequest}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} body put request body (edit snippet)
 * @param  {} redirectTo url frontend path for History to push to after request
 * @param  {} history router History
 * @return {Promise} handles frontend rerouting once fulfilled
 */
export function putRequest({
  url,
  accessToken,
  body,
  redirectTo,
  history,
}: IPutRequest) {
  const request = RequestTicket({
    method: 'put',
    url,
    token: accessToken,
    body,
  });
  return fetch(request)
    .then((res) => {
      if (res.ok) {
        res.json();
        history.push({
          pathname: redirectTo,
        });
      } else {
        console.log(res);
      }
    })
    .catch((error) => console.error(error));
}

/**
 * Props interface for getRequest.
 *
 * @interface
 * @see getRequest
 */
interface IGetRequest {
  url: string;
  accessToken: string;
}

/**
 * Get request handler (General).
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {IGetRequest}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @return {Promise}
 */
export function getRequest({ url, accessToken }: IGetRequest) {
  const request = RequestTicket({
    method: 'get',
    url,
    token: accessToken || '',
  });
  return fetch(request)
    .then((res) => (res.ok ? res.json() : console.log(res)))
    .catch((error) =>
      console.log(error.data, error.status, error.headers)
    );
}

/**
 * Props interface for postRequest.
 *
 * @interface
 * @see postRequest
 * @extends RouterProps
 */
interface IPostRequest extends RouterProps {
  accessToken: string;
  url: string;
  body: object;
  redirectTo: string;
}

/**
 * Post request handler (General).
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {IPostRequest}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} body body of post request (new Snippets, new Collections)
 * @param  {} history router History
 * @param  {} redirectTo url frontend path for History to push to after request
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export async function postRequest({
  url,
  accessToken,
  body,
  history,
  redirectTo,
}: IPostRequest) {
  const request = RequestTicket({
    method: 'post',
    url,
    token: accessToken,
    body,
  });
  const res = await fetch(request);
  if (res.ok) {
    res.json();
    history.push({
      pathname: redirectTo,
    });
  } else {
    console.log(res);
  }
}
