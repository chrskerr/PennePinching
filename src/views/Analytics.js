
// Packages
import React, { useState } from "react";
import { Row, Col, Button, Typography } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { useService } from "@xstate/react";
import { Select } from "antd";

// App
import { GET_ALL_MEALS } from "../helpers/apolloQueries";
import { navMachine } from "../helpers/machines";
import CenteredSpin from "../components/Shared/CenteredSpin";
import Summary from "../components/Analytics/Summary";
import History from "../components/Analytics/History";
import Split from "../components/Analytics/Split";
import Weekdays from "../components/Analytics/Weekdays";
import Meals from "../components/Analytics/Meals";
import Menu from "../components/Analytics/Menu";

const { Text, Title } = Typography;

const titleMap = {
	summary: "Summary",
	history: "History",
	split: "Meal Split",
	weekdays: "Weekday Split",
	meals: "Meals List",
	menu: "Menu Summary",
};

const Analytics = ({ authState }) => {
	const { data, error } = useQuery( GET_ALL_MEALS );
	const [ current, send ] = useService( navMachine );
	const [ who, setWho ] = useState( "both" );

	if ( error ) {
		console.error( error );
		return <Text type="danger">Hasura error, see Console</Text>;
	}

	if ( !data ) return <CenteredSpin />;
	const { meals: mealsData } = data;

	return (
		<Row>
			<Col>
				<Row justify="space-between" type="flex" style={{ marginBottom: "1.5em", width: "85%", marginLeft: "auto", marginRight: "auto" }}>
					<Button icon="left" onClick={ () => send( "PREVIOUS" ) } />
					<Title level={ 4 }>{ titleMap[ current.value.analytics ] }</Title>
					<Button icon="right" onClick={ () => send( "NEXT" ) } />
				</Row>
				<Row>
					<Col sm={{ offset: 3 }}>
						<Select defaultValue={ who } onChange={ value => setWho( value ) } size="small" >
							<Select.Option value='both'>Both</Select.Option>
							<Select.Option value='Katie'>Katie</Select.Option>
							<Select.Option value='Chris'>Chris</Select.Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col>
						{ current.matches({ analytics: "summary" }) && <Summary mealsData={ mealsData } who={ who }/> }
						{ current.matches({ analytics: "history" }) && <History mealsData={ mealsData } who={ who }/> }
						{ current.matches({ analytics: "split" }) && <Split mealsData={ mealsData } who={ who }/> }
						{ current.matches({ analytics: "weekdays" }) && <Weekdays mealsData={ mealsData } who={ who }/> }
						{ current.matches({ analytics: "meals" }) && <Meals mealsData={ mealsData } who={ who } authState={ authState } /> }
						{ current.matches({ analytics: "menu" }) && <Menu mealsData={ mealsData } who={ who } /> }
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Analytics;