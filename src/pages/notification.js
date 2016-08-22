import _ from 'lodash';
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { AppText, styles, colors } from "../styles/stylesheet";

import { Text, Image, Platform, TouchableHighlight, View } from 'react-native';

export class NotificationPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#fff"}}>
        <Image
          style={{resizeMode: "cover", width: 360, height: 340, flex: 1}}
          source={require('../images/notification.png')}
        >
        </Image>
      </View>

    )
  }
}