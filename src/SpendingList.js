import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SpendingList extends React.Component {
  render() {
    const {navigation} = this.props;
    const tripName = navigation.getParam('name', 'Invalid');
    const tripID = navigation.getParam('id','0');

    return (
      <View style={styles.container}>
        <Text>SpendingList Page</Text>
        <Text>TripName Selected: {JSON.stringify(tripName)}</Text>
        <Text>TripID Selected: {JSON.stringify(tripID)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
