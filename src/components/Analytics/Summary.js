
// Packages
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Typography } from "antd";
import moment from "moment";

// App
const { Title, Text } = Typography;

const Summary = ({ mealsData, who }) => {
	const { position, spend, totalMeals, savings, totalMenuCost } = useMemo(() => doFormatData( mealsData, who ), [ mealsData, who ]);

	const daysElapsed = moment().diff( moment( "15/01/2020", "DD-MM-YYYY" ), "day" );
	const averageWeekly = totalMeals / ( daysElapsed / 7 );

	const rowStructure = { justify: "center", gutter: 10 };
	const smallColProps = { span: 12 };

	return (
		<Row justify='center' >
			<Col xs={ 24 } md={ 18 } >
				<Row { ...rowStructure } >
					<Col span={ 24 } >
						<Card title={ <Text strong >Total Savings</Text> } bordered={ false }>
							<Title type="secondary" level={ 2 }>${ position }</Title>
						</Card>
					</Col>
				</Row>
				<Row { ...rowStructure }>
					<Col { ...smallColProps } >
						<Card title={ <Text strong >Internal costs saved</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>${ savings }</Title>
						</Card>
					</Col>
					<Col { ...smallColProps } >
						<Card title={ <Text strong >Total Actual Spend</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>${ spend }</Title>
						</Card>
					</Col>
				</Row>

				<Row { ...rowStructure } >
					<Col { ...smallColProps } >
						<Card title={ <Text strong >ROI</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>{ parseInt( position / ( spend * -1 ) * 100 ) }%</Title>
						</Card>
					</Col>
					<Col { ...smallColProps } >
						<Card title={ <Text strong >Avg meals</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>{ averageWeekly.toFixed( 1 ) } / wk</Title>
						</Card>
					</Col>
				</Row>

				<Row { ...rowStructure } >
					<Col { ...smallColProps } >
						<Card title={ <Text strong >Cost to FF</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>${ totalMenuCost }</Title>
						</Card>
					</Col>
					<Col { ...smallColProps } >
						<Card title={ <Text strong >FF p/l</Text> } size="small" bordered={ false }>
							<Title type="secondary" level={ 4 }>${ ( spend * -1 ) - totalMenuCost }</Title>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
Summary.propTypes = {
	mealsData: PropTypes.array,
	who: PropTypes.string,
};
export default Summary;


function doFormatData( inputData, who ) {
	const datedData = inputData.map( el => {
		return {
			...el,
			weekId: `${ moment( el.date, "DD-MM-YYYY" ).year() }${ moment( el.date, "DD-MM-YYYY" ).format( "ww" ) }`,
		};
	});
	const filteredData = datedData.filter( el => who === "both" || who === el.who );
	const incidentals = filteredData.reduce(( total, curr ) => total + curr.incidentals, 0 ) * -1;
	const mealCosts = filteredData.map( el => el.menu.cost );
	const originalInvestment = who === "both" ? -399 * 2 : -399;
	const totalMeals = filteredData.length;
	const savings = totalMeals * 10;
	const position = originalInvestment + savings;
	const totalMenuCost = mealCosts.reduce(( total, curr ) => total + curr );

	return {
		spend: originalInvestment + incidentals,
		position,
		totalMeals,
		savings,
		totalMenuCost,
	};
}
