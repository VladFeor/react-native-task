import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image, TextInput, Button } from "react-native";



interface AddContactProps {
    navigation: any;
    route: any;
}
// addContact: (contectItem: contactData) => void;

const AddContact: React.FC<AddContactProps> = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { addContact } = route.params;


    const validateName = () => {
        return name.length >= 2;
    };

    const validatePhone = () => {
        return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone) && /\d{12}/.test(phone);
    };

    const validateEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleContactPress = async () => {
        // if (validateName() && validatePhone() && validateEmail()) {
            await addContact({ id: (Date.now()).toString(), name: name, phone: phone, email: email })
            setName('')
            setEmail('')
            setPhone('')
            navigation.setOptions({
                params: { contactData: [] },
            });
            navigation.navigate('ListContact');
        // }
    };
    return (
        <View style={styles.container}>
            <View style={styles.photo__contact}>
                <Image
                    style={styles.photo__img}
                    source={{
                        uri: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
                    }}
                />
            </View>
            <Text>Name:</Text>
            <TextInput
                style={[styles.input, { borderColor: validateName() ? 'green' : 'gray' }]}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Text>Number:</Text>
            <TextInput
                style={[styles.input, { borderColor: validatePhone() ? 'green' : 'gray' }]}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <Text>Email:</Text>
            <TextInput
                style={[styles.input, { borderColor: validateEmail() ? 'green' : 'gray' }]}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Button title="Add contact"
                onPress={handleContactPress}
            />
        </View>
    );
};

export default AddContact;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contact__link: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 24
    },
    photo__contact: {
        width: 200,
        height: 200,
        borderRadius: 300,
        overflow: 'hidden',
        marginVertical: 30,
        marginHorizontal: 'auto'
        // marginHorizontal: 'auto',
    },
    photo__img: {
        width: '100%',
        height: '100%'
    },
    input: {
        // outline:'none',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 20,
        padding: 10,
    },
})