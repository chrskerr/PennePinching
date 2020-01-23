
// Packages
import React, { useState, useMemo } from 'react';
import { Row, Select, Typography } from 'antd';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { blue } from '@ant-design/colors'


// App
const { Title } = Typography;
const { Option } = Select;


const Weekdays = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const formattedData = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);

    return (
        <Row>
            <Row>
                <Title level={ 3 }>Weekday Distribution</Title>
                <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                    <Option value='both'>Both</Option>
                    <Option value='Katie'>Katie</Option>
                    <Option value='Chris'>Chris</Option>
                </Select>
            </Row>
            <Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
                <ResponsiveContainer width='100%' height={ 300 }>
                    <ComposedChart data={ formattedData } >
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ top: '-1em' }} />
                        <XAxis dataKey="day" padding={{ left: 35, right: 35 }}/>
                        <YAxis yAxisId="left" dataKey="quantity" />
                        <Bar yAxisId="left" fill={ blue[5] } dataKey='quantity' barSize={ 20 } name="Number of meals" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Row>
        </Row>
    )
}

export default Weekdays;

function doFormatData( inputData, who ) {
    const datedData = inputData.map( el => {
        return {
            ...el,
            day: moment( el.date, "DD-MM-YYYY" ).day(),
        }
    });
    const days = window.innerWidth < 500 ?  
        [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ] 
        : [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ]
    const filteredData = datedData.filter( el => who === 'both' || who === el.who );
    
    return days.map( ( day, i ) => {
        return {
            day: days[ i ],
            quantity: filteredData.filter( el => { return el.day === i } ).length
        }
    });
};