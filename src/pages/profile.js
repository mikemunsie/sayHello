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
    this.state = {
      user: this.props.user
    }
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
      console.log(dispatch);
      dispatch(UserActions.saveProfile({
        ...this.state.user,
        pic: response.data
      }));
    });
  }
  render() {
    return (
      <LinearGradient colors={[colors.primary, '#F9645E']} style={[styles.container, styles.flexColumn]}>
        <TouchableHighlight
          activeOpacity={.9}
          underlayColor="#eee"
          style={{width: 160, zIndex: 10, borderColor: "#bbb", borderWidth: 4, backgroundColor: "#fff", height: 160, position: "absolute", left: width/2 - 80, marginTop: 10, borderRadius: 100}}
          onPress={() => this.showCamera() }
        >
          <View style={{flex: 1}}>
            {(() => {
              if (this.state.user.pic) {
                return (
                  <Image source={{uri: 'data:image/jpeg;base64,' + this.state.user.pic, isStatic: true}} style={[styles.backgroundImage, { position: "absolute", top: 0, left: 0, width: 152, borderRadius: 100, height: 152}]} />
                )
              } else {
                return (
                  <View style={{ alignItems: "center" }}>
                    <Image source={require("../images/fa-user.png")} style={{marginTop: 40, width: 50, height: 55}} />
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
            onChangeText={(text) => this.setState({text})}
            defaultValue={this.state.user.name}
          />
          <TextInput
            style={{height: 40, backgroundColor: "transparent", fontSize: 17, textAlign: "center", borderColor: 'gray', borderWidth: 0}}
            onChangeText={(text) => this.setState({text})}
            defaultValue={this.state.user.title}
          />

          <View style={{marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-phone.png")} />
            <TextInput
              keyboardType="numeric"
              style={{height: 40,  backgroundColor: "transparent", paddingLeft: 30, lineHeight: 40,  borderWidth: 0}}
              onChangeText={(text) => this.setState({text})}
              defaultValue={this.state.user.phone}
            />
          </View>
          <View style={{marginTop: 7, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-envelope.png")} />
            <TextInput
              style={{height: 40,  backgroundColor: "transparent", paddingLeft: 30}}
              onChangeText={(text) => this.setState({text})}
              defaultValue={this.state.user.email}
            />
          </View>
          <View style={{marginTop: 7, borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
            <Image style={{position: "absolute", top: 12}} source={require("../images/fa-globe.png")} />
            <TextInput
              style={{height: 40, flex: 1, backgroundColor: "transparent", paddingLeft: 30, lineHeight: 40}}
              onChangeText={(text) => this.setState({text})}
              defaultValue={this.state.user.website}
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
        </View>

        {/* Footer */}
        <View style={{flex: 1}}>
          <Footer router={this.props.router} />
        </View>

      </LinearGradient>
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