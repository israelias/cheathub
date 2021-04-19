/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable no-alert */
import * as React from 'react';
// import { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import { Profile } from './pages/profile';
import { Snippet } from './pages/snippets';
import { Registration } from './pages/registration';
import { Login } from './pages/login';
import { AddPage } from './pages/add';
import Test from './pages/test';
import { Explore } from './pages/explore';
import { SnipTest } from './pages/snippet-test';
import { useUserContext } from './context/user.context';
import { checkAuth } from './lib/checkAuth';

interface PrivateRouteProps {
  // children?: React.ReactNode;
}

const PrivateRoute: React.FC<RouteProps> = ({
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

const App: React.FC = () => {
  const {
    setAccessToken,
    setUsername,
    setLoggedIn,
  } = useUserContext();
  const logoutEventName = 'app_logout';

  window.addEventListener('storage', () => {
    alert('session storage variable value changed');
  });

  // This listener will allow to disconnect a session of ra started in another tab
  window.addEventListener('storage', (event) => {
    if (event.key === logoutEventName) {
      setAccessToken('');
      setUsername('');
      setLoggedIn(false);
    }
  });

  console.log(process.env.PUBLIC_URL);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/registration/:id"
          exact
          component={Registration}
        />
        <Route path="/explore" exact component={Explore} />

        <PrivateRoute path="/profile/:id" exact component={Profile} />
        <PrivateRoute path="/posts" exact component={SnipTest} />
        <PrivateRoute path="/posts/:id" exact component={Snippet} />
        <PrivateRoute path="/add" exact component={AddPage} />
        <PrivateRoute path="/test" exact component={Test} />

        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
