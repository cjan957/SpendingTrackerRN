import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './config';

export default class SpendingList extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: "",
      tripName: "",
      tripID: 0,
      accomodation: [],
      attraction: [],
      flight: [],
      food: [],
      grocery: [],
      localTransport: []
    }
  }

  componentDidMount(){
    const {navigation} = this.props;
    const tripName = navigation.getParam('name', 'Invalid');
    const tripID = navigation.getParam('id','0');
    const username = navigation.getParam('username','null');

    const accom_path = username + "/" + tripID + "/Accomodation"
    const attra_path = username + "/" + tripID + "/Attraction"
    const fligt_path = username + "/" + tripID + "/Flight"
    const food_path = username + "/" + tripID + "/Food"
    const groce_path = username + "/" + tripID + "/Grocery"
    const ltrans_path = username + "/" + tripID + "/LocalTransport"

    db.collection(accom_path).onSnapshot(this.onCollectionUpdate);

    this.setState({
      username,
      tripName,
      tripID
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const accomodation = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      var accom = {Cost: data.Cost, DateTime: data.DateTime};
      accomodation.push(accom)
    });
    this.setState({
      accomodation
    })
    console.log(accomodation);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>SpendingList Page</Text>
        <Text>TripName Selected: {this.state.tripName}</Text>
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
  }
});
