
// Packages
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Grommet, Heading, ResponsiveContext, Box, Button, Header } from 'grommet';
import { Add, PieChart, Cafeteria } from 'grommet-icons';
import { useMachine } from '@xstate/react';

// App
import { client, theme } from './index';
import { homeMachine } from './helpers/machines';
import AddMeal from './views/AddMeal';
import Analyse from './views/Analyse';

const App = () => {
	const [ current, send ] = useMachine( homeMachine );
	return (
		<ApolloProvider client={ client }>
			<Grommet theme={ theme }>
				<ResponsiveContext.Consumer>
					{ size => {
						return (
							<Box fill>
								<Header pad="medium" justify="start" direction="row-responsive">
									<Box direction="row" align="center" >
										<Cafeteria size="xlarge" />
										<Heading>Penne Pinching</Heading>
									</Box>
									<Button icon={ <Add /> } label="Add new meal" onClick={ () => send( "ADDMEAL" ) } />
									<Button icon={ <PieChart /> } label="Analysis" onClick={ () => send( "ANALYSE" ) } />
								</Header>
								<Box>
									{ current.value === "addmeal" && <AddMeal /> }
									{ current.value === "analyse" && <Analyse /> }
								</Box>
							</Box>
						)
					}}
				</ResponsiveContext.Consumer>
			</Grommet>
		</ApolloProvider>
	);
}

export default App;
