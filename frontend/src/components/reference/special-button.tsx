import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export const SpecialButton = withRouter(({ history }) => (
  <button
    type="button"
    onClick={() => {
      history.push('/posts/special');
    }}
  >
    special button
  </button>
));

interface Props extends RouteComponentProps {
  user: string;
  label: string;
  setUsernameId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // setUsernameId: React.ChangeEventHandler<HTMLInputElement>;
}

export const ToUserButton = withRouter(
  ({ history, user, label, setUsernameId }: Props) => (
    <>
      <button
        type="button"
        value={user}
        onClick={(e) => {
          history.push(`/profiles/${user}`);
        }}
      >
        {label}
      </button>
      <input onChange={setUsernameId} />
    </>
  )
);
