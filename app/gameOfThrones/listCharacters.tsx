import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView } from "react-native";

interface ListCharactersProps {
    route?: any;
    navigation?: any;
}

const ListCharacters: React.FC<ListCharactersProps> = ({ route, navigation }) => {

    const [characterList, setCharacterList] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://thronesapi.com/api/v2/Characters');
                setCharacterList(response.data);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchData();
    }, []);



    const handleContactPress = (item: any) => {
        navigation.navigate('ItemCharacter', { contactData: item });
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.contact__book}
                contentContainerStyle={styles.contact__book_container}
            >
                {characterList && characterList.map((item: any) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.contact}
                        onPress={() => handleContactPress(item)}
                    >
                        <View style={styles.contactRow}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.contact__image}
                            />
                            <View style={styles.contactInfo}>
                                <Text style={[styles.text, styles.contact__title]}>
                                    {item.firstName} {item.lastName}
                                </Text>
                                {/* Додайте інші поля, які вам потрібно вивести */}
                            </View>
                        </View>
                        <View style={styles.contact__bottom}></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    contactInfo: {
        flex: 1,
        justifyContent: 'center',
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
    contact__image: {
        width: 100,
        height: 100
    },
    contact__bottom: {
        width: '100%',
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
export default ListCharacters;
