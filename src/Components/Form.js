import React from 'react';
import { Alert, Button, StyleSheet, Text, Picker, View, ScrollView, TextInput } from 'react-native';
import Category_Button from './Category_Button'
import { db } from '../config';
const firebase = require("firebase");
require("firebase/firestore");

export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          name: "",
          cost: "",
          comment: "",
          category: "Food",
          invalid_cost: false,
          spendingID: "",
          timeCreated: "",
        }
    }

    componentDidMount(){
        var spendingID = this.props.spendingID
        var username = this.props.username
        var tripID = this.props.tripID     
        
        //if spendingID does exist (from SpendingList->NewEntry), fetch spendingData from DB!
        if(spendingID !== 'Invalid'){
            const getSpendPath = username + "/" + tripID + "/spendinglist"
            var docRef = db.collection(getSpendPath).doc(spendingID);
            docRef.get().then((doc) => {
                if(doc.exists){
                    const data = doc.data()
                    this.setState({
                        name: data.Name,
                        cost: data.Cost,
                        comment: data.Comment,
                        category: data.Category,
                        spendingID: spendingID,
                        timeCreated: data.TimeCreated
                    })
                }
                else{
                    console.log("No such document!");
                }
            }).catch(function(error){
                console.log("error getting document: " + spendingID + error)
            });
        }
    }

    render(){
        var buttonText;
        if(this.props.spendingID !== 'Invalid'){
            buttonText = <Button onPress={this.submitButton.bind(this)} title="Update"/>
        }
        else{
            buttonText = <Button onPress={this.submitButton.bind(this)} title="Submit"/>
        }

        return(
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.form_horizontal}>
                    <Text>*Title: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
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
                    <Picker
                        selectedValue={this.state.category}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({category: itemValue})
                        }>
                        <Picker.Item label="Accomodation" value="Accomodation" />
                        <Picker.Item label="Attraction" value="Attraction" />
                        <Picker.Item label="Flight" value="Flight" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Gifts" value="Gifts" />
                        <Picker.Item label="Grocery" value="Grocery" />
                        <Picker.Item label="Transport" value="Transport" />
                        <Picker.Item label="Phone/Data" value="Phone/Data" />
                        <Picker.Item label="Shopping" value="Shopping" />
                        <Picker.Item label="Others" value="Others"/>
                    </Picker>
                <View style={styles.form_horizontal}>
                    {buttonText}
                </View>

            </ScrollView>
          
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
            Name: this.state.name,
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
            
            //Edit Entry
            if(this.state.spendingID !== 'Invalid' && this.state.spendingID !== '')
            {
                //Saving
                db.collection(getPathToAdd).doc(this.state.spendingID).set({
                    Name: this.state.name,
                    Cost: this.state.cost,
                    Category: this.state.category,
                    Comment: this.state.comment,
                    TimeCreated: this.state.timeCreated,
                })
                .then(function(){
                    console.log("edited successfully")
                })
                .then(this.popPage.bind(this))
                .catch(function(error){
                    console.log("error", error)
                })
            }
            else{ //New Entry
                //Saving
                db.collection(getPathToAdd).doc().set({
                    Name: this.state.name,
                    Cost: this.state.cost,
                    Category: this.state.category,
                    Comment: this.state.comment,
                    TimeCreated: firebase.firestore.Timestamp.now()
                })
                .then(function(){
                    console.log("created successfully")
                })
                .then(this.popPage.bind(this))
                .catch(function(error){
                    console.log("error", error)
                })
            }   
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