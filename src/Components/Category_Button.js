import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Category_Button extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isPressed: false,
          selectedIndex: 0
        }
    }

    componentDidMount(){
        this.setState({
            isPressed: false
        })
    }

    render(){
        let button
        if(this.state.isPressed){
            button = this.Selected()
        }
        else{
            button = this.UnSelected()
        }
        return(
            <View>
                {button}
            </View>
        )
    }

    Selected(props){
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
                <Text style={StyleSheet.button}>Food</Text>
            </TouchableOpacity>
        );
    }

    UnSelected(props){
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
                <Text style={StyleSheet.button}>!Food</Text>
            </TouchableOpacity>
        );
    }

    CategoryButton(props){
        const pressed = this.state.isPressed;
        if(pressed){
            return <Selected/>
        }
        else{
            return <UnSelected/>
        }
    }

    onPress(){
        this.setState(prevState => ({
            isPressed: !prevState.isPressed
        }))
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
      },
});