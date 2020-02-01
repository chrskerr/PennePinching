
// App
import React, { useState } from "react";
import { Row, List, Switch } from "antd";

const Meals = ( { mealsData, who } ) => {
	const [ showTesting, setShowTesting ] = useState( false );
	const listData = formatData( mealsData, who, showTesting );

	return (
		<Row>
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
						actions={[ /* edit button */ ]}
					>
						<List.Item.Meta
							title={ item.name }
							description={ `Eaten ${ item.quantity } time${ item.quantity > 1 ? "s" : "" }.${ item.last && ` Last eaten on ${ item.last.toDateString() }.` }` }
						/>
					</List.Item>
				)}
			/>
		</Row>
	);
};

export default Meals;

function formatData( mealsData, who, showTesting ) {

	// do some stuff
}