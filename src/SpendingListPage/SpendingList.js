
import React from 'react';
import { View, FlatList, SectionList, StyleSheet, Text } from 'react-native';
import SpendingItem from './SpendingItem';


const SpendingList = ({ itemList, tripID, username, navigation }) => (
    <View style={styles.container}>
        <SectionList
            sections={itemList}
            renderItem={({ item }) => 
                <SpendingItem 
                    item = {item}
                    title = {item.Name}
                    category={item.Category}
                    note={item.Comment}
                    cost={item.Cost}
                    tripID = {tripID}
                    username = {username}
                    navigation = {navigation}/>}
            renderSectionHeader={({ section }) => 
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{getMonthName(section.title)}</Text>
                </View>
            }
            keyExtractor = {item => item.ID}
        />
    </View>
);

function getMonthName(date){
    var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dateMonth = date.split("/");
    return dateMonth[0] + " " + monthList[parseInt(dateMonth[1],10) -  1]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeaderText:{
        fontSize: 20,
        padding: 8
    },
    sectionHeader:{
        backgroundColor: 'white'
    }
});

export default SpendingList;