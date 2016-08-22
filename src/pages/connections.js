import _ from "lodash";
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { Text, Image, ScrollView, Dimensions, TextInput, TouchableHighlight, View } from 'react-native';
import { AppText, styles, colors } from "../styles/stylesheet";
import { Footer } from "../layouts/footer";

class ConnectionsComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <View style={[styles.flexRow, { backgroundColor: "#fff", justifyContent: 'center', alignItems: "center", flex: 1}]}>
          <AppText>In Progress :(</AppText>
        </View>
        <Footer router={this.props.router} />
      </View>
    )
  }
}

export const ConnectionsPage = connect()(ConnectionsComponent)