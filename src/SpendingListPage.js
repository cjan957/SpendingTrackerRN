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
      spendingListGroupByDate: [],
      totalCost: ""
    }
  }

  componentDidMount(){
    const {navigation} = this.props;

    //Get tripName, ID, Username from the TripList Page
    const tripName = navigation.getParam('name', 'Invalid');
    const tripID = navigation.getParam('id','0');
    const username = navigation.getParam('username','null');

    //Access Firebase to check items stored for this User/TripID, 
    //call this.onCollectionUpdate when there's a change
    const getSpendPath = username + "/" + tripID + "/spendinglist"
    db.collection(getSpendPath).orderBy('TimeCreated').onSnapshot(this.onCollectionUpdate);

    //Save as State
    this.setState({
      username,
      tripName,
      tripID
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    var _spendingList = [];
    var _convertedTime = [];
    var _sectionDataList = []
    var _totalCost = 0;

    //Read the snapshot (all the entries on FB), then save it to _spendingList
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      var spendingItem = {
        ID: doc.id, 
        Category: data.Category, 
        Comment: data.Comment, 
        Cost: data.Cost, 
        Name: data.Name, 
        TimeCreated: data.TimeCreated
      };
      _spendingList.push(spendingItem);
      _convertedTime.push(getDateTime(spendingItem.TimeCreated.seconds))
      //Calculate the total cost OTG
      _totalCost += parseFloat(data.Cost);
    });

    //Get a list of {title: '12/3, data: []}
    const AllDayMonth = Array.from(_convertedTime.map(k => k.split('/')[1] + "/" + k.split('/')[0]));
    const UniqueDayMonth = Array.from(new Set(AllDayMonth));

    UniqueDayMonth.forEach(k => {
      var sectionListObject = {title: k, data: []}
      _sectionDataList.push(sectionListObject);
    });

    _spendingList.forEach(function(k, index){
      _sectionDataList.forEach(item => {
        if(item.title == AllDayMonth[index]){
          item.data.push(k);
        }
      })
    })

    this.setState({
      totalCost: _totalCost,
      spendingListGroupByDate: _sectionDataList.reverse(),
    })

    console.log(_sectionDataList);
  }

  render() {
    var info = {
      tripID: this.state.tripID,
      username: this.state.username
    }

    return (
      <View style={styles.container}>
        <View style={styles.tripInfoBlock}>
          <View style={styles.tripInfoText}>
            <Text style={styles.textTripTitle}>{this.state.tripName} Trip</Text>
            <Text style={styles.textTripTotle}>Total: ${this.state.totalCost} </Text>
           
          </View>
        </View>
        <View style={styles.spendListBlock}>
        <Button
              onPress={() => this.props.navigation.navigate('NewEntry', info)}
              title= "Add New"
              color= "#841584"
              accessibilityLabel= "Add an Item"/>
          <SpendingList 
            itemList={this.state.spendingListGroupByDate} 
            tripID={this.state.tripID} 
            username={this.state.username}
            navigation={this.props.navigation}/>
        </View>
        

        
      </View>
    );
  }
}

function getDateTime(seconds){
  var myDate = new Date(seconds * 1000);
  return myDate.toLocaleString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tripInfoBlock:{
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center'
  },
  tripInfoText:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTripTitle:{
    fontSize: 25,
    color: 'white'
  },
  textTripTotle:{
    fontSize: 20,
    color: 'white'
  },
  spendListBlock:{
    flex: 4
  },
  flatview:{
    margin: 10
  }
});
