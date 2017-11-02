// @flow
import React, { Component } from 'react';
import {
  Panel,
  Form, FormGroup, InputGroup, FormControl,
  ButtonToolbar, Button
} from 'react-bootstrap';

import './Send.css';


type Props = {
  auth: Auth
};

type State = {
  sender: string,
  key: string,
  receiver: string,

};

export default class Send extends Component<Props, State> {
  state = {
    sender: '',
    key: '',
    receiver: '',
    file: '',
    valid: false
  };

  file = null;


  changeSender(e) {
    const sender = e.target.value;
    this.setState({sender});
    this.validate();
  }

  changeSenderKey(e) {
    const key = e.target.value;
    this.setState({key});
    this.validate();
  }

  changeReceiver(e) {
    const receiver = e.target.value;
    this.setState({receiver});
    this.validate();
  }

  clickFile() {
    this.performClick(this.file);
  }

  performClick(elem) {
    if(elem && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
    }
  }

  changeFile(e) {
    const file = e.target.value;
    this.setState({file});
    this.validate();
  }

  validate() {
    console.log(this.state)
    if(this.state.sender.length >= 3 && this.state.receiver.length >= 3 &&
        this.state.key.length >= 10 && this.state.file !== '') {
      this.setState({valid: true});
    }
    this.setState({valid: false});
  }

  render() {
    const title=(
      <h4>Do you want to send a CKRET?</h4>
    );

    return (
      <div className="background">
        <Panel header={title} className="panel">
          <Form>
            <FormGroup controlId="formSender">
              <InputGroup>
                <InputGroup.Addon><i className="send-icon fa fa-user" /></InputGroup.Addon>
                <FormControl type="text" placeholder="Sender STEEM Username"
                  onChange={this.changeSender.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formSenderKey">
              <InputGroup>
                <InputGroup.Addon><i className="send-icon fa fa-key" /></InputGroup.Addon>
                <FormControl type="password" placeholder="Sender STEEM Private Posting Key"
                  onChange={this.changeSenderKey.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formReceiver">
              <InputGroup>
                <InputGroup.Addon><i className="send-icon fa fa-user-secret" /></InputGroup.Addon>
                <FormControl type="text" placeholder="Receiver STEEM Username"
                  onChange={this.changeReceiver.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formFile">
              <InputGroup>
                <InputGroup.Button>
                  <Button onClick={this.clickFile.bind(this)}>Select CKRET File</Button>
                </InputGroup.Button>
                <FormControl value={this.state.file !== '' ? this.state.file : 'No CKRET file'} readOnly />
              </InputGroup>
              <input type="file" ref={elem => this.file = elem} className="hidden" onChange={this.changeFile.bind(this)} />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar className="pull-right">
                <Button bsStyle="primary" disabled={!this.state.valid}>Send it</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}
