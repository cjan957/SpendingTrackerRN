import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Category_Button from './Category_Button'

export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          title: "",
          cost: "",
          comment: ""
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
                        onChangeText={(cost) => this.setState({cost})}
                        value={this.state.cost}
                    />
                </View>
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

            </View>
          
        )
    }
}

const styles = StyleSheet.create({
    form_horizontal:{
      flex: 1, 
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    nameForm:{
      height: 30,
      width: 100,
      borderColor: 'gray',
      borderWidth: 1
    }
});