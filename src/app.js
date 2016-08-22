import React, { Component } from 'react';
import { AppRegistry, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { Router } from "./router";
import { colors, AppText } from "./styles/stylesheet";
import * as processes from "./processes";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }
  componentDidMount() {
    processes.User.init();
    processes.Pulse.init();
    this.setState({
      ready: true
    });
  }
  render() {
    if (this.state.ready) {
      return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <StatusBar />
            <Router />
          </View>
        </Provider>
      )
    } else {
      return (
        <View>
          <AppText>Loading App...</AppText>
        </View>
      )
    }
  }
}

AppRegistry.registerComponent('sayHello', () => App);