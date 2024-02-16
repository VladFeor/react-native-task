import { openDatabase } from 'expo-sqlite';

const db = openDatabase('contactBook.db');

const addContact = async (contactItem) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      tx.executeSql(
        'INSERT INTO contacts (id, name, phone, email) VALUES (?, ?, ?, ?);',
        [contactItem.id, contactItem.name, contactItem.phone, contactItem.email],
        async (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            const contacts = await getAllContacts();
            resolve(insertId);
          } else {
            reject(new Error('Contact not added'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id = ?;',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(id);
          } else {
            reject(new Error('Contact not found'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getAllContacts = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts;',
        [],
        (_, { rows }) => {
          const contacts = rows._array;
          resolve(contacts);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const editContact = (id, updatedContact) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?;',
        [updatedContact.name, updatedContact.phone, updatedContact.email, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(id);
          } else {
            reject(new Error('Contact not found'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


export { addContact, deleteContact, getAllContacts, editContact };
