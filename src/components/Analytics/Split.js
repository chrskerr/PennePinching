
// Packages
import React, { useState, useMemo } from 'react';
import { Row, Select, Typography } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import _ from 'lodash';
import { blue, gold, volcano } from '@ant-design/colors'


// App
const { Title } = Typography;
const { Option } = Select;


const Split = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const formattedData = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);
    const COLORS = [ blue[5], gold[5], volcano[5] ];

    return (
        <Row>
            <Row>
                <Title level={ 3 }>Meal Split</Title>
                <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                    <Option value='both'>Both</Option>
                    <Option value='Katie'>Katie</Option>
                    <Option value='Chris'>Chris</Option>
                </Select>
            </Row>
            <Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
                <ResponsiveContainer width='100%' height={ 300 }>
                    <PieChart margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                        <Pie dataKey="quantity" data={ formattedData } label innerRadius={ 75 } outerRadius={ 100 } paddingAngle={ 5 } >
                            { _.map( formattedData, ( cell, index ) => <Cell key={ cell.name } fill={ COLORS[ index % COLORS.length ] }/>)}
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
    const menuCategories = [ ...new Set( inputData.map( input => input.menu.category )) ]

    return _.map( menuCategories, name => {
        const quantities = _.map( inputData, el => {
            if ( name === el.menu.category ) { 
                if ( who === "both" ) return 1;
                if ( el.shared ) return 0.5;
                if ( who === el.who ) return 1;
            }
            return 0;
        });
        const quantity = _.reduce( quantities, ( total, curr ) => total + curr );

        return {
            name,
            quantity,
        };
    });
};