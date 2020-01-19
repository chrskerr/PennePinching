
// Packages
import React, { useState } from 'react';
import { Row, Select, Typography } from 'antd';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import _ from 'lodash';


// App

const { Title } = Typography;
const { Option } = Select;

const dataProcess = ( inputData ) => {
    const output = {
        width: 0,
        height: 0,
        dataPoints: [],
    };

    inputData.forEach( el => {
        const year = el.date.split( '/' )[ 2 ];
        const weekNum = moment( el.date, "DD-MM-YYYY" ).isoWeek();
        const index = _.findIndex( output.dataPoints, { weekNum, year })
        if ( index === -1 ) {
            output.dataPoints.push({
                year,
                weekNum,
                quantity: 1,
                sum: el.menu.cost,
                netInternalPos: 0,
            })
        } else {
            output.dataPoints[ index ] = {
                year,
                weekNum,
                quantity: output.dataPoints[ index ].quantity ++,
                sum: output.dataPoints[ index ].sum += el.menu.cost,
                netInternalPos: 0,
            }
        }
    })
    console.log( output )

};

const History = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' )
    const displayData = dataProcess( mealsData )

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
                <ComposedChart>

                </ComposedChart>
            </Row>
        </Row>
    )
}

export default History;

function ISO8601_week_no ( input ) {
    const dt = new Date( ...input )
    let tdt = new Date( dt.valueOf() );
    const dayn = ( dt.getDay() + 6 ) % 7;
    tdt.setDate( tdt.getDate() - dayn + 3) ;
    const firstThursday = tdt.valueOf();
    tdt.setMonth( 0, 1 );
    
    if ( tdt.getDay() !== 4 ) {
        tdt.setMonth( 0, 1 + ( ( 4 - tdt.getDay() ) + 7 ) % 7 );
    }

    return 1 + Math.ceil( ( firstThursday - tdt ) / 604800000 );
}