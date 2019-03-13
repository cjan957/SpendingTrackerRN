const firebase = require("firebase");
require("firebase/firestore")

let config = {  
  apiKey: 'AIzaSyAQ5kWAOp4GrL5cfgK3wAdNaPnenOlXxp4',
  authDomain: 'spendingtracker-aba06.firebaseapp.com',
  databaseURL: 'https://spendingtracker-aba06.firebaseio.com',
  projectId: 'spendingtracker-aba06',
  storageBucket: 'spendingtracker-aba06.appspot.com',
  messagingSenderId: '1082280938079'
};

firebase.initializeApp(config);
export let db = firebase.firestore();
