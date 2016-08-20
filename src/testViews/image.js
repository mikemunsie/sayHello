import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image
} from 'react-native';

export class ViewsImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pic = {
      uri: "http://munstrocity.com/public/images/logo.png"
    };
    return (
      <View  style={{flex: 1, backgroundColor: "#000000"}}>
        <Image source={pic} style={{width: 200, height: 60, resizeMode: 'stretch'}}  />
      </View>
    );
  }
}