import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import { Home } from './pages/home';
// import { About } from './pages/about';
import { Profile } from './pages/profile';
import { Snippet } from './pages/snippets';
import { Registration } from './pages/registration';
import { Login } from './pages/login';
import { AddPage } from './pages/add';
import Test from './pages/test';
import { Explore } from './pages/explore';
import { SnipTest } from './pages/snippet-test';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      {/* <Route path="/about" exact component={About} /> */}
      <Route path="/profile/:id" exact component={Profile} />
      <Route path="/posts" exact component={SnipTest} />
      <Route path="/posts/:id" exact component={Snippet} />
      <Route path="/add" exact component={AddPage} />
      <Route path="/test" exact component={Test} />
      <Route path="/explore" exact component={Explore} />
      <Route
        path="/registration/:id"
        exact
        component={Registration}
      />
      <Route path="/" render={() => <div>404</div>} />
    </Switch>
  </BrowserRouter>
);

export default App;
