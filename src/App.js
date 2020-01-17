
// Packages
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Row, Menu, Icon, Typography } from 'antd';
import { useMachine } from '@xstate/react';

// App
import { client } from './index';
import { homeMachine } from './helpers/machines';
import Add from './views/Add';
import Analytics from './views/Analytics';

const { Title } = Typography;

const App = () => {
	const [ current, send ] = useMachine( homeMachine );
	const onNavClick = ( key ) => {
		if ( key === "add" ) send( "ADD" );
		if ( key === "analytics" ) send( "ANALYTICS" );
	}

	return (
		<ApolloProvider client={ client }>
			<Row>
				<Row>
					<Title style={{ padding: "1em 0 0 1em" }}>Penne Pinching</Title>
					<Menu selectedKeys={ current.value } mode="horizontal" onClick={ ({ key }) => onNavClick( key )}>
						<Menu.Item key="add">
							<Icon type="plus" />
							Add new meal
						</Menu.Item>
						<Menu.Item key="analytics">
							<Icon type="dot-chart" />
							Analysis
						</Menu.Item>
						<Menu.Item key="login">
							Log In
						</Menu.Item>
					</Menu>
				</Row>
				
				<Row style={{ padding: "2em" }}>
					{ current.matches( "add" ) && <Add /> }
					{ current.matches( "analytics" ) && <Analytics /> }
				</Row>
			</Row>
		</ApolloProvider>
	);
}

export default App;
