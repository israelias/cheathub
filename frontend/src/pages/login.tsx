/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  loginRequest,
  // signUpRequest,
} from '../services/auth.service';
import { useUserContext } from '../context/user.context';

interface Props extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents user authentication UI.
 // TODO merge with registration logic
 * @file defines Login page
 * @date 2021-04-01
 * @param {any} {history
 * @param {any} match
 * @param {any} location
 * @param {any} }
 * @return {=>}
 */
export const Login: React.FC<Props> = ({
  history,
  match,
  location,
}) => {
  const { from } = location.state
    ? (location.state as any)
    : { from: { pathname: '/' } };

  const {
    setLoggedIn,
    setUsername,
    setAccessToken,
  } = useUserContext();

  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div>
      Login
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await loginRequest({
              body: { email, password },
              setLoggedIn,
              setUsername,
              setAccessToken,
              history,
              // from,
              redirectTo: '/collections',
            });
          } catch (err) {
            setError(err);
          }
          // history.replace(from);
        }}
      >
        <input
          autoComplete="new-password"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div style={{ color: 'tomato' }}>
          {JSON.stringify(error, null, 2)}
        </div>
      )}
    </div>
  );
};
