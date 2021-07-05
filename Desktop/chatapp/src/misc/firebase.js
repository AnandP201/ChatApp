import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDTcZ4Gc-2_X1Rhh-hSNINFmR7KnZYCk-o',
  authDomain: 'chatapp-62d6c.firebaseapp.com',
  projectId: 'chatapp-62d6c',
  databaseURL:
    'https://chatapp-62d6c-default-rtdb.asia-southeast1.firebasedatabase.app/',
  storageBucket: 'chatapp-62d6c.appspot.com',
  messagingSenderId: '605286216295',
  appId: '1:605286216295:web:761a38d5b380fedd055ac2',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
