import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  WebView
} from 'react-native';

export class ViewsWebView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WebView
        source={{uri: 'http://munstrocity.com:9002'}}
      />
    );
  }
}