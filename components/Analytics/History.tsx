
import React, { useMemo } from "react";
import { Row } from "antd";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import moment from "moment";
import { blue, gold } from "@ant-design/colors";

import type { IndexSubComponentProps } from "pages";

export default function History ({ mealsData, who }: IndexSubComponentProps ) {
	const formattedData = useMemo(() => doFormatData( mealsData, who ), [ mealsData, who ]);
	return (
		<Row justify="center">
			<ResponsiveContainer width='100%' height={ 300 }>
				<ComposedChart data={ formattedData } margin={{ top: 0, right: -20, bottom: 0, left: -20 }}>
					<Tooltip />
					<Legend verticalAlign="top" wrapperStyle={{ top: "-1em" }} />
					<XAxis dataKey="week" interval={ 2 } padding={{ left: 15, right: 15 }} label={{ value: "Weeks since start", position: "insideBottom", offset: 0 }}/>
					<YAxis yAxisId="left" dataKey="quantity" label={{ value: "Meal count", angle: -90 }} />
					<YAxis yAxisId="right" dataKey="netPosition" orientation="right" label={{ value: "Net Position", angle: 90 }} axisLine={ true }/>
					<Bar yAxisId="left" fill={ blue[ 5 ] } dataKey='quantity' barSize={ 5 } name="# of Meals" />
					<Line yAxisId="right" type="monotone" dataKey="netPosition" stroke={ gold[ 5 ] } name="Net $" dot={ false } />
				</ComposedChart>
			</ResponsiveContainer>
		</Row>
	);
};

function doFormatData( inputData: IndexSubComponentProps['mealsData'], who: IndexSubComponentProps['who'] ) {
	const now = moment();
	const dayZero = moment( "2020-01-15" );
	const currentWeek = now.diff( dayZero, "weeks" );
	const weekList = [];
    
	for ( let i = -1; i <= currentWeek; i ++ ) weekList.push( i );
	const datedData = inputData.map( el => {
		return {
			...el,
			week: moment( el.date, "DD-MM-YYYY" ).diff( dayZero, "weeks" ),
		};
	});
	const filteredData = datedData.filter( el => who === "both" || who === el.who );


	const initialFinancialPosition = who === "both" ? -399 * 2 : -399;
	let mutableFinancialPosition = initialFinancialPosition;

	return weekList.map( week => {
		if ( week === -1 ) return { week, quantity: 0, netPosition: 0 };

		const thisWeeksData = filteredData.filter( el => week === el.week );

		const quantity = thisWeeksData.length;
		const incrementalSave = quantity * 10;        
		const incrementalSpend = thisWeeksData.reduce(( total, curr ) => total + curr.incidentals, 0 );        
        
		const netPosition = mutableFinancialPosition - incrementalSpend + incrementalSave;
        
		// indexing variable, running total of netPosition. This should be improved later.
		mutableFinancialPosition = netPosition;

		return {
			week,
			quantity,
			netPosition,
		};
	});
}