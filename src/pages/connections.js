import _ from 'lodash';
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { AppText, styles } from "../styles/stylesheet";

import { Text, Image, Platform, TouchableHighlight, View } from 'react-native';

export class ConnectionsPage extends Component {
  constructor(props) {
    super(props)
    this.counter = 0;
    this.watchId = null;
    this.state = {
      initialPosition: "Loading GPS..."
    }
  }
  getLatestPosition() {
    navigator.geolocation.watchPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        //this.setState({initialPosition});
      },
      (error) => { },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        timeout: 0
      }
    );
  }
  componentDidMount() {
    this.getLatestPosition();
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <Text>{this.state.initialPosition}</Text>
      </View>
    )
  }
}