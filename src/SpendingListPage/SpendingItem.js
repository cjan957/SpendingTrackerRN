import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import { db } from '../config';

export default class SpendingItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress = {this.itemPress.bind(this,this.props.item)}
                onLongPress = {this.itemLongPress.bind(this,this.props.item)}>
                <View style={styles.itemBox}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.note}>
                            {this.props.note}
                        </Text>
                    </View>
                    <View style={styles.CostContainer}>
                        <Text style={styles.mainCost}>
                            {this.props.cost}
                        </Text>
                    </View> 
                </View>
            </TouchableOpacity>
        );
    }

    itemLongPress(data){
        console.log(data);
        Alert.alert(
          'Delete',
          data.Name + '?',
          [
            {text: 'Cancel', onPress: () => console.log('not delete')},
            {text: 'Delete', onPress: () => this.deleteItem(data), style: 'destructive'}
          ],
          {cancelable: false},
        );
    }

    deleteItem(itemID){
        const getSpendPath = this.props.username + "/" + this.props.tripID + "/spendinglist"
        db.collection(getSpendPath).doc(itemID.ID).delete().then(function(){
          console.log("Document deleted!");
        }).catch(function(error){
          console.error("Error removing doc: ", error);
        });
      }

    itemPress(data){
        var itemPressedInfo = {
            tripID: this.props.tripID,
            username: this.props.username,
            spendingID: data.ID,
        }
        this.props.navigation.navigate('NewEntry', itemPressedInfo);
    }

}

const styles = StyleSheet.create({
    itemBox:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:15,
        marginRight:15,
        marginTop: 8,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d6d7da',
        backgroundColor: 'white',
    },
    TextContainer:{
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
    },
    CostContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    title:{
        fontSize: 16,
    },
    note:{
        fontSize: 12,
    },
    mainCost:{
        fontSize: 18,
    },
    convertedCost:{
        fontSize: 10,
    },
    photo:{
        height: 50,
        width: 50
    }
  });

