
// Packages
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Row, Menu, Icon, Typography } from 'antd';
import { useMachine } from '@xstate/react';

// App
import { client } from './index';
import { homeMachine } from './helpers/machines';
import AddMeal from './views/AddMeal';
import Analyse from './views/Analyse';

const { Title } = Typography;

const App = () => {
	const [ current, send ] = useMachine( homeMachine );
	const onNavClick = ( key ) => {
		if ( key === "addmeal" ) send( "ADDMEAL" );
		if ( key === "analyse" ) send( "ANALYSE" );
	}

	return (
		<ApolloProvider client={ client }>
			<Row>
				<Row>
					<Title level={ 2 } style={{ padding: "1em 0 0 1em" }}>Penne Pinching</Title>
					<Menu selectedKeys={ current.value } mode="horizontal" onClick={ ({ key }) => onNavClick( key )}>
						<Menu.Item key="addmeal">
							<Icon type="plus" />
							Add new meal
						</Menu.Item>
						<Menu.Item key="analyse">
							<Icon type="dot-chart" />
							Analyse
						</Menu.Item>
						<Menu.Item key="login">
							<Icon type="login" />
							Log In
						</Menu.Item>
					</Menu>
				</Row>
				
				<Row style={{ padding: "2em" }}>
					{ current.matches( "addmeal" ) && <AddMeal /> }
					{ current.matches( "analyse" ) && <Analyse /> }
				</Row>
			</Row>
		</ApolloProvider>
	);
}

export default App;
