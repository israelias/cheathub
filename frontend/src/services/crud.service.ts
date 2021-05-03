/* eslint-disable no-console */
import { RouterProps, RouteProps } from 'react-router';
import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './requests.service';
import { storage } from '../lib/utils';

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

/**
 * Props interface for likeRequest.
 *
 * @interface
 * @see postRequest
 */
interface ISimplePostRequest {
  accessToken: string;
  url: string;
  body: object;
}

/**
 * Simple post request handler with no body or redirects.
 * (for Likes, and Adds)
 *
 * @see RequestTicket
 * @implements {ISimplePostRequest}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export async function likeRequest({
  url,
  accessToken,
  body,
}: ISimplePostRequest) {
  const request = RequestTicket({
    method: 'post',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}

/**
 * Props interface for deleteRequest.
 *
 * @interface
 */
interface IDeleteRequest {
  accessToken: string;
  url: string;
}

/**
 * Simple post request handler with no body or redirects.
 * (for Likes, and Adds)
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {ISimplePostRequest}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export function deleteRequest({ url, accessToken }: IDeleteRequest) {
  const request = RequestTicket({
    method: 'delete',
    url,
    token: accessToken,
  });
  return fetch(request);
}

/**
 * Props interface for putReload.
 *
 * @interface
 */
interface IPutReload {
  accessToken: string;
  url: string;
  body: object;
}
/**
 * Put request handler.
 *
 * @see RequestTicket
 * @see useUserContext
 * @implements {IPutReload}
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} body put request body (edit snippet)
 * @return {Promise} handles frontend rerouting once fulfilled
 */
export function putReload({ url, accessToken, body }: IPutReload) {
  const request = RequestTicket({
    method: 'put',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}

/**
 * Props interface for LoginReload.
 *
 * @interface
 * @see LoginReload
 */
interface ILoginReload {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
 * @return {Promise} ? handles user's authentication passport once fulfilled
 */
export async function loginReload({
  body,
  setAccessToken,
  setUsername,
  setLoggedIn,
}: ILoginReload) {
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
    return true;
  }
  return false;
}

/**
 * Props interface for postReload.
 *
 * @interface
 * @see postReload
 */
interface IPostReload {
  accessToken: string;
  url: string;
  body: object;
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
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export function postReload({ url, accessToken, body }: IPostReload) {
  const request = RequestTicket({
    method: 'post',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}
