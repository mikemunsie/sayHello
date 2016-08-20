import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { Text, Image, ScrollView, TouchableHighlight, View } from 'react-native';
import { AppText, styles } from "../styles/stylesheet";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { MKColor, MKTextField } from 'react-native-material-kit';

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Amount:')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
  .build();

class ManageComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { criteria } = this.props;
    return (
      <View style={[styles.container, styles.flexColumn]}>
        <ScrollableTabView
          initialPage={0}
          style={{height: 100}}
          >
          <ScrollView tabLabel="Summary" style={{height: 566, flex: 1}}>
            <View style={{height: 566, padding: 20}}>
              <TextfieldWithFloatingLabel />
            </View>
          </ScrollView>
          <ScrollView tabLabel="Details" style={{flex: 1}}>
            <View style={{height: 566}}>
              <AppText>View 2</AppText>
            </View>
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

export const ManagePage = connect(
  state => {
    return {
      criteria: state.GiphySearch.criteria
    }
  }
)(ManageComponent)