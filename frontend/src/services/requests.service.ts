/**
 * Functions that pre-packages HTTP requests for a fetcher/handler.
 *
 * Requests are sorted per method for requests like signupRequest and loginRequest to send to the backend efficiently.
 *
 * @see signupRequest
 * @see loginRequest
 * @see LogoutRequest
 * @see putRequest
 * @see getRequest
 * @see
 * @file defines RequestTicket
 * @since 3.15.21
 */

/**
 * Api backend base URL.
 */
const API = 'https://cheathub-backend.onrender.com';

/**
 * Describe your function
 * @author jsanez @israelias
 * @param {string} method
 * @param {string} token
 * @param {string} url
 * @param {object} body
 * @return {Request}
 */
export const RequestTicket = ({
  method,
  token,
  url,
  body,
}: {
  method: string;
  token?: string;
  url: string;
  body?: object;
}) => {
  if (method === 'post') {
    if (token) {
      return new Request(`${API}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : null,
      });
    }
    return new Request(`${API}/${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  if (method === 'put') {
    return new Request(`${API}/${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  if (method === 'delete') {
    return new Request(`${API}/${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return new Request(`${API}/${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
