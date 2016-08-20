import _ from "lodash";
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
    this.sprites = {};
    this.watchId = null;
    this.sampleUsers = [
      _.cloneDeep(this.props.user),
      _.cloneDeep(this.props.user),
      _.cloneDeep(this.props.user)
    ];
    this.sampleUsers[0].ring = 0;
    this.sampleUsers[1].ring = 1;
    this.sampleUsers[2].ring = 2;

    this.sampleUsers[0].id = 0;
    this.sampleUsers[1].id = 1;
    this.sampleUsers[2].id = 2;
    _.each(this.sampleUsers, (user) => this.setupSprite(user));
  }
  setupSprite(user) {
    let degree = 0;
    let radius = 200;
    if (user.ring === 0) radius = 100;
    if (user.ring === 1) radius = 200;
    if (user.ring === 2) radius = 300;
    this.sprites[user.id] = {
      degree,
      radius,
      x: 0,
      y: 0,
      user
    };
  }
  orbit(user) {
    let offsetX = (width/2) - 70;
    let offsetY = (height/2) - 170;
    let y = (Math.sin(this.sprites[user.id].degree) * this.sprites[user.id].radius) + offsetX;
    let x = (Math.cos(this.sprites[user.id].degree) * this.sprites[user.id].radius) + offsetY;
    return {
      x,
      y
    }
  }
  componentDidMount() {

  }
  render() {
    let counter = 0;
    let Images = this.sampleUsers.map((user) => {
      let position = this.orbit(user);
      let radius = 60;
      let top = position.x - 60;
      let left = position.y - 60;
      counter++;
      if (this.props.user.pic) {
        return (
          <View key={counter} style={{width: radius, height: radius, top, left, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", position: "absolute", borderRadius: 100}}>
            <Image source={{uri: 'data:image/jpeg;base64,' + user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 54, height: 54, borderRadius: 100}]} />
          </View>
        );
      } else {
        return (
          <View key={counter} style={{width: radius, height: radius, top, left, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", position: "absolute", borderRadius: 60}}>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../images/fa-user.png")} style={{marginTop: 15, width: 20, height: 22}} />
            </View>
          </View>
        );
      }
    });

    return (
      <View style={[styles.container, styles.flexColumn]}>
        <View style={{flex: 1}}>

          {/* Ring 1 */}
          <View style={{position: "absolute", backgroundColor: "#f06a66", left: width/2 - 200, top: height/2 - (190+100), width: 400, height: 400, borderRadius: 200, borderWidth: 2, borderColor: "#Fa9C98" }}></View>

          {/* Ring 1 */}
          <View style={{position: "absolute", backgroundColor: "#FD726C", left: width/2 - 150, top: height/2 - (190+50), width: 300, height: 300, borderRadius: 300, borderWidth: 2, borderColor: "#Fa9C98" }}></View>

          {/* Ring 0 */}
          <View style={{position: "absolute", backgroundColor: "#f36c66", left: width/2 - 100, top: height/2 - 190, width: 200, height: 200, borderRadius: 200, borderWidth: 2, borderColor: "#Fa9C98" }}></View>

          {/* Users */}
          {Images}

          <View style={{width: 140, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", height: 140, top: height/2-170, position: "absolute", left: width/2 - 70, marginTop: 10, borderRadius: 100}}>
            {(() => {
              if (this.props.user.pic) {
                return (
                  <Image source={{uri: 'data:image/jpeg;base64,' + this.props.user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 132, borderRadius: 100, height: 132}]} />
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
      user: state.User,
      users: state.Pulse
    }
  }
)(PulsePageComponent)