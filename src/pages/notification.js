import _ from 'lodash';
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { AppText, styles } from "../styles/stylesheet";

import { Text, Image, Platform, TouchableHighlight, View } from 'react-native';

export class NotificationPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <Text>You just got a notification!</Text>
      </View>
    )
  }
}