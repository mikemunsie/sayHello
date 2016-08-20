import React, { Component } from 'react';
import { GiphySearch } from "../../giphySearch/giphySearchComponent";
import { AppText, styles } from "../styles/stylesheet";
import { Text, Image, TouchableHighlight, View } from 'react-native';

export class GiphySearchPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <GiphySearch />
      </View>
    )
  }
}