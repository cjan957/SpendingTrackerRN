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
        <View style={styles.MainView}>
          <View style={styles.TopGreetings}>
            <Text style={styles.greetings}>Welcome, {this.state.username} </Text>
          </View>
          <View style={styles.MiddleTripList}>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  TopGreetings: {
    flex: 1,
    backgroundColor: 'skyblue',
    
  },
  MiddleTripList: {
    flex: 4,
    backgroundColor: 'white'
  },
  greetings: {
    fontSize: 30,
    color: 'white'
  },
});
