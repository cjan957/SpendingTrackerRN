import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { db } from '../config';

export default class SpendingItem extends React.Component {
    constructor(props){
        super(props); 
    }

    render(){
        //Get path to icon for category
        var iconSrc = this.getIconCategory(this.props.category);
        
        return(
            <TouchableOpacity onPress = {this.itemPress.bind(this,this.props.item)}
                onLongPress = {this.itemLongPress.bind(this,this.props.item)}>
                <View style={styles.itemBox}>
                    {iconSrc}
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

    getIconCategory(category){
        var Component;
        switch(category){
            case "Accomodation":
                Component =  <Image source={require('../../assets/Category/local_hotel.png')} style={styles.icon}/>
                break;
            case "Attraction":
                Component =  <Image source={require('../../assets/Category/local_play.png')} style={styles.icon}/>
                break;
            case "Flight":
                Component =  <Image source={require('../../assets/Category/outline_airplanemode_active.png')} style={styles.icon}/>
                break;
            case "Food":
                Component =  <Image source={require('../../assets/Category/fastfood.png')} style={styles.icon}/>
                break;
            case "Gifts":
                Component =  <Image source={require('../../assets/Category/card_giftcard.png')} style={styles.icon}/>
                break;
            case "Grocery":
                Component =  <Image source={require('../../assets/Category/local_grocery_store.png')} style={styles.icon}/>
                break;
            case "Transport":
                Component =  <Image source={require('../../assets/Category/local_taxi.png')} style={styles.icon}/>
                break;
            case "Phone/Data":
                Component =  <Image source={require('../../assets/Category/smartphone.png')} style={styles.icon}/>
                break;
            case "Shopping":
                Component =  <Image source={require('../../assets/Category/local_mall.png')} style={styles.icon}/>
                break;
            case "Others":
                Component =  <Image source={require('../../assets/Category/trip_origin.png')} style={styles.icon}/>
                break;
            default:
                Component =  <Image source={require('../../assets/Category/trip_origin.png')} style={styles.icon}/>
                break;
        }
        return Component;
    }

    itemPress(data){
        var itemPressedInfo = {
            tripID: this.props.tripID,
            username: this.props.username,
            spendingID: data.ID,
            category: data.Category
        }
        this.props.navigation.navigate('NewEntry', itemPressedInfo);
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
}

const styles = StyleSheet.create({
    itemBox:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:15,
        marginRight:15,
        marginTop: 8,
        marginBottom: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d6d7da',
        backgroundColor: 'white',
    },
    TextContainer:{
        flex: 2,
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
    icon:{
        height: 35,
        width: 35
    }
  });

