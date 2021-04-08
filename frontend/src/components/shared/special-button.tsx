import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export const SpecialButton = withRouter(({ history }) => {
  return (
    <button
      onClick={() => {
        history.push('/posts/special');
      }}
    >
      special button
    </button>
  );
});

interface Props extends RouteComponentProps {
  user: string;
  label: string;
}

export const ToUserButton = withRouter(({ history, user, label }: Props) => {
  return (
    <button
      onClick={() => {
        history.push(`/profiles/${user}`);
      }}
    >
      {label}
    </button>
  );
});
