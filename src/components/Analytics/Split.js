
// Packages
import React, { useMemo } from 'react';
import { Row } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { blue, gold, volcano, green } from '@ant-design/colors'


// App


const Split = ({ mealsData, who }) => {
    const formattedData = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);
    const COLORS = [ volcano[5], gold[5], blue[5], green[5] ];

    return (
        <Row>
            <Row justify="center" type="flex" style={{ width: "100%" }} >
                <ResponsiveContainer width='100%' height={ 300 }>
                    <PieChart margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                        <Pie dataKey="quantity" data={ formattedData } label innerRadius={ 75 } outerRadius={ 100 } paddingAngle={ 5 } >
                            { formattedData.map( ( cell, index ) => <Cell key={ cell.name } fill={ COLORS[ index % COLORS.length ] }/>)}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ top: '-1em' }} />
                    </PieChart>
                </ResponsiveContainer>
            </Row>
        </Row>
    )
}

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
        const quantity = quantities.reduce( ( total, curr ) => total + curr );

        return {
            name,
            quantity,
        };
    });
};