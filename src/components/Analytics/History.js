
// Packages
import React, { useState, useMemo } from 'react';
import { Row, Select, Typography } from 'antd';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import _ from 'lodash';
import { blue, gold } from '@ant-design/colors'


// App
const { Title } = Typography;
const { Option } = Select;


const History = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const formattedData = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);

    return (
        <Row>
            <Row>
                <Title level={ 3 }>History</Title>
                <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                    <Option value='both'>Both</Option>
                    <Option value='Katie'>Katie</Option>
                    <Option value='Chris'>Chris</Option>
                </Select>
            </Row>
            <Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
                <ResponsiveContainer width='100%' height={ 300 }>
                    <ComposedChart data={ formattedData }>
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ top: '-1em' }} />
                        <XAxis dataKey="week" />
                        <XAxis dataKey="year" xAxisId="year" axisLine={ false } interval={ 12 } label="Weeks of the Year"/>
                        <YAxis yAxisId="left" dataKey="quantity" />
                        <YAxis yAxisId="right" dataKey="netPosition" orientation="right" />
                        <Bar yAxisId="left" fill={ blue[5] } dataKey='quantity' barSize={ 20 } name="# of Meals" />
                        <Line yAxisId="right" type="monotone" dataKey="netPosition" stroke={ gold[5] } name="Net $" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Row>
        </Row>
    )
}

export default History;

function doFormatData( inputData, who ) {
    const datedData = inputData.map( el => {
        return {
            ...el,
            weekId: `${ moment( el.date, "DD-MM-YYYY" ).year() }${ moment( el.date, "DD-MM-YYYY" ).format('ww') }`,
        }
    });
    const filteredData = _.filter( datedData, el => who === 'both' || who === el.who );
    const weekList = [ ...new Set( datedData.map( el => el.weekId )) ];
    weekList.unshift( '202001', '202002' );

    let financialPosition = who === "both" ? -399 * 2 : -399;

    return _.map( weekList.sort(), week => {
        const quantities = _.map( filteredData, el => {
            if ( week === el.weekId ) return 1;
            return 0;
        });
        const quantity = _.reduce( quantities, ( total, curr ) => total + curr );
        const netPosition = quantity ? financialPosition + ( quantity * 10 ) : 0;
        if (quantity) financialPosition = netPosition;

        return {
            weekId: week,
            week: week.slice( 4 ),
            year: week.slice( 0, 4 ),
            quantity,
            netPosition,
        };
    });
};