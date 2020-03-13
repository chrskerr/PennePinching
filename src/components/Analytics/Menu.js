
// Packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, List, Switch, Select, Form } from "antd";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

// App
import { GET_FILTERED_MENU } from "../../helpers/apolloQueries";
import CenteredSpin from "../../components/Shared/CenteredSpin";

const Menu = ({ mealsData, who }) => {
	const [ sortBy, setSortBy ] = useState( "quantity" );
	const [ category, setCategory ] = useState( "all" );
	
	const updatedCategory = category === "all" ? [ "Salad", "Pasta", "Pizza","Zoodle" ] : [ category ];
	const { data: menuQueryData } = useQuery( GET_FILTERED_MENU, { variables: { category: updatedCategory }});

	if ( !menuQueryData || !mealsData ) return <CenteredSpin />;

	const tableData = doFormatData( menuQueryData.menu, mealsData, who, sortBy );

	return (
		<Form layout="horizontal" >
			<Row type="flex" justify="space-around" style={{ marginTop: "1.5em" }}>
				<Col xs={ 8 } sm={ 8 }>
					<Form.Item label="Menu">
						<Select onChange={ value => setCategory( value ) } value={ category } size="small" >
							<Select.Option value={ "all" }>All</Select.Option>
							<Select.Option value={ "Salad" }>Salad</Select.Option>
							<Select.Option value={ "Pasta" }>Pasta</Select.Option>
							<Select.Option value={ "Pizza" }>Pizza</Select.Option>
							<Select.Option value={ "Zoodle" }>Zoodle</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col xs={ 8 } sm={ 8 }>
					<Form.Item label="Sort">
						<Select onChange={ value => setSortBy( value ) } value={ sortBy } size="small" >
							<Select.Option value={ "quantity" }>Quantity</Select.Option>
							<Select.Option value={ "last" }>Last Eaten</Select.Option>
							<Select.Option value={ "name" }>Name</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col xs={ 22 } sm={ 18 }>
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
									description={ `Eaten ${ item.quantity } time${ item.quantity > 1 ? "s" : "" }.${ item.last && ` Last eaten on ${ item.last.toDateString() }.` }` }
								/>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</Form>
	);
};
Menu.propTypes = {
	mealsData: PropTypes.array,
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
		const quantity = quantities.length > 0 ? quantities.reduce(( total = 0, curr ) => total + curr ) : 0;
        
		const last = filteredMeals.reduce(( best, curr ) => {
			const currDate = moment( curr.date, "DD-MM-YYYY" ).toDate();
			if ( best < currDate ) return currDate;
			return best;
		}, moment( "01/01/2020", "DD-MM-YYYY" ).toDate());

		return {
			...item,
			key: item.id,
			quantity,
			last: quantity ? last : "",
			active: item.active,
		};
	});

	switch ( sortBy ) {
	case "last":
		return unsortedData.sort(( a, b ) => b.last - a.last );
	case "quantity":
		return unsortedData.sort(( a, b ) => b.quantity - a.quantity );
	default:
		return unsortedData.sort(( a, b ) => a[ sortBy ].localeCompare( b[ sortBy ]));
	}

	/// ITS TIME TO SWITCH DATES TO A DATE FORMAT
}