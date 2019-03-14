import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './config';

export default class TripList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          username: 'chanokuporu',
          tripNameList: []   
      }
  }

  componentDidMount(){
      db.collection(this.state.username).onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const tripNameList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tripNameList.push(data.TripName)
    });
    this.setState({
      tripNameList
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TripList Page</Text>
        <Text>{this.state.tripNameList}</Text>
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
