
// Packages
import {  createContext } from "react";

export const Auth = createContext({
	token: null,
	isAuthenticating: false,
	isAuthenticated: false,
	updateAuth: () => {},
	signIn: () => {},
	signOut: () => {},
});
