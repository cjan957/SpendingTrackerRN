import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from './config';
import SpendingList from './SpendingListPage/SpendingList';

export default class SpendingListPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: "",
      tripName: "",
      tripID: "",
      spendingList: [],
      spendingListDisplay: [],
      totalCost: ""
    }
  }

  componentDidMount(){
    const {navigation} = this.props;
    const tripName = navigation.getParam('name', 'Invalid');
    const tripID = navigation.getParam('id','0');
    const username = navigation.getParam('username','null');

    const getSpendPath = username + "/" + tripID + "/spendinglist"
 
    db.collection(getSpendPath).orderBy('TimeCreated').onSnapshot(this.onCollectionUpdate);

    this.setState({
      username,
      tripName,
      tripID
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    var _spendingList = [];
    var _totalCost = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      var spendingItem = {ID: id, Category: data.Category, Comment: data.Comment, Cost: data.Cost, Name: data.Name, TimeCreated: data.TimeCreated};
      _totalCost += parseFloat(data.Cost);
      _spendingList.push(spendingItem);
    });

    this.setState({
      spendingList: _spendingList,
      spendingListDisplay: _spendingList.reverse(),
      totalCost: _totalCost.toString(),
    })
  }

  render() {
    var info = {
      tripID: this.state.tripID,
      username: this.state.username
    }

    return (
      <View style={styles.container}>
        <Text>Your {this.state.tripName} Trip</Text>
        <Text>Total: {this.state.totalCost} </Text>
        <Button
          onPress={() => this.props.navigation.navigate('NewEntry', info)}
          title= "Add New"
          color= "#841584"
          accessibilityLabel= "Add an Item"
        />

        <SpendingList 
          itemList={this.state.spendingListDisplay} 
          tripID={this.state.tripID} 
          username={this.state.username}
          navigation={this.props.navigation}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  flatview:{
    margin: 10
  }
});
