

import React, { useState } from "react";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Space, Row, Col, Button, Typography, Select } from "antd";

import { useQuery } from "@apollo/client";

import { GetAllMealsDocument, GetAllMealsQuery } from "types/graphql";
import CenteredSpin from "components/Shared/CenteredSpin";
import Summary from "components/Analytics/Summary";
import History from "components/Analytics/History";
import Split from "components/Analytics/Split";
import Weekdays from "components/Analytics/Weekdays";
import Meals from "components/Analytics/Meals";
import Menu from "components/Analytics/Menu";

const { Text, Title } = Typography;

enum titles {
	SUMMARY = "Summary",
	HISTORY = "History",
	SPLIT = "Meal Split",
	WEEKDAYS = "Weekday Split",
	MEALS = "Meals List",
	MENU = "Menu Summary",
};

type Who = 'Katie' | 'Chris' | 'both'

export interface IndexSubComponentProps {
	who: Who,
	mealsData: GetAllMealsQuery['meals']
}

export default function Index () {
	const { data, error } = useQuery( GetAllMealsDocument );
	const [ who, setWho ] = useState<Who>( "both" );

	const [ page, setPage ] = useState<titles>(titles.SUMMARY);

	const nextPage = () => {
		setPage( p => {
			if ( p === titles.SUMMARY ) return titles.HISTORY
			else if ( p === titles.HISTORY ) return titles.SPLIT
			else if ( p === titles.SPLIT ) return titles.WEEKDAYS
			else if ( p === titles.WEEKDAYS ) return titles.MEALS
			else if ( p === titles.MEALS) return titles.MENU
			else return titles.SUMMARY
		})
	}

	const prevPage = () => {
		setPage( p => {
			if ( p === titles.MENU ) return titles.MEALS
			else if ( p === titles.MEALS ) return titles.WEEKDAYS
			else if ( p === titles.WEEKDAYS ) return titles.SPLIT
			else if ( p === titles.SPLIT ) return titles.HISTORY
			else if ( p === titles.HISTORY) return titles.SUMMARY
			else return titles.MENU
		})
	}

	if ( error ) {
		console.error( error );
		return <Text type="danger">Hasura error, see Console</Text>;
	}

	if ( !data ) return <CenteredSpin />;
	const { meals: mealsData } = data;

	return (
		<Row>
			<Col span={ 24 }>
				<Space direction="vertical" size="small" style={{ width: "100%" }}>
					<Row justify="space-between">
						<Col span={ 4 } style={{ textAlign: "center" }}>
							<Button icon={<LeftOutlined />} onClick={ () => prevPage() } />
						</Col>
						<Col span={ 16 } style={{ textAlign: "center" }}>
							<Title level={ 4 }>{ page }</Title>
						</Col>
						<Col span={ 4 } style={{ textAlign: "center" }}>
							<Button icon={<RightOutlined />} onClick={ () => nextPage() } />
						</Col>
					</Row>
					<Row style={{ marginTop: 8, marginBottom: 8 }}>
						<Col sm={{ offset: 3 }}>
							<Select defaultValue={ who } onChange={ value => setWho( value ) } size="small" >
								<Select.Option value='both'>Both</Select.Option>
								<Select.Option value='Katie'>Katie</Select.Option>
								<Select.Option value='Chris'>Chris</Select.Option>
							</Select>
						</Col>
					</Row>
					<Row>
						<Col span={ 24 }>
							{ page === titles.SUMMARY && <Summary mealsData={ mealsData } who={ who }/> }
							{ page === titles.HISTORY && <History mealsData={ mealsData } who={ who }/> }
							{ page === titles.SPLIT && <Split mealsData={ mealsData } who={ who }/> }
							{ page === titles.WEEKDAYS && <Weekdays mealsData={ mealsData } who={ who }/> }
							{ page === titles.MEALS && <Meals mealsData={ mealsData } who={ who } /> }
							{ page === titles.MENU && <Menu mealsData={ mealsData } who={ who } /> }
						</Col>
					</Row>
				</Space>
			</Col>
		</Row>
	);
};
