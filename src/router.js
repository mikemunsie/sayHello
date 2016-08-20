import _ from "lodash";
import React, { Component } from 'react';
import { Navigator, Text, View, BackAndroid } from 'react-native';
import { ProfilePage } from "./pages/profile";
import { IndexPage } from "./pages/index";
import { PulsePage } from "./pages/pulse";
import { ConnectionsPage } from "./pages/connections";
import { NotificationPage } from "./pages/notification";

let globalNavigator;
let routeIndex = 0;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (globalNavigator) {
    if (routeIndex-1 > 0) {
      routeIndex--;
      globalNavigator.pop();
    }
    return true;
  }
  return false;
});

export class Router extends Component {
  constructor(props) {
    super(props)
    this.routes = [
      {
        page: "index",
        view: (navigator) => <IndexPage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "connections",
        view: (navigator) => <ConnectionsPage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "notification",
        view: (navigator) => <NotificationPage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "profile",
        view: (navigator) => <ProfilePage router={this.router(navigator)} />,
        transition: Navigator.SceneConfigs.FloatFromRight
      },
      {
        page: "pulse",
        view: (navigator) => <PulsePage router={this.router(navigator)} />,
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
      changeRoute: (page) => {
        routeIndex++;
        navigator.push(_.cloneDeep(_.find(this.routes, { page })))
      },
      previousRoute: () => {
        routeIndex--;
        navigator.pop();
      }
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={this.routes[0]}
        initialRouteStack={this.routes}
        configureScene={(route, routeStack) => route.transition}
        renderScene={this.renderScene}
      />
    );
  }
}