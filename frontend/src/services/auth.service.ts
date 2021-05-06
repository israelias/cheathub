import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './requests.service';

/**
 * Package managers for CRUD operations via HTTP requests.
 *
 * Auth: Sign in, Sign up, Sign out.
 * General: Post, Put, Get => Add, Edit, etc.
 *
 * This file requires the modules {@link module:isomorphic-unfetch} for fetching the API.
 *
 * @requires isomorphic-unfetch
 * @see RequestTicket
 * @see
 * @file defines all CRUD request Handlers
 * @since 4.15.21
 */

/**
 * Sign up request handler.
 *
 * @see RequestTicket
 * @param  {object} body body of sign up request (username, email and password)
 * @return {Promise} handles user's authentication passport once fulfilled
 */
export function signUpRequest({
  body,
}: {
  body: {
    username: string;
    email: string;
    password: string;
  };
}) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/signup',
    body: {
      username: body.username,
      email: body.email,
      password: body.password,
    },
  });
  return fetch(request);
}

/**
 * Sign in request handler.
 *
 * @see RequestTicket
 * @param  {object} body body of sign up request (username, email and password)
 * @return {Promise} handles user's authentication passport once fulfilled
 */
export function signInRequest({
  body,
}: {
  body: {
    email: string;
    password: string;
  };
}) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/login',
    body: {
      email: body.email,
      password: body.password,
    },
  });
  return fetch(request);
}

/**
 * Sign out request handler.
 *
 * @see RequestTicket
 * @return {null} handles revoking of user's authentication passport without explicit return
 */
export function signOutRequest({
  accessToken,
}: {
  accessToken: string;
}) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/auth/logout',
    token: accessToken,
  });
  return fetch(request);
}
