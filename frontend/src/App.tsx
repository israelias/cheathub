import * as React from 'react';
// import TextField from './components/shared/textfield'
// import {Counter} from './components/shared/counter'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {Home} from './pages/home'
import {About} from './pages/about'
import {Profile} from './pages/profile'
import {Snippet} from './pages/snippets'
import {Registration} from './pages/registration'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/posts/:id" exact component={Snippet} />
        <Route path="/registration/:id" exact component={Registration} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};


export default App;
