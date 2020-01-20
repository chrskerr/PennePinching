
// Packages
import React, { useState } from 'react';
import { Row, Select, Typography } from 'antd';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import _ from 'lodash';


// App
const { Title } = Typography;
const { Option } = Select;


const History = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const formattedData = doFormatData( mealsData );

    console.log( formattedData )
    console.log( mealsData )

    return (
        <Row>
            <Row gutter={[ 0, 4 ]}>
                <Title level={ 3 }>Summary</Title>
                <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                    <Option value='both'>Both</Option>
                    <Option value='Katie'>Katie</Option>
                    <Option value='Chris'>Chris</Option>
                </Select>
            </Row>
            <Row>
                <ComposedChart data={ formattedData } height={ 800 } width={ 600 }>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Bar fill="#413ea0" dataKey='quantity' />
                </ComposedChart>
            </Row>
        </Row>
    )
}

export default History;

function doFormatData( inputData, who = 'both' ) {
    const output = [];
    inputData.forEach( el => {
        const year = el.date.split( '/' )[ 2 ];
        const week = moment( el.date, "DD-MM-YYYY" ).isoWeek();
        const index = _.findIndex( output, { week, year })
        if ( index === -1 ) {
            output.push({
                year,
                week,
                quantity: 1,
            })
        } else {
            const oldData = { ...output[ index ] };
            output[ index ] = {
                ...oldData,
                quantity: oldData.quantity ++,
            }
        }
    })

    // Set then Map then Reduce could be cleaner

    console.log( output )
    return output;
};