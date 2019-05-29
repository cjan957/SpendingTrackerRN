//Ref: https://stackoverflow.com/questions/44065854/make-button-group-look-like-radio-button
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class RadioOptions extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            activeOption: this.props.options[0],
        };
    };

    updateActiveOption = (activeOption) => {
        this.setState({
            activeOption,
        });
    };

    render(){
        return (
            <View style={styles.mainView}>
                {this.props.options.map((option, index) => (
                <TouchableOpacity key={option} onPress={() => {
                    this.props.onChange(option);
                    this.updateActiveOption(option);
                    }}>
                    <Text style={{
                        width: 150,
                        borderWidth: 1,
                        height: 50,
                        color: this.state.activeOption === option ? 'red' : 'black',}}>
                        {option}
                    </Text>
                </TouchableOpacity>
                ))}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 100,
        marginBottom: 100,
    },

});