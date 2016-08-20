import React, { Component } from 'react';
import { AppRegistry, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { Router } from "./router";
import { colors } from "./styles/stylesheet";

const store = configureStore();

export class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={colors.primary} />
          <Router />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('sayHello', () => App);