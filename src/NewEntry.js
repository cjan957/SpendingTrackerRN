import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Form from './Components/Form';

export default class NewEntry extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tripID: "",
      username: "",
      spendingID: "",
      category: "",
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <Text>Add Item Page</Text>
          <Form spendingID={this.state.spendingID} 
            tripID={this.state.tripID} 
            username={this.state.username} 
            category={this.state.category}
            popper={this.popNavigation}/>
        </View>
      ); 
  }

  popNavigation = () => {
    this.props.navigation.pop();
  }

  componentWillMount(){
    const {navigation} = this.props;
    const tripID = navigation.getParam('tripID', 'Invalid');
    const username = navigation.getParam('username', 'Invalid');
    const spendingID = navigation.getParam('spendingID', 'Invalid');
    const category = navigation.getParam('category', 'Invalid');

    this.setState({
      tripID,
      username,
      spendingID,
      category
    })
  }
}

const styles = StyleSheet.create({
  form_horizontal:{
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center'
  },
  nameForm:{
    height: 30,
    width: 100,
    borderColor: 'gray',
    borderWidth: 3
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
});
