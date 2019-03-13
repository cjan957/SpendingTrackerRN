import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './config';

export default class TripList extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          username: 'chanokuporu',
          tripList: []
      }
      this.getTripListByUsername = this.getTripListByUsername.bind(this);
  }

  componentDidMount(){
      this.getTripListByUsername();
  }

   getTripListByUsername(){
      var tripRef = db.collection(this.state.username);

      tripRef.get().then(function(doc){
          if(doc.exists){
            console.log("Trip List:", doc.data());
            this.state.tripList = doc.data();
          }
          else{
            console.log("No Trips. Get your arse out a bit more!")
          }
      }).catch(function(error){
          console.log("Error getting data....", error);
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TripList Page</Text>
        <Text>{this.state.tripList}</Text>
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
