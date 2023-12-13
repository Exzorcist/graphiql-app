/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCXv3cByZviWhDEIZsNKhPaNHxvo772By0',
  authDomain: 'project-for-auth-77962.firebaseapp.com',
  projectId: 'project-for-auth-77962',
  storageBucket: 'project-for-auth-77962.appspot.com',
  messagingSenderId: '327168321057',
  appId: '1:327168321057:web:92d711910c131414e9a560',
};

const app = initializeApp(firebaseConfig);
console.log(app);
