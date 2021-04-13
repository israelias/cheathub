import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  loginRequest,
  // signUpRequest,
} from '../lib/fetcher';
import { useUserContext } from '../context/user.context';

interface Props
  extends RouteComponentProps<{ id: string }> {}

export const Login: React.FC<Props> = ({
  history,
  match,
}) => {
  const user = useUserContext();
  // const { setLoggedIn, setUsername, setAccessToken } = useUserContext();
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
              setLoggedIn: user!.setLoggedIn,
              setUsername: user!.setUsername,
              setAccessToken: user!.setAccessToken,
              history,
              redirectTo: '/profile',
            });
          } catch (err) {
            setError(err);
          }
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
