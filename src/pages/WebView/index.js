/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View } from 'react-native';

import { Web } from './styles';

export default class WebView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('webview').full_name,
  });

  render() {
    console.tron.log(this.props.navigation);
    return (
      <Web
        source={{ uri: this.props.navigation.getParam('webview').html_url }}
        style={{ flex: 1 }}
      />
    );
  }
}
