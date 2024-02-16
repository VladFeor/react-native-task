import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";


const ItemCharacter = () => {
    const route = useRoute();
    const contactData = route.params.contactData;


    return (
      <View style={styles.container}>
        <View style={styles.photo__contact}>
          <Image source={{ uri: contactData.imageUrl }} style={styles.photo__img} />
        </View>
        <Text style={styles.contact__link}>First Name: {contactData.firstName}</Text>
        <Text style={styles.contact__link}>Last Name: {contactData.lastName}</Text>
        <Text style={styles.contact__link}>Full Name: {contactData.fullName}</Text>
        <Text style={styles.contact__link}>Title: {contactData.title}</Text>
        <Text style={styles.contact__link}>Family: {contactData.family}</Text>
        <Text style={styles.contact__link}>Image URL: {contactData.imageUrl}</Text>
      </View>
    );
  };

export default ItemCharacter;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#001524',
    },
    contact__link: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 16,
        color: '#F7F7F7'
    },
    photo__contact: {
        width: 200,
        height: 200,
        // borderRadius: 100,
        overflow: 'hidden',
        marginVertical: 30,
    },
    photo__img: {
        width: '100%',
        height: '100%',
    },
});
