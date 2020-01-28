
// Packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, List, Switch, Select, Form } from "antd";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

// App
import { GET_FILTERED_MENU, GET_FILTERED_MEALS } from "../../helpers/apolloQueries";
import CenteredSpin from "../../components/Shared/CenteredSpin";

const Menu = ({ category, who }) => {
	const { data: menuQueryData } = useQuery( GET_FILTERED_MENU, { variables: { category } } );
	const { data: mealsQueryData } = useQuery( GET_FILTERED_MEALS, { variables: { category } } );
	const [ sortBy, setSortBy ] = useState( "quantity" );

	if ( !menuQueryData || !mealsQueryData ) return <CenteredSpin />;

	const tableData = doFormatData( menuQueryData.menu, mealsQueryData.meals, who, sortBy );

	return (
		<Row>
			<Form.Item label="Sort">
				<Select onChange={ value => setSortBy( value ) } value={ sortBy } size="small" >
					<Select.Option value={ "last" }>Last Eaten</Select.Option>
					<Select.Option value={ "quantity" }>Quantity</Select.Option>
					<Select.Option value={ "name" }>Name</Select.Option>
				</Select>
			</Form.Item>
			<List
				itemLayout="horizontal"
				dataSource={ tableData }
				renderItem={ item => (
					<List.Item
						actions={[ <Switch
							key="switch"
							size="small"
							checkedChildren="Active"
							unCheckedChildren="Active"
							checked={ item.active }
							disabled
							// onChange={ e => setFormData({ ...formData, shared: e }) }
						/> ]}
					>
						<List.Item.Meta
							title={ item.name }
							description={ `Eaten ${ item.quantity } time(s). Last eaten on ${ item.last }.` }
						/>
					</List.Item>
				)}
			/>
		</Row>
	);
};
Menu.propTypes = {
	category: PropTypes.string,
	who: PropTypes.string,
};

export default Menu;

function doFormatData ( menuInputData, mealsInputData, who, sortBy ) {
	const unsortedData = menuInputData.map( item => {
		const filteredMeals = mealsInputData.filter( meal => { return meal.menu.name === item.name; });
		const quantities = filteredMeals.map( el => {
			if ( who === "both" ) return 1;
			if ( el.shared ) return 0.5;
			if ( who === el.who ) return 1;
			return 0;
		});
		const quantity = quantities.length > 0 ? quantities.reduce( ( total = 0, curr ) => total + curr ) : 0;
        
		const last = filteredMeals.reduce( ( best, curr ) => {
			const currDate = moment( curr.date, "DD-MM-YYYY");
			if ( best.isSameOrBefore( currDate ) ) return currDate;
			return best;
		}, moment( "01/01/2020", "DD-MM-YYYY" )).format( "DD-MM-YYYY" );

		return {
			...item,
			key: item.id,
			quantity,
			last: quantity ? last : "",
			active: item.active,
		};
	});

	console.log( unsortedData );

	switch ( sortBy ) {
	case "last":
		return unsortedData.sort( ( a, b ) => moment( b.last, "DD-MM-YYYY" ).isSameOrBefore( moment( a.last, "DD-MM-YYYY" )) );
	case "quantity":
		return unsortedData.sort( ( a, b ) => b.quantity - a.quantity );
	default:
		return unsortedData.sort( ( a, b ) => a[ sortBy ].localeCompare( b[ sortBy ] ) );
	}

	/// ITS TIME TO SWITCH DATES TO A DATE FORMAT
}