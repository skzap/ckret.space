// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <ToastContainer
          position="top-center"
          type="default"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}
