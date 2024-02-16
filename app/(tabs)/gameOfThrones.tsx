import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemCharacter from "../gameOfThrones/itemChatacter";
import ListCharacters from "../gameOfThrones/listCharacters";
import axios from 'axios';



type RootStackParamList = {
    ListCharacters: { characterList: characterData[] };
    ItemCharacter: { characterData: characterData, };
};
// type characterData = { id: string; firstName: string; lastName: string; fullName: string; title: string; family: string; imageUrl: string}
type characterData = any

const Stack = createStackNavigator<RootStackParamList>();





export default function GameOfThrones() {
    
    return (
        <NavigationContainer independent={true}>
           <Stack.Navigator initialRouteName="ListCharacters">
                <Stack.Screen
                    name="ListCharacters"
                    component={ListCharacters}
                />
                <Stack.Screen
                    name="ItemCharacter"
                    component={ItemCharacter}
                    initialParams={{}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#001524',
        flex: 1,
        justifyContent: 'flex-end',
    },
})