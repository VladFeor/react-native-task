import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListContact from "../contactBookElements/listContact";
import ContactItem from "../contactBookElements/contactItem";
import AddContact from "../contactBookElements/addContact";
// import { openDatabase } from 'expo-sqlite';
import { getAllContacts, addContact, deleteContact, editContact } from '../../dataBase/ContactService';
import { db } from '../../dataBase/DBManager';
import { openDatabase } from "expo-sqlite";


type RootStackParamList = {
    ListContact: { contactBook: contactData[] };
    ContactItem: { contactData: contactData, deleteContact: Function, editContactInDB: Function };
    AddContact: { addContact: Function };
};

type contactData = { id: string; name: string; phone: string; email?: string }

const Stack = createStackNavigator<RootStackParamList>();


export default function ContactBook() {
    const [contactBook, setContactBook] = useState<contactData[]>([]);

    useEffect(() => {
        loadContacts();
    }, []);


    const loadContacts = async () => {
        const contacts = await getAllContacts();
        setContactBook(contacts);
    }


    const addContactToDB = async (contactItem: contactData) => {
        try {
            await addContact(contactItem);
            await loadContacts();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };
    const editContactInDB = async (id: string, updatedContact: contactData) => {
        try {
            await editContact(id, updatedContact);
            await loadContacts();
        } catch (error) {
            console.error('Error editing contact:', error);
        }
    };


    const deleteContactFromDB = async (id: string) => {
        try {
            await deleteContact(id);
            await loadContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };


    // const [contactBook, setContactBook] = useState<contactData[]>([
    //     {
    //         id: '1',
    //         name: 'John Doe',
    //         phone: '+3801234567890',
    //         email: 'john.doe@example.com',
    //     },
    //     {
    //         id: '2',
    //         name: 'Jane Smith',
    //         phone: '+3809876543210',
    //         email: 'jane.smith@example.com',
    //     },
    //     {
    //         id: '3',
    //         name: 'Alice Johnson',
    //         phone: '+3801112233445',
    //         email: 'alice.johnson@example.com',
    //     },
    //     {
    //         id: '4',
    //         name: 'Bob Williams',
    //         phone: '+3805556667778',
    //         email: 'bob.williams@example.com',
    //     },
    // ])

    // const addContact = (contactItem: contactData) => {
    //     setContactBook([...contactBook, contactItem]);
    // };
    // const deleteContact = (id: string) => {
    //     const updatedContactBook = contactBook.filter((contact) => contact.id !== id);
    //     setContactBook(updatedContactBook);
    // }
    return (
        <View style={styles.container}>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="ListContact">
                    <Stack.Screen
                        name="ListContact"
                        component={ListContact}
                        initialParams={{ contactBook: contactBook }}
                    />
                    <Stack.Screen
                        name="ContactItem"
                        component={ContactItem}
                        initialParams={{ deleteContact: deleteContactFromDB, editContactInDB: editContactInDB }}
                    />
                    <Stack.Screen
                        name="AddContact"
                        component={AddContact}
                        initialParams={{ addContact: addContactToDB }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#001524',
        flex: 1,
        justifyContent: 'flex-end',
    },
})