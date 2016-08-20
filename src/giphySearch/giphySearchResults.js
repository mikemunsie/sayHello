import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, View, Text, Image } from 'react-native';

class Result extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View className="result">
        <Image source={{uri: this.props.image.images.downsized.url}} style={{height: 200}}  />
      </View>
    )
  }
}
// <Image source={this.props.image.images.downsized.url} style={{width: 200, height: 60, resizeMode: 'stretch'}}  />

class ResultsComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props;
    let results = data.length > 0 ?
      data.map((image, index) =>
        <Result key={index} image={image} />
      ) :
      <Text>No results found :/</Text>
    return (
      <ScrollView style={{height: 600}} className="results">
        {results}
      </ScrollView>
    )
  }
}

export const Results = connect(
  state => {
    return {
      data: state.GiphySearch.posts
    }
  }
)(ResultsComponent)