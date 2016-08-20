import _ from "lodash";
import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, BackAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { ManagePage } from "./pages/manage";
import { IndexPage } from "./pages/index";
import { GiphySearchPage } from "./pages/giphySearch";

const store = configureStore();

let globalNavigator;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (globalNavigator) {
    globalNavigator.pop();
    return true;
  }
  return false;
});

export class App extends Component {
  constructor(props) {
    super(props)
    this.routes = [
      {
        page: "index",
        view: (navigator) => <IndexPage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "manage",
        view: (navigator) => <ManagePage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "giphySearch",
        view: (navigator) => <GiphySearchPage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      }
    ];
  }
  renderScene(route, navigator) {
    return route.view(navigator)
  }
  router(navigator) {
    globalNavigator = navigator;
    return {

      // Noob. Routes need to be immutable :P
      changeRoute: (page) => navigator.push(_.cloneDeep(_.find(this.routes, { page }))),

      previousRoute: () => navigator.pop()
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={this.routes[0]}
          initialRouteStack={this.routes}
          configureScene={(route, routeStack) => route.transition}
          renderScene={this.renderScene}
        />

      </Provider>
    );
  }
}

AppRegistry.registerComponent('sayHello', () => App);