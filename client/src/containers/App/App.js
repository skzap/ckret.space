// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './App.css';
import Send from '../../components/Send';
import Show from '../../components/Show';


type Props = {};

type State = {};

export default class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/send" name="Send" component={Send}/>
          <Route path="/show/:hash" name="Show" component={Show}/>
          <Redirect from='/' to='/send'/>
        </Switch>
      </div>
    );
  }
}
