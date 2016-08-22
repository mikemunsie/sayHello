import _ from "lodash";
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import * as UserActions from "../actions/user";
import * as PulseActions from "../actions/pulse";
import { Text, Image, ScrollView, Dimensions, TextInput, TouchableHighlight, View } from 'react-native';
import { AppText, styles } from "../styles/stylesheet";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImagePicker from 'react-native-image-picker';
import { Footer } from "../layouts/footer";
var { height, width } = Dimensions.get('window');
import Api from "../api";

class PulsePageComponent extends Component {
  constructor(props) {
    super(props);
    this.sprites = {};
    this.watchId = null;
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(PulseActions.receiveUsers(Api.getUsersInArea()));
    Api.on(Api.AREA_CHANGED_EVENT, (entry) => {
      dispatch(PulseActions.receiveUsers(Api.getUsersInArea()));
    })
    Api.on(Api.REQUEST_CONTACT_EVENT, (entry) => {
      this.props.router.changeRoute("notification");
    });

  }
  setupSprite(user) {
    let degree = Math.random() * 3;
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
    let offsetX = 200;
    let offsetY = 200;
    let y = (Math.sin(this.sprites[user.id].degree) * this.sprites[user.id].radius) + offsetX;
    let x = (Math.cos(this.sprites[user.id].degree) * this.sprites[user.id].radius) + offsetY;
    return {
      x,
      y
    }
  }
  render() {
    let counter = 0;
    this.sprites = {};
    _.each(this.props.users, (user) => this.setupSprite(user));
    let Images = this.props.users.map((user) => {
      let position = this.orbit(user);
      let radius = 60;
      let top = position.x - 60;
      let left = position.y - 60;
      counter++;
      if (user.pic) {
        return (
          <View key={counter} style={{width: radius, height: radius, top, left, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", position: "absolute", borderRadius: 100}}>
            <Image source={{uri: 'data:image/jpeg;base64,' + user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 54, height: 54, borderRadius: 100}]} />
          </View>
        );
      } else {
        return (
          <View key={counter} style={{width: radius, height: radius, top, left, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", position: "absolute", borderRadius: 60}}>
            <View style={{ alignItems: "center" }}>
              <Image source={require("../images/fa-userBig.png")} style={{marginTop: 15, width: 20, height: 22}} />
            </View>
          </View>
        );
      }
    });

    return (
      <View style={[styles.container, styles.flexColumn]}>
        <View style={{flex: 0, height: 85, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
          <AppText style={{color: "#fff", fontSize: 17, fontFamily: "Lato-Bold", textAlign: "center"}}>Tap Connection to say Hello!</AppText>
        </View>

        <View style={{flex: 1}}>

          {/* Ring 1 */}
          <View style={{position: "absolute", backgroundColor: "rgba(70, 184, 189, 1.00)", left: width/2 - 200, top: height/2 - (190+145), width: 400, height: 400, borderRadius: 200, borderWidth: 2, borderColor: "rgba(116, 221, 226, 1.00)" }}></View>

          {/* Ring 1 */}
          <View style={{position: "absolute", backgroundColor: "rgba(102, 210, 215, 1.00)", left: width/2 - 150, top: height/2 - (190+95), width: 300, height: 300, borderRadius: 300, borderWidth: 2, borderColor: "rgba(116, 221, 226, 1.00)" }}></View>

          {/* Ring 0 */}
          <View style={{position: "absolute", backgroundColor: "rgba(85, 196, 201, 1.00)", left: width/2 - 100, top: height/2 - 240, width: 200, height: 200, borderRadius: 200, borderWidth: 2, borderColor: "rgba(116, 221, 226, 1.00)" }}></View>

          {/* Users */}
          {Images}

          <View style={{width: 140, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", height: 140, top: height/2-220, position: "absolute", left: width/2 - 70, marginTop: 10, borderRadius: 100}}>
            {(() => {
              if (this.props.user.pic) {
                return (
                  <Image source={{uri: 'data:image/jpeg;base64,' + this.props.user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 132, borderRadius: 100, height: 132}]} />
                )
              } else {
                return (
                  <View style={{ alignItems: "center" }}>
                    <Image source={require("../images/fa-userBig.png")} style={{marginTop: 40, width: 50, height: 55}} />
                  </View>
                )
              }
            })()}
          </View>
        </View>

        {/* Footer */}
        <View style={{flex: 0, height: 118, alignItems: "center", backgroundColor: "#eee", paddingTop: 15, flexDirection: "column"}}>
          <AppText style={{ fontSize: 17, fontFamily: "Lato-Bold", color: "#000", textAlign: "center"}}>Profession Filter ({this.props.users.length}):</AppText>
          <Image style={{marginTop: 10}} source={require("../images/dropdown.png")} />
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