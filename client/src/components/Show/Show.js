// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Steem from 'steem';

import './Show.css';


type Props = {
  auth: Auth
};

type State = {
};

export default class Upload extends Component<Props, State> {
  state = {
    blob: null,
    text: null
  };



  constructor(props: Props) {
    super(props);
    this.handleDecode = this.handleDecode.bind(this)
  }

  handleDecode(evt) {
    console.log(this.state, evt.target.value)
    var ppk = evt.target.value
    var decoded = Steem.memo.decode(ppk, this.state.text)
    console.log(decoded)
    // var type = this.state.blob.type.split('/')[0]
    // var container = this.state.blob.type.split('/')[1]
    // switch(type) {
    //     case 'text':
    //         const reader = new FileReader();
    //         reader.addEventListener('loadend', (e) => {
    //           const text = e.srcElement.result;
    //           console.log(text);
    //           const element = (
    //             <div>
    //               {text}
    //             </div>
    //           );
    //           ReactDOM.render(
    //             element,
    //             document.getElementById('secret')
    //           );
    //         });
    //         reader.readAsText(this.state.blob);
    //         break;
    //     case 'image':
    //         // display img
    //         break;
    //     case 'video':
    //         // display video
    //         break;    
    //     default:
    //         // download
    // }
  }

  componentDidMount() {
    console.log(this.props.match.params.hash)

    var xhr = new XMLHttpRequest();
    //xhr.open('GET', '/'+this.props.match.params.hash, true);
    xhr.open('GET', '/test.txt', true);
    //xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status == 200) {
        this.setState({text: xhr.response}) 
      }
    };
    xhr.send();
  }

  render() {
    return (
      <div>
        <h1>You have a secret message!!! {this.props.match.params.hash}</h1>
        <input onChange={this.handleDecode} type='password' name='ppk' id='ppk' placeholder='Your Private Posting Key' />
        <div id='secret'></div>
      </div>
    );
  }
}
