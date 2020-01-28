
// Packages
import React, { useMemo } from 'react';
import { Row } from 'antd';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { blue, lime } from '@ant-design/colors'


// App


const Weekdays = ({ mealsData, who }) => {
    const formattedData = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);
    return (
        <Row>
            <Row justify="center" type="flex" style={{ width: "100%", paddingTop: "2.5em" }} >
                <ResponsiveContainer width='100%' height={ 300 }>
                    <ComposedChart data={ formattedData } >
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ top: '-1em' }} />
                        <XAxis dataKey="day" padding={{ left: 15, right: 15 }}/>
                        <YAxis />
                        <Bar stackId="a" fill={ blue[5] } dataKey='dinner' barSize={ 20 } name="Number of dinners" />
                        <Bar stackId="a" fill={ lime[5] } dataKey='lunch' barSize={ 20 } name="Number of lunches" />
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
            lunch: filteredData.filter( el => { return el.day === i && !el.isDinner } ).length,
            dinner: filteredData.filter( el => { return ( el.day === i && el.isDinner ) } ).length,
        }
    });
};
