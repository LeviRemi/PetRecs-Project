const firebase = require("firebase/app");
const { Storage } = require('@google-cloud/storage');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDufGb80fmXbgoYFpLQXFx9AqkabGXowI4",
    authDomain: "petrecs-file-system.firebaseapp.com",
    databaseURL: "https://petrecs-file-system.firebaseio.com",
    projectId: "petrecs-file-system",
    storageBucket: "petrecs-file-system.appspot.com",
    messagingSenderId: "297525847113",
    appId: "1:297525847113:web:d3fd0d63b4e813acf2cb98",
    measurementId: "G-5EMLB4SK1P"
  };

  firebase.initializeApp(firebaseConfig);

  storage = firebase.storage().ref();

  //export { storage, firebase as default };