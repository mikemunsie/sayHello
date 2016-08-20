import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { styles } from "../stylesheet";

export class ViewsDashboard extends Component {

  constructor(props) {
    super(props);
    this.test = "great";
    this.state = {
      cool: "great",
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      movies: []
    };
  }

  getLatestPosition() {
    navigator.geolocation.watchPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
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
    this.setState({
      movies: this.getMoviesFromApi()
    });
  }
  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }


  async getMoviesFromApi() {
    try {
      let response = await fetch('http://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 50, height: 100, backgroundColor: 'powderblue'}} />
          <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
          <View style={{width: 150, height: 100, backgroundColor: 'steelblue'}} />
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {JSON.stringify(this.state.initialPosition)}
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
        </View>
      </View>
    );
  }
}