
import React, { useContext, useState } from "react";
import { Row, Col, List, Switch, Typography } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import { GetTestingMealsDocument, GetAllMealsDocument, DeleteMealDocument, GetTestingMealsQuery } from "types/graphql";
import CenteredSpin from "../Shared/CenteredSpin";

import type { IndexSubComponentProps } from "pages";
import { Auth } from "pages/_app"

const { Text } = Typography;


export default function Meals ({ mealsData, who }: IndexSubComponentProps ) {
	const authState = useContext(Auth)

	const [ showTesting, setShowTesting ] = useState( false );
	const { data, loading } = useQuery( GetTestingMealsDocument );
	const [ deleteMeal ] = useMutation( DeleteMealDocument );

	const handleDelete = ( id: string, e: React.MouseEvent ) => {
		e.preventDefault();
		if ( !authState.token ) {
			alert( "You must be logged in to do this" ); 
			return;
		}
		if ( window.confirm( "Are you sure you want to delete ?" )) deleteMeal({ variables: { id }, refetchQueries: [{ query: GetAllMealsDocument }, { query: GetTestingMealsDocument }]});
	};

	if ( showTesting && loading ) return <CenteredSpin />;

	const listData = (showTesting && data ) ? formatData( data.meals, who ) : formatData( mealsData, who );

	return (
		<Row>
			<Col sm={{ span: 18, offset: 3 }} xs={{ span: 24 }}>
				<Row justify="end" >
					<Switch
						key="switch"
						checkedChildren="Testing"
						unCheckedChildren="Testing"
						checked={ showTesting }
						onChange={ e => setShowTesting( e ) }
					/>
				</Row>
				<List
					itemLayout="horizontal"
					dataSource={ listData }
					renderItem={ (item: typeof listData[0] ) => (
						<List.Item
							actions={[ <p key={ item.id } onClick={ ( e ) => { handleDelete( item.id, e ); }}>Delete</p> ]}
						>
							<List.Item.Meta
								title={ item.title }
								description={ item.description }
							/>
						</List.Item>
					)}
				/>
			</Col>
		</Row>
	);
};

function formatData( mealsData: IndexSubComponentProps['mealsData'] | GetTestingMealsQuery['meals'], who: IndexSubComponentProps['who'] ) {
	const filteredData = mealsData.filter( meal => { return who === "both" || meal.shared || meal.who === who; });
	const addedDate = filteredData.map( meal => { return { ...meal, date: moment( meal.date, "DD-MM-YYYY" ).toDate() };});
	const sortedData = addedDate.sort(( a, b ) => { return b.date.valueOf() - a.date.valueOf(); });

	return sortedData.map( meal => {
		const dateStr = meal.date.toDateString();
		return {
			title: `${ meal.shared ? "Shared" : meal.who } on ${ dateStr }`,
			description: <Text>{ meal.menu.category }: { meal.menu.name } - ${ meal.menu.cost }{ meal.test ? <Text type="danger"> - TESTING</Text> : "" }</Text>,
			id: String( meal.id ),
		};
	});
}