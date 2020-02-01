
// Packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, List, Switch } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

// App
import { GET_TESTING_MEALS, GET_ALL_MEALS } from "../../helpers/apolloQueries";
import { DELETE_MEAL } from "../../helpers/apolloMutations";
import CenteredSpin from "../../components/Shared/CenteredSpin";


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
		if ( window.confirm( "Are you sure?" )) deleteMeal({ variables: { id }, refetchQueries: [{ query: GET_ALL_MEALS }, { query: GET_TESTING_MEALS }]});
	};

	if ( showTesting && loading ) return <CenteredSpin />;

	const listData = showTesting ? formatData( data.meals, who ) : formatData( mealsData, who );

	return (
		<Row>

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
								actions={[ <a key={ item.id } href="#" onClick={ ( e ) => { handleDelete( item.id, e ); }}>Delete</a> ]}
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

	return filteredData.map( meal => {
		const dateStr = moment( meal.date, "DD-MM-YYYY" ).toDate().toDateString();
		return {
			title: `${ meal.shared ? "Shared" : meal.who } on ${ dateStr }`,
			description: `${ meal.menu.category }: ${ meal.menu.name } - $${ meal.menu.cost }${ meal.test ? " - TESTING" : "" }`,
			id: meal.id,
		};
	});
}