import _ from 'lodash';
import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { View, Text, TextInput } from 'react-native';
import * as Actions from "./giphySearchActions";
import { Results } from "./giphySearchResults";
import { MKColor, MKTextField } from 'react-native-material-kit';

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Search:')
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

class GiphySearchComponent extends Component {
  constructor(props) {
    super(props)
    this.debouncedSearch = _.debounce(this.update, 400);
    this.state = {
      text: "cool"
    }
  }
  update(text) {
    let { dispatch } = this.props;
    dispatch(Actions.fetchPosts(text))
  }
  render() {
    return (
      <View style={{padding: 15 }}>
        <TextfieldWithFloatingLabel
          style={{marginBottom: 15}}
          onChangeText={(text) => this.debouncedSearch(text)}
          defaultValue={this.props.stateCriteria}
        />
        <Results />
      </View>
    )
  }
}

export const GiphySearch = connect(
  state => {
    return {
      stateCriteria: state.GiphySearch.criteria
    }
  }
)(GiphySearchComponent)