import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './containers/App/';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/" name="App" component={App}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'))
registerServiceWorker();
