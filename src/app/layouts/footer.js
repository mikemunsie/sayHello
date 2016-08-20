import React, { Component } from 'react';
import { Text, Image, View, TouchableHighlight, Dimensions } from 'react-native';
import { styles, colors } from "../styles/stylesheet";
var { height, width } = Dimensions.get('window');

export class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 0, height: 70}}>
        <TouchableHighlight
          activeOpacity={.9}
          underlayColor="#eee"
          style={{position: "absolute", left: 30, marginTop: 20 }}
          onPress={() => this.props.router.changeRoute("profile") }
        >
          <Image style={{height: 30, width: 30}} source={require("../images/fa-user.png")} />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={.9}
          underlayColor="#eee"
          style={{ position: "absolute", bottom: 0, zIndex: 10, left: width/2 - 70}}
          onPress={() => this.props.router.changeRoute("pulse") }
        >
          <Image style={{height: 80, width: 140}} source={require("../images/findUsers.png")} />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={.9}
          underlayColor="#eee"
          style={{position: "absolute", right: 30, marginTop: 20}}
          onPress={() => this.props.router.changeRoute("connections") }
        >
          <Image style={{height: 30, width: 37}} source={require("../images/fa-list-ul.png")} />
        </TouchableHighlight>
      </View>
    );
  }
}