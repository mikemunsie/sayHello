// TODO: Finish this piece and explore the animated API

import ScrollableTabView from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  View,
  DeviceEventEmitter,
  Image,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import PushNotification from 'react-native-push-notification';

var BackgroundTimer = require('react-native-background-timer');

import { styles } from "./stylesheet";
import { ViewsDashboard } from "./views/dashboard";
import { ViewsWebView } from "./views/webView";
import { ViewsImage } from "./views/image";

class ReactNativeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0)
    };
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 1,
      }
    ).start();
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <View style={{backgroundColor: "#ff0000", height: 55, width: 55, flex: 0}} />
          <View style={{backgroundColor: "#000000", height: 55, width: 100, flex: 2}} >

          </View>
        </View>
        <View style={{flex: 1, position: 'relative', backgroundColor: "#333333"}}>
          <Animated.Image
            source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
            style={{
              flex: 1,
              transform: [
                {scale: this.state.bounceValue},
              ]
            }}
          />
        </View>
        <View style={{flex: 0, paddingTop: 10, height: 50, flexDirection: 'row', backgroundColor: "#000000"}}>
          <Text style={{color: "#ffffff"}}>This is my footer</Text>
        </View>
      </View>

    );
  }
}

AppRegistry.registerComponent('ReactNativeTest', () => ReactNativeTest);
