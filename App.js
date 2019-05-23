import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './src/Login';
import TripList from './src/TripList';
import SpendingListPage from './src/SpendingListPage';
import Settings from './src/Settings';
import NewEntry from './src/NewEntry';

const AppNavigator = createStackNavigator(
  {
    Login,
    TripList,
    SpendingListPage,
    Settings,
    NewEntry,
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
