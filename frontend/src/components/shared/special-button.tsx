import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

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
  setUsernameId: (
    event: React.MouseEventHandler<HTMLButtonElement>
  ) => void;
}

export const ToUserButton = withRouter(
  ({ history, user, label, setUsernameId }: Props) => (
    <button
      type="button"
      value={user}
      onClick={(e) => {
        history.push(`/profiles/${user}`);
        // eslint-disable-next-line no-underscore-dangle
        setUsernameId(e.target.value);
      }}
    >
      {label}
    </button>
  )
);
