import _ from "lodash";
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { Text, Image, ScrollView, Dimensions, TextInput, TouchableHighlight, View } from 'react-native';
import { AppText, styles, colors } from "../styles/stylesheet";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImagePicker from 'react-native-image-picker';
import { Footer } from "../layouts/footer";
import * as UserActions from "../actions/user";
var { height, width } = Dimensions.get('window');

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.debouncedUpdate = _.debounce(this.update, 400);
  }
  update(user) {
    let { dispatch } = this.props;
    dispatch(UserActions.saveProfile(user));
  }
  showCamera() {
    let { dispatch } = this.props;
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      customButtons: {
        'Choose Photo from Facebook': 'fb',
      },
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }, (response) => {
      if (!response.data) return;
      dispatch(UserActions.saveProfile({
        ...this.props.user,
        pic: response.data
      }));
    });
  }
  render() {

    return (
      <View style={[styles.container, styles.flexColumn]}>
        <TouchableHighlight
          activeOpacity={.9}
          underlayColor="#eee"
          style={{width: 160, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", height: 160, position: "absolute", left: width/2 - 80, marginTop: 10, borderRadius: 100}}
          onPress={() => this.showCamera() }
        >
          <View style={{flex: 1}}>
            {(() => {
              if (this.props.user.pic) {
                return (
                  <Image source={{uri: 'data:image/jpeg;base64,' + this.props.user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 152, borderRadius: 100, height: 152}]} />
                )
              } else {
                return (
                  <View style={{ alignItems: "center" }}>
                    <Image source={require("../images/fa-userBig.png")} style={{marginTop: 30, width: 50, height: 55}} />
                    <AppText style={{marginTop: 15, fontSize: 17, color: "#aaa"}}>Add Photo</AppText>
                  </View>
                )
              }
            })()}
          </View>
        </TouchableHighlight>
        <View style={{flex: 0, height: 110}}></View>

        {/* DETAILS */}
        <View style={{backgroundColor: "#fff", paddingTop: 70, paddingLeft: 30, paddingRight: 30, flex: 0, height: 340, zIndex: 4}}>
          <TextInput
            style={[styles.text, { fontFamily: "Lato-Bold", height: 50, fontSize: 20, borderColor: '#aaa', textAlign: "center", borderWidth: 1}]}
            onChangeText={(text) => this.debouncedUpdate({ ...this.props.user, name: text })}
            defaultValue={this.props.user.name}
          />
          <TextInput
            style={{height: 40, backgroundColor: "transparent", fontSize: 17, textAlign: "center", borderColor: 'gray', borderWidth: 0}}
            onChangeText={(text) => this.debouncedUpdate({ ...this.props.user, title: text })}
            defaultValue={this.props.user.title}
          />

          <View style={{marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-phone.png")} />
            <TextInput
              keyboardType="numeric"
              style={{height: 40,  backgroundColor: "transparent", paddingLeft: 30, lineHeight: 40,  borderWidth: 0}}
              onChangeText={(text) => this.debouncedUpdate({ ...this.props.user, phone: text })}
              defaultValue={this.props.user.phone}
            />
          </View>
          <View style={{marginTop: 7, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-envelope.png")} />
            <TextInput
              style={{height: 40,  backgroundColor: "transparent", paddingLeft: 30}}
              onChangeText={(text) => this.debouncedUpdate({ ...this.props.user, email: text })}
              defaultValue={this.props.user.email}
            />
          </View>
          <View style={{marginTop: 7, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-globe.png")} />
            <TextInput
              style={{height: 40, flex: 1, backgroundColor: "transparent", paddingLeft: 30, lineHeight: 40}}
              onChangeText={(text) => this.debouncedUpdate({ ...this.props.user, website: text })}
              defaultValue={this.props.user.website}
            />
          </View>
        </View>

        {/* SOCIAL */}
        <View style={{backgroundColor: "rgba(242, 242, 242, 1.00)", flex: 0, height: 100, alignItems: "center", paddingLeft: 30, flexDirection: "row"}}>
          <TouchableHighlight
            activeOpacity={.9}
            underlayColor="#eee"
            style={{padding: 10, marginRight: 15, backgroundColor: "rgba(155, 155, 155, 1.00)", width: 40, height: 40, borderRadius: 8 }}
            onPress={() => this.showCamera() }
          >
            <Image source={require("../images/fa-linkedin.png")} />
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={.9}
            underlayColor="#eee"
            style={{padding: 10, backgroundColor: "rgba(155, 155, 155, 1.00)", width: 40, height: 40, borderRadius: 8 }}
            onPress={() => this.showCamera() }
          >
            <Image source={require("../images/fa-twitter.png")} />
          </TouchableHighlight>
          <Image style={{marginLeft: 18}} source={require("../images/dropdown.png")} />
        </View>

        {/* Footer */}
        <View style={{flex: 1}}>
          <Footer router={this.props.router} />
        </View>

      </View>
    )
  }
}

export const ProfilePage = connect(
  state => {
    return {
      user: state.User
    }
  }
)(ProfileComponent)