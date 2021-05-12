import * as React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppContainer } from './containers/app.container';

import { UserProvider } from './context/user.context';
import { AppDataProvider } from './context/appdata.context';
import { ProfileDataProvider } from './context/profiledata.context';
import { DataHandlerProvider } from './context/datahandler.context';
import { CollectionHandlerProvider } from './context/collectionhandler';

import Snippets from './pages/snippets';
import Snippet from './pages/snippet';
import { Home } from './pages/home';
import Collections from './pages/collections';
import Collection from './pages/collection';

import { PrivateRoute } from './lib/privateRoute';

const App: React.FC = () => (
  <BrowserRouter>
    <UserProvider>
      <AppDataProvider>
        <ProfileDataProvider>
          <DataHandlerProvider>
            <CollectionHandlerProvider>
              <AppContainer>
                <Switch>
                  <Route path="/" exact component={Home} />

                  <PrivateRoute
                    path="/collections/:id"
                    exact
                    component={Collections}
                  />
                  <PrivateRoute
                    path="/explore"
                    exact
                    component={Snippets}
                  />
                  <PrivateRoute
                    path="/snippets/:id"
                    exact
                    component={Snippet}
                  />
                  <PrivateRoute
                    path="/collection/:id"
                    exact
                    component={Collection}
                  />
                  <Route path="/:id" exact component={Home} />

                  <Route path="/" render={() => <div>404</div>} />
                </Switch>
              </AppContainer>
            </CollectionHandlerProvider>
          </DataHandlerProvider>
        </ProfileDataProvider>
      </AppDataProvider>
    </UserProvider>
  </BrowserRouter>
);
export default App;
