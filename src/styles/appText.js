import React, { Component } from 'react';
import { Text } from 'react-native';
import { styles } from "./stylesheet";

export let AppText = React.createClass({
  render: function() {
    return (
      <Text style={[styles.text, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
});