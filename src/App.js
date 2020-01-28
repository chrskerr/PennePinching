
// Packages
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Row, Typography, Modal, Form, Input, Button } from 'antd';
import ApolloClient from 'apollo-boost';
import firebase from 'firebase/app';
import 'firebase/auth';

// App
import Home from './views/Home';

const { Text } = Typography

const App = () => {
	const [ modal, setModal ] = useState( false );
	const [ formData, setFormData ] = useState({});
	const [ loginError, setLoginError ] = useState();
	const [ loading, setLoading ] = useState( false );
	const [ authState, setAuthState ] = useState( false );
	
	const client = new ApolloClient({
		uri: 'https://penne-pinching.herokuapp.com/v1/graphql',
		headers: authState 
			? { Authorization: `Bearer ${ authState.token }` } 
			: {},
	});

	useEffect( () => {
		return firebase.auth().onAuthStateChanged( async user => {
			if ( user ) {
				const token = await user.getIdToken();
				const idTokenResult = await user.getIdTokenResult();
				const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
				if ( hasuraClaim ) {
					setAuthState({ user, token });
				} 
			} else {
				setAuthState( false );
			}
		});
	}, [] );

	const handleLogin = async e => {
		e.preventDefault();
		setLoginError( false );
		const { email, password } = formData;

		try {	
			setLoading( true );
			await firebase.auth().signInWithEmailAndPassword( email, password );
			setFormData({});
			setModal( false );
			setAuthState( true );
		} 
		catch ( err ) {
			setLoginError( err );
			setFormData({ ...formData, password: "" });

		} 
		finally {
			setLoading( false );
		}
	};

	const logOut = () => {
		firebase.auth().signOut();
		setAuthState( false );
	}

	return (
		<ApolloProvider client={ client }>
			<Home setModal={ setModal } authState={ authState } logOut={ logOut } />
			
			<Modal
				title="Log In"
				visible={ modal }
				onCancel={ () => setModal( false ) }
				footer={ null }
			>
				<Form onSubmit={ e => handleLogin( e ) }>
					<Form.Item label="Email">
						<Input 
							onChange={ e => setFormData({ ...formData, email: e.target.value }) }
							value={ formData.email }
							autoFocus
						/>
					</Form.Item>
					<Form.Item label="Password">
						<Input.Password 
							onChange={ e => setFormData({ ...formData, password: e.target.value }) }
							value={ formData.password }
						/>
					</Form.Item>
					<Button loading={ loading } icon="check" htmlType="submit">Submit</Button>
					{ loginError && <Row><Text type="danger">{ loginError.message }</Text></Row> }
				</Form>
        	</Modal>
		</ApolloProvider>
	);
}

export default App
