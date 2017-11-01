// @flow
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import './Show.css';


type Props = {
  auth: Auth
};

type State = {
};

export default class Upload extends Component<Props, State> {
  state = {
  };

  constructor(props: Props) {
    super(props);

  }

  render() {
    return (
      <div>Hello!</div>
    );
  }
}
