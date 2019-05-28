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
      spendingListGroupByDate: [],
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
    var listSection

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

    //var spendingListSectioning = this.state.spendingListDisplay.sort((a,b) => a.TimeCreated.seconds < b.TimeCreated.seconds ? -1 : 1)
    //console.log(this.state.spendingListDisplay);
    var convertedTime = [];
    _spendingList.reverse();
    _spendingList.forEach((item) => {
      convertedTime.push(getDateTime(item.TimeCreated.seconds));
      
    })
    
    //Get a list of {title: '12/3, data: []}
    const dayMonth = Array.from(new Set(convertedTime.map(k => k.split('/')[1] + "/" + k.split('/')[0])));
    var sectionDataList = []
    dayMonth.forEach(k => {
      var sectionListObject = {title: k, data: []}
      sectionDataList.push(sectionListObject);
    });

  
    //Group each Date/Month
    convertedTime.forEach(function(k, index){
      const dayMonth = k.split('/')[1] + "/" + k.split('/')[0];
      const actualData = _spendingList[index]
      sectionDataList.forEach(item => {
        if(item.title = dayMonth){
          item.data.push(actualData);
        }
      })
    })

    this.setState({
      spendingListGroupByDate: sectionDataList,
    })

    console.log(this.state.spendingListGroupByDate);

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
