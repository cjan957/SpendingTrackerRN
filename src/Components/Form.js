import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Category_Button from './Category_Button'

export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          title: "",
          cost: "",
          comment: "",
          invalid_cost: false
        }
    }

    render(){
        return(
            <View>
                <View style={styles.form_horizontal}>
                    <Text>Title: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(title) => this.setState({title})}
                        value={this.state.title}
                    />
                </View>
                <View style={styles.form_horizontal}>
                    <Text>Cost: </Text>
                    <TextInput
                        style={styles.nameForm}
                        onChangeText={(cost) => this.checkCostField({cost})}
                        value={this.state.cost}
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
                    <Button onPress={this.submitButton.bind(this)} title="Sumbit"/>
                </View>

            </View>
          
        )
    }

    checkCostField(input){
        var cost = input.cost;
        console.log(typeof(cost))
        console.log(cost)

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
        console.log("submit clicked");
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