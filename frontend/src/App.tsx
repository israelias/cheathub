import React from 'react';
import TextField from './components/textfield'
import {Counter} from './components/counter'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {Home} from './pages/home'
import {About} from './pages/about'
import {Post} from './pages/post'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/posts/:id" exact component={Post} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};


export default App;
