import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { Text, Image, ScrollView, Dimensions, TextInput, TouchableHighlight, View } from 'react-native';
import { AppText, styles } from "../styles/stylesheet";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImagePicker from 'react-native-image-picker';
import { Footer } from "../layouts/footer";
var { height, width } = Dimensions.get('window');

class PulsePageComponent extends Component {
  constructor(props) {
    super(props);
    this.watchId = null;
    this.state = {
      pic: undefined
    }
  }
  getLatestPosition() {
    this.watchId = navigator.geolocation.watchPosition(
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
    const { criteria } = this.props;
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <View style={{flex: 1}}>
          <View style={{position: "absolute", backgroundColor: "#FB6B65", left: width/2 - 200, top: height/2 - 280, width: 400, height: 400, borderRadius: 200, borderWidth: 2, borderColor: "#FE9C98" }}></View>
          <View style={{position: "absolute", backgroundColor: "#FD726C", left: width/2 - 160, top: height/2 - 230, width: 300, height: 300, borderRadius: 300, borderWidth: 2, borderColor: "#FE9C98" }}></View>
          <View style={{position: "absolute", backgroundColor: "#FB6B65", left: width/2 - 110, top: height/2 - 190, width: 200, height: 200, borderRadius: 200, borderWidth: 2, borderColor: "#FE9C98" }}></View>
          <View style={{width: 140, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", height: 140, top: height/2-170, position: "absolute", left: width/2 - 80, marginTop: 10, borderRadius: 100}}>
            {(() => {
              if (this.state.pic) {
                return (
                  <Image source={this.state.pic} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 132, borderRadius: 100, height: 132}]} />
                )
              } else {
                return (
                  <View style={{ alignItems: "center" }}>
                    <Image source={require("../images/fa-user.png")} style={{marginTop: 40, width: 50, height: 55}} />
                  </View>
                )
              }
            })()}
          </View>
        </View>

        {/* Footer */}
        <View style={{flex: 0, backgroundColor: "#eee", height: 85, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
          <AppText style={{fontFamily: "Lato-Bold", textAlign: "center"}}>Tap Connection to say Hello!</AppText>
        </View>
        <Footer router={this.props.router} />
      </View>
    )
  }
}

export const PulsePage = connect(
  state => {
    return {
      criteria: state.GiphySearch.criteria
    }
  }
)(PulsePageComponent)