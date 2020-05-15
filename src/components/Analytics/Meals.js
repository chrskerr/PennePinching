
// Packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, List, Switch, Typography } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

// App
import { GET_TESTING_MEALS, GET_ALL_MEALS } from "../../helpers/apolloQueries";
import { DELETE_MEAL } from "../../helpers/apolloMutations";
import CenteredSpin from "../../components/Shared/CenteredSpin";

const { Text } = Typography;


const Meals = ({ mealsData, who, authState }) => {
	const [ showTesting, setShowTesting ] = useState( false );
	const { data, loading } = useQuery( GET_TESTING_MEALS );
	const [ deleteMeal ] = useMutation( DELETE_MEAL );

	const handleDelete = ( id, e ) => {
		e.preventDefault();
		if ( !authState ) {
			alert( "You must be logged in to do this" ); 
			return;
		}
		if ( window.confirm( "Are you sure you want to delete ?" )) deleteMeal({ variables: { id }, refetchQueries: [{ query: GET_ALL_MEALS }, { query: GET_TESTING_MEALS }]});
	};

	if ( showTesting && loading ) return <CenteredSpin />;

	const listData = showTesting ? formatData( data.meals, who ) : formatData( mealsData, who );

	return (
		<Row>
			<Col sm={{ span: 18, offset: 3 }} xs={{ span: 24 }}>
				<Row type="flex" justify="end" >
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
					renderItem={ item => (
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
Meals.propTypes = {
	mealsData: PropTypes.array,
	who: PropTypes.string,
	authState: PropTypes.any,
};

export default Meals;

function formatData( mealsData, who ) {
	const filteredData = mealsData.filter( meal => { return who === "both" || meal.shared || meal.who === who; });
	const addedDate = filteredData.map( meal => { return { ...meal, date: moment( meal.date, "DD-MM-YYYY" ).toDate() };});
	const sortedData = addedDate.sort(( a, b ) => { return b.date - a.date; });

	return sortedData.map( meal => {
		const dateStr = meal.date.toDateString();
		return {
			title: `${ meal.shared ? "Shared" : meal.who } on ${ dateStr }`,
			description: <Text>{ meal.menu.category }: { meal.menu.name } - ${ meal.menu.cost }{ meal.test ? <Text type="danger"> - TESTING</Text> : "" }</Text>,
			id: meal.id,
		};
	});
}