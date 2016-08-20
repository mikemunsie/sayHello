import React, { Component } from 'react';
import {
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
      bounceValue: new Animated.Value(0),
    };

    PushNotification.configure({
      requestPermissions: true
    });

    // Interval that will run in the background and run some tasks :D
    BackgroundTimer.start(30000);
    DeviceEventEmitter.addListener('backgroundTimer', () => {
      //this.testJSON().then(this.sendNotification);
    });
  }

  async testJSON() {
    try {
      let response = await fetch('http://munstrocity.com:9001/');
      let responseJson = await response.json();
      return responseJson.lastChecked;
    } catch(error) {
      console.error(error);
    }
  }

  sendNotification(message) {
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      message: message, // (required)
      playSound: true, // (optional) default: true
    });

  }
  componentWillUnmount() {
    BackgroundTimer.stop();
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
