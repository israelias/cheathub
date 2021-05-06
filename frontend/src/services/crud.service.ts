import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './requests.service';

/**
 * CRUD requests that return a prepared fetch. Promise is handled in DataHandler context.
 *
 * @see HandlerDataProvider
 * @file defines likeRequest, deleteRequest, putReload, postReload
 * @since 4.28.21
 */

/**
 * Simple post request with no body or redirects.
 * (for Likes, and Adds)
 *
 * @see RequestTicket
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export async function likeRequest({
  url,
  accessToken,
  body,
}: {
  accessToken: string;
  url: string;
  body: object;
}) {
  const request = RequestTicket({
    method: 'post',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}

/**
 * Simple delete request with no body or redirects.
 * (for Likes, and Adds)
 *
 * @see RequestTicket
 * @see useUserContext
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export function deleteRequest({
  url,
  accessToken,
}: {
  accessToken: string;
  url: string;
}) {
  const request = RequestTicket({
    method: 'delete',
    url,
    token: accessToken,
  });
  return fetch(request);
}

/**
 * Put request.
 *
 * @see RequestTicket
 * @see useUserContext
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} body put request body (edit snippet)
 * @return {Promise} handles frontend rerouting once fulfilled
 */
export function putReload({
  url,
  accessToken,
  body,
}: {
  accessToken: string;
  url: string;
  body: object;
}) {
  const request = RequestTicket({
    method: 'put',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}

/**
 * Post request handler (General).
 *
 * @see RequestTicket
 * @param  {} url url string of backend resource (/api/snippets or /api/collections)
 * @param  {} accessToken access token stored in context memory for request Authorization header
 * @param  {} body body of post request (new Snippets, new Collections)
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export function postReload({
  url,
  accessToken,
  body,
}: {
  accessToken: string;
  url: string;
  body: object;
}) {
  const request = RequestTicket({
    method: 'post',
    url,
    token: accessToken,
    body,
  });
  return fetch(request);
}
