/* eslint-disable consistent-return */

/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */

import * as React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AppContainer } from './containers/app.container';

import { AppDataProvider } from './context/appdata.context';
import { ProfileDataProvider } from './context/profiledata.context';
import { HandlerDataProvider } from './context/datahandler.context';

import Snippets from './pages/snippets';
import Snippet from './pages/snippet';
import { Registration } from './pages/registration';
import { Login } from './pages/login';
import { Home } from './pages/home';
import Faves from './pages/faves';
import Collections from './pages/collections';

import { PrivateRoute } from './lib/router/privateRoute';
import { useUserContext } from './context/user.context';
import { SignInPrompt } from './components/modals/auth-prompt';

import { checkAuth } from './lib/checkAuth';

const App: React.FC = () => {
  const { username } = useUserContext();

  const [alert, setAlert] = React.useState(false);
  const closeAlert = () => {
    setAlert(false);
  };
  const openAlert = () => {
    setAlert(true);
  };

  function checkUserData(e: StorageEvent) {
    console.log('TRIGGER!!!');

    if (e.key === 'app_logout') {
      console.log('TRIGGER LOGOUT');
      openAlert();
    }
  }

  React.useEffect(() => {
    window.addEventListener('storage', (e) => checkUserData(e));

    return () => {
      window.removeEventListener('storage', (e) => checkUserData(e));
    };
  }, []);

  // window.removeEventListener('storage', () => {
  //   window.alert('session storage variable value changed');
  // });

  return (
    <BrowserRouter>
      <AppDataProvider>
        <ProfileDataProvider>
          <HandlerDataProvider>
            <AppContainer>
              <SignInPrompt
                onOpen={openAlert}
                onClose={closeAlert}
                isOpen={alert}
              />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/registration/:id"
                  exact
                  component={Registration}
                />
                {/* Potential Public Preview */}
                {/* <Route path="/test" exact component={Explore} /> */}

                {/* DASHBOARD COLLECTIONS|SNIPPETS FEED */}

                <PrivateRoute
                  path="/collections/:id"
                  exact
                  component={Collections}
                />

                {/* Search/explore SNIPPETS FEED */}
                <PrivateRoute
                  path="/explore"
                  exact
                  component={Snippets}
                />
                {/*  TO SNIPPET ID. Main Crud. */}
                <PrivateRoute
                  path="/explore/:id"
                  exact
                  component={Snippet}
                />

                <PrivateRoute path="/faves" exact component={Faves} />

                {/* TO SNIPPET ID. Alternative. */}
                <PrivateRoute path="/add" exact component={Snippet} />
                <PrivateRoute path="/test" exact component={Home} />

                <Route path="/" render={() => <div>404</div>} />
              </Switch>
            </AppContainer>
          </HandlerDataProvider>
        </ProfileDataProvider>
      </AppDataProvider>
    </BrowserRouter>
  );
};

export default App;
