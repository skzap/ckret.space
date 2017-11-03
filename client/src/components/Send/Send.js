// @flow
import React, { Component } from 'react';
import {
  Panel,
  Form, FormGroup, InputGroup, FormControl,
  ButtonToolbar, Button
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import steem from 'steem';

import './Send.css';


type Props = {
  auth: Auth
};

type State = {
  sender: string,
  key: string,
  receiver: string,
  file: File,
  filename: string,
  filetype: string,
  valid: boolean
};

export default class Send extends Component<Props, State> {
  state: State = {
    sender: 'curator',
    key: '5KgksXeg4rNvVoJjRJ5ve7RcxpPww1v8V8pKyDFV69j6cPrkgm5',   // Private posting key
    receiver: 'magnat',
    file: null,
    filename: '',
    filetype: '',
    valid: false
  };

  file = null;


  changeSender(e) {
    const sender = e.target.value;
    this.setState({sender});
    setTimeout(this.validate.bind(this), 0);
  }

  changeSenderKey(e) {
    const key = e.target.value;
    this.setState({key});
    setTimeout(this.validate.bind(this), 0);
  }

  changeReceiver(e) {
    const receiver = e.target.value;
    this.setState({receiver});
    setTimeout(this.validate.bind(this), 0);
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
    if(!e.target.files || !e.target.files[0]) {
      this.setState({
        file: null,
        filename: '',
        filetype: '',
        valid: false
      });
      return;
    }

    const file = e.target.files[0];
    const filename = file.name;
    const filetype = file.type;
    this.setState({
      file,
      filename,
      filetype
    });
    setTimeout(this.validate.bind(this), 0);
  }

  validate() {
    const valid = (
      this.state.sender.length >= 3 && this.state.receiver.length >= 3 &&
      this.state.key.length >= 10 && this.state.file !== null
    );
    this.setState({valid});
  }

  handleSend(e) {
    e.preventDefault();

    const file = this.state.file;

    // If we don't have file it's ok
    if(!file) return;

    this.readFileB64Data(file)
      .then(data => {
        //var senderPublicKey = 'STM8PTfBzwLq38cvX3TJiYExSTMtHBvMAf1YSXkCu3G5Hh3xBkbqQ'   // TODO: Get these from the blockchain
        var senderPrivateKey = '5JHjZc4nt2Lp929pcXRs39RkjvMmNYY2a4phMU3by8uUs8uWoqC'
        var receiverPublicKey = 'STM7s8o9v3Jyo722PLKtSvKffVBPUVNaGD4gVAGd1hk28dV3MHUhB'

        var rootPost = {
        	author: 'curator',
        	permlink: 'this-post-will-include-encrypted-pictures'
        }

        console.log('DATA', data.length);
      	var encryptedData = steem.memo.encode(senderPrivateKey, receiverPublicKey, data);
        console.log('ENCRYPTED', encryptedData.length, data === encryptedData);

        var jsonMetadata = {
      		app: 'ckret.space/0.1',
      		secret: {
      			data: encryptedData
      		}
      	}
      	return steem.broadcast.comment(
      		this.state.key,
      		rootPost.author,
      		rootPost.permlink,
      		this.state.sender,
      		'1uifhui1hfi1h3fio13oih',
      		'Another Test',
      		'Now from the frontend',
      		jsonMetadata
      	);
      })
      .then(result => {
        toast.info('File sent successfully!');
      })
      .catch(err => {
        toast.error('Error sending file:', err.message);
      });
  }

  readFileB64Data(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(btoa(reader.result));
      reader.onerror = (e) => reject(reader.error);
      reader.readAsBinaryString(file);
    });
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
                <FormControl type="text" placeholder="Sender STEEM Username" value={this.state.sender}
                  onChange={this.changeSender.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formSenderKey">
              <InputGroup>
                <InputGroup.Addon><i className="send-icon fa fa-key" /></InputGroup.Addon>
                <FormControl type="password" placeholder="Sender STEEM Private Posting Key" value={this.state.key}
                  onChange={this.changeSenderKey.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formReceiver">
              <InputGroup>
                <InputGroup.Addon><i className="send-icon fa fa-user-secret" /></InputGroup.Addon>
                <FormControl type="text" placeholder="Receiver STEEM Username" value={this.state.receiver}
                  onChange={this.changeReceiver.bind(this)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formFile">
              <InputGroup>
                <InputGroup.Button>
                  <Button onClick={this.clickFile.bind(this)}>Select CKRET File</Button>
                </InputGroup.Button>
                <FormControl value={this.state.file !== '' ? this.state.filename : 'No CKRET file'} readOnly />
              </InputGroup>
              <input type="file" ref={elem => this.file = elem} className="hidden" onChange={this.changeFile.bind(this)} />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar className="pull-right">
                <Button bsStyle="primary" disabled={!this.state.valid} onClick={this.handleSend.bind(this)}>Send it</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}
