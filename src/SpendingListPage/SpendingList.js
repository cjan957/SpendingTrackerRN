
import React from 'react';
import { View, FlatList, SectionList, StyleSheet, Text } from 'react-native';
import SpendingItem from './SpendingItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

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
                <Text>{section.title}</Text>
            }
            keyExtractor = {item => item.ID}
        />

        {/* <FlatList
                data={itemList}
                renderItem={({ item }) => 
                <SpendingItem
                    item = {item}
                    title={item.Name}
                    category={item.Category}
                    note={item.Comment}
                    cost={item.Cost}
                    tripID = {tripID}
                    username = {username}
                    navigation = {navigation}
                />}
                keyExtractor = {item => item.ID}
        /> */}
    </View>
);

export default SpendingList;