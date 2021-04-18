import * as React from 'react';
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

interface PrivateRouteProps extends RouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const { username } = useUserContext();
  const loggedIn = checkAuth({ username });
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const App: React.FC = () => (
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

export default App;
