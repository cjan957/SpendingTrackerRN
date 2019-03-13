import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './src/Login';
import TripList from './src/TripList';
import SpendingList from './src/SpendingList';
import Settings from './src/Settings';

const AppNavigator = createStackNavigator(
  {
    Login,
    TripList,
    SpendingList,
    Settings
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
