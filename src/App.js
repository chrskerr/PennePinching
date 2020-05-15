
// Packages
import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import firebase from "firebase/app";
import "firebase/auth";

// App
import Home from "./views/Home";
import { Auth } from "./helpers/services";

const App = () => {
	const [ auth, setAuth ] = useState({
		token: null,
		isAuthenticating: true,
		isAuthenticated: false,
		updateAuth: payload => setAuth( auth => ({ ...auth, ...payload })),
		signIn: async ( email, password ) => await firebase.auth().signInWithEmailAndPassword( email, password ),
		signOut: () => firebase.auth().signOut(),
	});
	const { token, updateAuth } = auth;
	
	const client = new ApolloClient({
		uri: "https://penne-pinching.herokuapp.com/v1/graphql",
		headers: token 
			? { Authorization: `Bearer ${ token }` } 
			: {},
	});

	useEffect(() => {
		return firebase.auth().onAuthStateChanged( async user => {
			updateAuth({ isAuthenticating: true });
			if ( user ) {
				const token = await user.getIdToken();
				const idTokenResult = await user.getIdTokenResult();
				const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
				if ( hasuraClaim ) {
					updateAuth({ token });
				} else {
					updateAuth({ token: null });
				}
			} else {
				updateAuth({ token: null });
			}
			updateAuth({ isAuthenticating: false });
		});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if ( token ) {
			updateAuth({ isAuthenticated: true });
		} else {
			updateAuth({ isAuthenticated: false });
		}
		// eslint-disable-next-line
	}, [ token ]);

	return (
		<div id="app">
			<Auth.Provider value={ auth }>
				<ApolloProvider client={ client }>
					<Home />
				</ApolloProvider>
			</Auth.Provider>
		</div>
	);
};

export default App;
