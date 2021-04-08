const API = 'http://localhost:5000';

interface IRequestTicket {
  method: string;
  token?: string;
  url: string;
  body?: object;
}

export const RequestTicket = ({ method, token, url, body }: IRequestTicket) => {
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
    } else {
      return new Request(`${API}/${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
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
  } else {
    return new Request(`${API}/${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  }
};
