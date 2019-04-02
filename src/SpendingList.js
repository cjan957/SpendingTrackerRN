import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from './config';
import { FlatList } from 'react-native-gesture-handler';

export default class SpendingList extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: "",
      tripName: "",
      tripID: "",
      spendingList: [],
      spendingListDisplay: []
    }
  }

  componentDidMount(){
    const {navigation} = this.props;
    const tripName = navigation.getParam('name', 'Invalid');
    const tripID = navigation.getParam('id','0');
    const username = navigation.getParam('username','null');

    const getSpendPath = username + "/" + tripID + "/spendinglist"
 
    db.collection(getSpendPath).onSnapshot(this.onCollectionUpdate);

    this.setState({
      username,
      tripName,
      tripID
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const _spendingList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      var spendingItem = {Category: data.Category, Comment: data.Comment, Cost: data.Cost, Name: data.Name, TimeCreated: data.TimeCreated};
      _spendingList.push(spendingItem)
    });
    this.setState({
      spendingList: _spendingList,
      spendingListDisplay: _spendingList
    })
    console.log(_spendingList);
  }
  
  render() {
    var info = {
      tripID: this.state.tripID,
      username: this.state.username
    }

    return (
      <View style={styles.container}>
        <Text>Your {this.state.tripName} Trip</Text>
        <Button
          onPress={() => this.props.navigation.navigate('NewEntry', info)}
          title="Add New"
          color="#841584"
          accessibilityLabel="Add an Item"
        />
        <FlatList
          data={this.state.spendingListDisplay}
          renderItem = {({item}) => (
            <View style={styles.flatview}>
              <TouchableOpacity>
                <Text>{getDateTime(item.TimeCreated.seconds)}</Text> 
                <Text>{item.Name}</Text>
                <Text>{item.Category}</Text>
                <Text>{item.Cost}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor = {item => item.Name}
          />
      </View>
    );
  }
}

function getDateTime(seconds){
  var t = new Date(1970,0,1);
  t.setSeconds(seconds);
  return <Text>{t.toString()}</Text>;
}

function filterBy(category){
  console.log("Filtering by: " + category)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatview:{
    margin: 10
  }
});
