import React from 'react';
import { StyleSheet, Text, View, FlatList, ListItem } from 'react-native';
import { db } from './config';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{color: textColor}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
      var trip = {id: data.TripID, name: data.TripName};
      tripNameList.push(trip)
    });
    this.setState({
      tripNameList
    })
    console.log(tripNameList);
  }

  render() {
    return (
        <View style={styles.MainView}>
          <View style={styles.TopGreetings}>
            <Text style={styles.greetings}>Welcome, {this.state.username} </Text>
          </View>
          <View style={styles.MiddleTripList}>
            <FlatList
              data={this.state.tripNameList}
              renderItem = {({item}) => (
                <View >
                  <Text>{item.name}</Text>
                  <Text>{item.id}</Text>
                </View>
              )}
            />
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  greetings: {
    fontSize: 30,
    color: 'white'
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  email: {
    color: 'red'
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  }
});
