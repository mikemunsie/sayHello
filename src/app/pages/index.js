import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { Text, Image, TouchableHighlight, View } from 'react-native';
import { AppText, styles } from "../styles/stylesheet";

class IndexComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { criteria } = this.props;
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <View style={{flex: 1, flexDirection: "row",  alignItems:'center'}}>
          <View style={{flex: 1}}>
            <AppText style={styles.h1}>Say Hello</AppText>
            <AppText style={[styles.p, styles.center]}>The Social App</AppText>
          </View>
        </View>
        <View style={{flex: 0, height: 200, alignItems: "center"}}>
          <TouchableHighlight
            activeOpacity={.9}
            underlayColor="#ffffff"
            style={[styles.button, { marginBottom: 15 }]}
            onPress={() => this.props.router.changeRoute("manage")}
          >
            <View style={[styles.buttonBlue]}>
              <AppText style={styles.buttonText}>Example View</AppText>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={.9}
            underlayColor="#ffffff"
            style={[styles.button, { marginBottom: 15 }]}
            onPress={() => this.props.router.changeRoute("giphySearch")}
          >
            <View style={[styles.buttonOrange]}>
              <AppText style={styles.buttonText}>Load Giphy Test View</AppText>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export const IndexPage = connect(
  state => {
    return {
      criteria: state.GiphySearch.criteria
    }
  }
)(IndexComponent)