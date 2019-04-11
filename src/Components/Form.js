import React from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Category_Button from './Category_Button'
import { db } from '../config';
const firebase = require("firebase");
require("firebase/firestore");

export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          title: "",
          cost: "",
          comment: "",
          category: "",
          invalid_cost: false
        }
    }

    render(){
        return(
            <View>
                <View style={styles.form_horizontal}>
                    <Text>*Title: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(title) => this.setState({title})}
                        value={this.state.title}
                    />
                </View>
                <View style={styles.form_horizontal}>
                    <Text>*Cost: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(cost) => this.checkCostField({cost})}
                        value={this.state.cost}
                        keyboardType = "numeric"
                    />
                </View>
                {this.state.invalid_cost && <Text>Invalid Cost</Text>}
                <View style={styles.form_horizontal}>
                    <Text>Comment: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(comment) => this.setState({comment})}
                        value={this.state.comment}
                    />
                </View>
                <View style={styles.form_horizontal}>
                    <Category_Button/>
                </View>
                <View style={styles.form_horizontal}>
                    <Button onPress={this.submitButton.bind(this)} title="Submit"/>
                </View>

            </View>
          
        )
    }

    checkCostField(input){
        var cost = input.cost;

        if(cost == ""){
            this.setState({
                invalid_cost: false,
                cost: ""
            })
        }
        else if(isNaN(cost) || cost <= 0){
            this.setState({
                invalid_cost: true,
                cost: cost
            })
        }
        else{
            this.setState({
                invalid_cost: false,
                cost: cost
            })
        }
    }

    submitButton(){
        var item = {
            Name: this.state.title,
            Cost: this.state.cost,
            Category: this.state.category,
            Comment: this.state.comment,
            TimeCreated: firebase.firestore.Timestamp.now()
        }
        if(this.state.invalid_cost){
            Alert.alert('Invalid cost', 'Please check the cost and try again')
        }
        else if(this.state.title == "" || this.state.cost == ""){
            Alert.alert('Empty Fields', 'Please make sure you have filled in all the required(*) fields')
        }
        else{
            //Firestore path to save
            const getPathToAdd = this.props.username + "/" + this.props.tripID + "/spendinglist"
            
            //Saving
            db.collection(getPathToAdd).doc().set({
                Name: this.state.title,
                Cost: this.state.cost,
                Category: this.state.category,
                Comment: this.state.comment,
                TimeCreated: firebase.firestore.Timestamp.now()
            })
            .then(function(){
                console.log("done successfully")
            })
            .then(this.popPage.bind(this))
            .catch(function(error){
                console.log("error", error)
            })
        }
    }
    popPage = () => {
        this.props.popper();
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
      borderWidth: 1
    }
});