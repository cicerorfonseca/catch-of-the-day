import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDKjFuNDnzpMB_AcZhBKYtDXLmZGGYAepI',
  authDomain: 'catch-of-the-day-wes-bos-27883.firebaseapp.com',
  databaseURL:
    'https://catch-of-the-day-wes-bos-27883-default-rtdb.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export

export default base;
