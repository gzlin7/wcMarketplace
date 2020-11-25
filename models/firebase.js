const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyDF_PN832MxqPkZKZWnn1mgkTZ5Px0KA-c",
    authDomain: "wildcard-b3678.firebaseapp.com",
    databaseURL: "https://wildcard-b3678.firebaseio.com",
    projectId: "wildcard-b3678",
    storageBucket: "wildcard-b3678.appspot.com",
    messagingSenderId: "902594328589",
    appId: "1:902594328589:web:f758e1dcf40a22da1c7d44"
};
firebase.initializeApp(config);

// Get a reference to the database service
const db = firebase.database();

module.exports = db;
