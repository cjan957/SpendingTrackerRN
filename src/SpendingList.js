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
      tripID: 0,
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
      var spendingItem = {Category: data.Category, Comment: data.Comment, Cost: data.Cost, Name: data.Name,  TimeCreated: data.TimeCreated};
      _spendingList.push(spendingItem)
    });
    this.setState({
      spendingList: _spendingList,
      spendingListDisplay: _spendingList
    })
    console.log(_spendingList);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Your {this.state.tripName} Trip</Text>
        <Button
          onPress={filterBy.bind(this,"Food")}
          title="Food"
          color="#841584"
          accessibilityLabel="Filter by Food"
        />
        <FlatList
          data={this.state.spendingListDisplay}
          renderItem = {({item}) => (
            <View style={styles.flatview}>
              <TouchableOpacity>
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

function filterBy(category){
  console.log("Filtering by: " + category)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
