import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { AppText, styles } from "../styles/stylesheet";
import LinearGradient from 'react-native-linear-gradient';

export class IndexPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    setTimeout(() => this.props.router.changeRoute("profile"), 2000);
  }
  render() {
    return (
      <LinearGradient colors={['#F4514A', '#F9645E']} style={[styles.container, styles.flexColumn]}>
        <View style={[styles.flexRow, { justifyContent: 'center', alignItems: "center", flex: 1}]}>
          <Image source={require("../images/logo.png")} style={{width: 200, height: 220}} />
        </View>
        <View style={{height: 20, flex: 0, marginBottom: 40}}>
          <AppText style={[styles.center, styles.white]}>2016 AT&T Hackathon</AppText>
        </View>
      </LinearGradient>
    )
  }
}