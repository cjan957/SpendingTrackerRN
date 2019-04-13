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
      infoToEdit: Object
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <Text>Add Item Page</Text>
          <Form infoToEdit={this.state.infoToEdit} tripID={this.state.tripID} username={this.state.username} popper={this.popNavigation}/>
        </View>
      ); 
  }

  popNavigation = () => {
    this.props.navigation.pop();
  }

  componentDidMount(){
    const {navigation} = this.props;
    const tripID = navigation.getParam('tripID', 'Invalid');
    const username = navigation.getParam('username', 'Invalid');
    const name = navigation.getParam('name', 'Invalid');
    const cost = navigation.getParam('cost', 'Invalid');
    const comment = navigation.getParam('comment', 'Invalid');
    const category = navigation.getParam('category', 'Invalid');
    const spendingID = navigation.getParam('spendingID', 'Invalid');
    const isEditExisting = navigation.getParam('isEditExisting', false);

    var infoToEdit = {
      tripID: tripID,
      username: username,
      spendingID: spendingID,
      name: name,
      cost: cost,
      comment: comment,
      category: category,
      isEditExisting: isEditExisting
    }

    this.setState({
      tripID,
      username,
      infoToEdit
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
