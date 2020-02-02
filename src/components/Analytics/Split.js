
// Packages
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Row, Modal } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { blue, gold, volcano, green } from "@ant-design/colors";

// App
import Menu from "../Analytics/Menu";

const FIRST_COLORS = [ volcano[ 5 ], gold[ 5 ], blue[ 5 ], green[ 5 ] ];
const SECOND_COLORS = [ green[ 5 ], volcano[ 5 ] ];

const Split = ({ mealsData, who }) => {
	const [ displayedMenu, setDisplayedMenu ] = useState( "" );
	const [ modalVisible, setModalVisible ] = useState( false );
	const formattedData = useMemo(() => doFormatData( mealsData, who ), [ mealsData, who ]);
	const formattedHealthData = useMemo(() => doFormatHealthData( mealsData, who ), [ mealsData, who ]);

	const toggleModal = target => {
		if ( !target ) {
			setModalVisible( false );
			setDisplayedMenu( "" );
		} else {
			setModalVisible( true );
			setDisplayedMenu( target );
		}
	};

	return (
		<Row>
			<Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
				<ResponsiveContainer width='100%' height={ 300 }>
					<PieChart margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<Pie dataKey="quantity" data={ formattedData } label innerRadius={ 75 } outerRadius={ 100 } paddingAngle={ 5 } >
							{ formattedData.map(( cell, index ) => <Cell key={ cell.name } fill={ FIRST_COLORS[ index % FIRST_COLORS.length ] } onClick={ () => toggleModal( cell.name ) } /> )}
						</Pie>
						<Tooltip />
						<Legend verticalAlign="top" wrapperStyle={{ top: "-1em" }} />
					</PieChart>
				</ResponsiveContainer>
			</Row>
			<Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
				<ResponsiveContainer width='100%' height={ 300 }>
					<PieChart margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
						<Pie dataKey="quantity" data={ formattedHealthData } label innerRadius={ 75 } outerRadius={ 100 } paddingAngle={ 5 } >
							{ formattedData.map(( cell, index ) => <Cell key={ cell.name } fill={ SECOND_COLORS[ index % SECOND_COLORS.length ] } onClick={ () => toggleModal( cell.name ) } /> )}
						</Pie>
						<Tooltip />
						<Legend verticalAlign="top" wrapperStyle={{ top: "-1em" }} />
					</PieChart>
				</ResponsiveContainer>
			</Row>

			<Modal
				title={ `${ displayedMenu } Menu`}
				visible={ modalVisible }
				onCancel={ () => toggleModal( false ) }
				footer={ null }
			>
				<Menu category={ displayedMenu } who={ who } />
			</Modal>

		</Row>
	);
};
Split.propTypes = {
	mealsData: PropTypes.array,
	who: PropTypes.string,
};

export default Split;

function doFormatData( inputData, who ) {
	const menuCategories = [ ...new Set( inputData.map( input => input.menu.category )) ].sort();

	return menuCategories.map( name => {
		const quantities = inputData.map( el => {
			if ( name === el.menu.category ) { 
				if ( who === "both" ) return 1;
				if ( el.shared ) return 0.5;
				if ( who === el.who ) return 1;
			}
			return 0;
		});
		const quantity = quantities.reduce(( total, curr ) => total + curr );

		return {
			name,
			quantity,
		};
	});
}

function doFormatHealthData( inputData, who ) {
	const menuCategories = [ "Veggies", "Non" ];

	return menuCategories.map( name => {
		const quantities = inputData.map( el => {
			if ( 
				( name === "Veggies" && ( el.menu.category === "Salad" || el.menu.category === "Zoodle" )) || 
				( name === "Non" && ( el.menu.category === "Pizza" || el.menu.category === "Pasta" ))
			) { 
				if ( who === "both" ) return 1;
				if ( el.shared ) return 0.5;
				if ( who === el.who ) return 1;
			}
			return 0;
		});
		const quantity = quantities.reduce(( total, curr ) => total + curr );

		return {
			name,
			quantity,
		};
	});
}