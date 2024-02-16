import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image, Alert, TextInput, Button } from "react-native";
// type RootStackParamList = {
//   ListContact: undefined;
//   ContactItem: { contactData: { id: string; name: string; phone: string; email?: string } };
// };


// type ContactItemRouteProp = RouteProp<RootStackParamList, 'ContactItem'>;

interface ContactItemProps {
  route: any;
  navigation: any;
}

const ContactItem: React.FC<ContactItemProps> = ({ route, navigation }) => {
  const { contactData } = route.params;
  const { editContactInDB } = route.params;
  const { deleteContact } = route.params;


  const [newName, setNewName] = useState(contactData.name)
  const [newPhone, setNewPhone] = useState(contactData.phone)
  const [newEmail, setNewEmail] = useState(contactData.email)

  const deleteContactHandler = async (id: string) => {
    await deleteContact(id)
    navigation.navigate('ListContact');
  }

  const confirmDeleteHandler = (contactId: string) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteContactHandler(contactId) }
      ]
    );
  };
  const editContact = async (contactId: string) => {
    await editContactInDB(contactId,{
      name: newName,
      phone: newPhone,
      email: newEmail,
  })
    navigation.navigate('ListContact');
  }
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
      <Text style={styles.contact__link}>Name:</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <Text style={styles.contact__link}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={newPhone}
        onChangeText={(text) => setNewPhone(text)}
      />
      {contactData.email &&

        <>
          <Text style={styles.contact__link}>Email:</Text>
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
        </>


      }
      {(newName != contactData.name || newPhone != contactData.phone || newEmail != contactData.email)
        &&
        <Button title="Edit contact"
          onPress={() => editContact(contactData.id)}
        />
      }
      <TouchableOpacity
        onPress={() => confirmDeleteHandler(contactData.id)}
        style={styles.btn__remove}
      ><Text
        style={styles.text__btn}

      >-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactItem;

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
    fontSize: 24,
    color: '#F7F7F7'
  },
  input: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    borderColor: '#F7F7F7',
    color: '#F7F7F7'
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
  btn__remove: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    // backgroundColor:'red'
  },
  text__btn: {
    fontSize: 34,
    textTransform: 'uppercase',
    color: '#F7F7F7'
  }
})