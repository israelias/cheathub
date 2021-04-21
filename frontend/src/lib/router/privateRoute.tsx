import * as React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserContext } from '../../context/user.context';

import { checkAuth } from '../checkAuth';

interface PrivateRouteProps {
  // children?: React.ReactNode;
}

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { username } = useUserContext();
  const loggedIn = checkAuth({ username });
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          Component && <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
