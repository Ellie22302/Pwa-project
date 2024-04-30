import { openDB } from 'idb';
const indexedDB =
   window.indexedDB ||
   window.mozIndexedDB ||
   window.webkitIndexedDB ||
   window.msIndexedDB ||
   window.shimIndexedDB;

const initdb = async () =>
  openDB('ellie', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('ellie')) {
        console.log('ellie database already exists');
        return;
      }
      db.createObjectStore('ellie', { keyPath: 'id', autoIncrement: true });
      console.log('ellie database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
const jateDb = await openDB("ellie", 1);
  const tx = jateDb.transaction("ellie", "readwrite");
  const store = tx.objectStore("ellie");
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log(result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const ellieDB = await openDB("ellie", 1);
  const tx = ellieDB.transaction("ellie", "readonly");
  const store = tx.objectStore("ellie");
  const request = store.getAll();
  const result = await request;
  console.log(result);
  return result?.value;
};

initdb();
