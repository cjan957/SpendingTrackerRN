import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Form from './Components/Form';

export default class NewEntry extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Item Page</Text>
        <Form/>
      </View>
    );
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
