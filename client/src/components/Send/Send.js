// @flow
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import './Send.css';


type Props = {
  auth: Auth
};

type State = {
};

export default class Send extends Component<Props, State> {
  state = {
  };

  constructor(props: Props) {
    super(props);

  }

  render() {
    const title=(
      <h4>Do you want to send a CKRET?</h4>
    );

    return (
      <div className="background">
        <Panel header={title} className="panel">
          Hello
        </Panel>
      </div>
    );
  }
}
