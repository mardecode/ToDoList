const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
	apiKey: "AIzaSyCxcbT68W6SqLXXJRwAIwyDSYMtNSDk9cE",
	authDomain: "todolist365.firebaseapp.com",
	databaseURL: "https://todolist365.firebaseio.com",
	projectId: "todolist365",
	storageBucket: "todolist365.appspot.com",
	messagingSenderId: "193605315528",
	appId: "1:193605315528:web:69bf7dc02560f12a06eefd",
	measurementId: "G-7KEW74XYKR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage };
