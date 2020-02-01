import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "antd/dist/antd.css";
import firebase from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "penne-pinching.firebaseapp.com",
	databaseURL: "https://penne-pinching.firebaseio.com",
	projectId: "penne-pinching",
	storageBucket: "penne-pinching.appspot.com",
	messagingSenderId: "305728508038",
	appId: "1:305728508038:web:ab5a360f93018d34fac107",
};
firebase.initializeApp( firebaseConfig );


ReactDOM.render( <App />, document.getElementById( "root" ));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
