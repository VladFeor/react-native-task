import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from "react-native";

interface ListContactProps {
    route?: any;
    navigation?: any;
}

const ListContact: React.FC<ListContactProps> = ({ route, navigation }) => {
    const { contactBook } = route.params;



    const handleContactPress = (item: any) => {
        navigation.navigate('ContactItem', { contactData: item });
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.contact__book}
                contentContainerStyle={styles.contact__book_container}
            >
                {contactBook && contactBook.map((item: any) => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.contact}
                        onPress={() => handleContactPress(item)}
                    >
                        <Text style={[styles.text, styles.contact__title]}>
                            {item.name}
                        </Text>
                        <View style={styles.contact__bottom}></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.btn__add}
                onPress={() => navigation.navigate('AddContact')}
            >
                <Text style={styles.text__btn}>+</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    contact__book: {
        width: '100%',
        // height: '100%',
        position: 'relative',
        backgroundColor: '#001524',
        overflow: 'scroll',
    },
    contact: {
        width: '100%',
        paddingVertical: 15,
        position: 'relative',
        color: '#F7F7F7',
        // flex: 1,
        // justifyContent: 'flex-end',
    },
    contact__book_container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    contact__bottom: {
        width: '75%',
        marginTop: 15,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ffff',
        opacity: .5
    },
    contact__title: {
        textAlign: 'center',
        fontSize: 24
    },
    text: {
        color: '#F7F7F7',
    },
    btn__add: {
        position: 'absolute',
        bottom: 10,  // змінено на bottom
        right: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F7F7F7',
    },
    text__btn: {
        fontSize: 34,
        textTransform: 'uppercase',
        color: '#F7F7F7'
    }
})
export default ListContact;
