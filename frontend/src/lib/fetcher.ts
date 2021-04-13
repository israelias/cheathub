/* eslint-disable no-console */
import {
  RouterProps,
  RouteProps,
  // RouteComponentProps,
  // RouteChildrenProps,
} from 'react-router';
import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './requests';

interface ISignUpRequest extends RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<
    React.SetStateAction<string>
  >;
  setLoggedIn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  redirectTo: string;
  body: {
    username: string;
    email: string;
    password: string;
  };
}

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
        localStorage.setItem('username', data.username);
        setLoading(false);
        router.push({
          pathname: redirectTo + data.username,
        });
      }
    });
}

interface ILoginRequest extends RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<
    React.SetStateAction<string>
  >;
  setLoggedIn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  redirectTo: string;
  body: {
    email: string;
    password: string;
  };
}

export async function loginRequest({
  body,
  setAccessToken,
  setUsername,
  setLoggedIn,
  history,
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
    localStorage.setItem('username', token.username);
    console.log(
      `User ${token.username} has logged in.`,
      `Access: ${token.access_token}`
    );
    history.push({
      pathname: `${redirectTo}/${token.username}`,
    });
  }
}

// export function loginRequest({
//   body,
//   setAccessToken,
//   setUsername,
//   setLoggedIn,
//   history,
//   redirectTo
// }: ILoginRequest
//   ) {
//   const request = RequestTicket({
//     method: 'post',
//     url: 'api/auth/login',
//     body: {
//       email: body.email,
//       password: body.password
//     }
//   })
//   return fetch(request).then(r => r.json())
//     .then(token => {
//       if (token.access_token) {
//         setAccessToken(token.access_token)
//         setUsername(token.username)
//         setLoggedIn(true)
//         localStorage.setItem('username', token.username)
//         console.log(`User ${token.username} has logged in.`, `Access: ${token.access_token}`)
//         history.push({
//           pathname: redirectTo + '/' + token.username,
//         })
//       }
//     })
// }

interface ILogoutRequest extends RouteProps, RouterProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<
    React.SetStateAction<string>
  >;
  setLoggedIn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  accessToken: string;
  redirectTo: string;
  body: {
    email: string;
    password: string;
  };
}

export async function LogoutRequest({
  setUsername,
  setLoggedIn,
  setAccessToken,
  accessToken,
  history: router,
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
      const now = Date.now();
      setAccessToken('');
      setUsername('');
      setLoggedIn(false);
      // const outgoing = window.localStorage.getItem(
      //   'username'
      // );
      window.localStorage.removeItem('username');
      window.localStorage.setItem(
        'app_logout',
        now.toString()
      );
      router.push({
        pathname: redirectTo,
        // query: {name: outgoing}
      });
    }
  } catch (error) {
    return console.error(error);
  }
}

// export async function LogoutRequest({
//   setUsername,
//   setLoggedIn,
//   setAccessToken,
//   accessToken,
//   history: router,
//   redirectTo
// }: ILogoutRequest) {
//   const request = RequestTicket({
//     method: 'post',
//     url: 'api/auth/logout',
//     token: accessToken
//   })
//   return await fetch(request)
//   .then(response => handleLogoutResponse(response));
// }

// export async function handleLogoutResponse(response: any){
//   const data = await response.json();

//   if (response.ok) {
//     const now = Date.now();
//     setAccessToken('');
//     setUsername('');
//     setLoggedIn(false);
//     const outgoing = window.localStorage.getItem('username');
//     window.localStorage.removeItem('username');
//     window.localStorage.setItem('app_logout', now.toString());
//     router.push({
//       pathname: redirectTo,
//       // query: {name: outgoing}
//     });
//   } else {
//     return Promise.reject(data);
//   }
// }

// export async function getUserProfile() {
//   return await fetch(`${API_URL}/auth/me`, {
//     headers: {
//       Authorization: storage.getToken()
//     }
//   }).then(handleApiResponse);
// }

interface IPutRequest extends RouterProps {
  accessToken: string;
  url: string;
  body: object;
  redirectTo: string;
}

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

interface IGetRequest {
  url: string;
  accessToken: string;
}

export function getRequest({
  url,
  accessToken,
}: IGetRequest) {
  const request = RequestTicket({
    method: 'get',
    url,
    token: accessToken || '',
  });
  return fetch(request)
    .then((res) => (res.ok ? res.json() : console.log(res)))
    .catch((error) => console.error(error));
}

interface IPostRequest extends RouterProps {
  accessToken: string;
  url: string;
  body: object;
  redirectTo: string;
}

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
