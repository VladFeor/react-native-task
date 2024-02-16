import { openDatabase } from 'expo-sqlite';

const db = openDatabase('contactBook.db');

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contactBook (id TEXT PRIMARY KEY, name TEXT, phone TEXT, email TEXT);',
      [],
      () => {
        console.log('Database created successfully');
      },
      (_, error) => {
        console.error('Error creating database:', error);
      }
    );
  });
};

initDatabase(); 

export { db };