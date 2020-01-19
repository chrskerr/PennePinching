
// Packages
import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Row, Menu, Icon, Typography, Modal, Form, Input, Button } from 'antd';
import ApolloClient from 'apollo-boost';
import { useMachine } from '@xstate/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// App
// import { client } from './index';
import { homeMachine } from './helpers/machines';
import Add from './views/Add';
import Analytics from './views/Analytics';

const { Title, Text } = Typography;

const App = () => {
	const [ current, sendHome ] = useMachine( homeMachine );
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
				} else {
					// Check if refresh is required.
					const metadataRef = firebase
						.database()
						.ref( "metadata/" + user.uid + "/refreshTime" );

					metadataRef.on( "value", async () => {
						// Force refresh to pick up the latest custom claims changes.
						const token = await user.getIdToken( true );
						setAuthState({ user, token });
					});
				}
			} else {
				setAuthState( false );
			}
		});
	}, [] );

	const onNavClick = ( key ) => {
		if ( key === "add" ) {
			sendHome( "ADD" );
			if ( !authState ) setModal( true );
		};
		if ( key === "analytics" ) sendHome( "ANALYTICS" );
		if ( key === "login" ) setModal( true );
		if ( key === "logout" ) logOut();
	}

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
			<Row>
				<Row>
					<Title style={{ padding: "1em 0 0 1em" }}>Penne Pinching</Title>
					<Menu selectedKeys={ current.value } mode="horizontal" onClick={ ({ key }) => onNavClick( key )}>
						<Menu.Item key="add">
							<Icon type="plus" />
							Add
						</Menu.Item>
						<Menu.Item key="analytics">
							<Icon type="dot-chart" />
							Analytics
						</Menu.Item>
						{ authState && <Menu.Item key="logout">
							Log out
						</Menu.Item> }
						{ !authState && <Menu.Item key="login">
							Log in
						</Menu.Item> }
					</Menu>
				</Row>
				
				<Row style={{ padding: "2em" }}>	
					{ current.matches( "add" ) && <Add authState={ authState }/> }
					{ current.matches( "analytics" ) && <Analytics /> }
				</Row>
			</Row>

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
