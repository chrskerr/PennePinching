
// Packages
import React, { useState } from 'react';
import { Row, Col, Table, Select, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries';

const { Option } = Select;
const { Title, Text } = Typography;

const dataSummary = ( mode, data, who ) => {
    let output = { total: 0, pizza: 0, pasta: 0, salad: 0 };
    data.forEach( el => {
        if ( who === 'both' || who === el.who ) {
            if ( mode === "count" ) {
                output.total ++;
                output[ el.meal_category ] ++;
            }
            if ( mode === "sum" ) {
                output.total += el.menu_cost;
                output[ el.meal_category ] += el.menu_cost;
            }
        }
    })
    return output;
};

const Analyse = () => {
    const { loading, data } = useQuery( GET_ALL_MEALS );
    const [ who, setWho ] = useState( 'both' )
    const originalInvestment = 399
    
    if ( loading ) return null
    const { meals: mealsData } = data;
    const dataWithKeys = [ ...mealsData ].map( ( el, i ) => { return { ...el, key: i } } )
    const spend = who === 'both' ? originalInvestment * 2 : originalInvestment
    
    const counts = dataSummary( "count", mealsData, who )
    const sums = dataSummary( "sum", mealsData, who )

    return (
        <Row>
            <Row>
                <Title level={ 3 }>Summary</Title>
                <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                    <Option value='both'>Both</Option>
                    <Option value='Katie'>Katie</Option>
                    <Option value='Chris'>Chris</Option>
                </Select>
            </Row>
            <Row>
                <Title level={ 4 }>Costs</Title>
                <Text>Total spent: $</Text><Text strong>{ spend }</Text>
            </Row>
            <Row>
                <Text>Total meals: </Text><Text strong>{ counts.total }</Text>
            </Row>
            <Row>
                <Text>Total savings (internal): $</Text><Text strong>{ ( counts.total ) * 10 }</Text><Text> at $10 per meal</Text>
            </Row>
            <Row>
                <Text>Total savings (external): $</Text><Text strong>{ sums.total }</Text>
            </Row>
            <Row>
                <Text>Net position (internal): $</Text><Text strong>{ ( counts.total ) * 10 - spend }</Text>
            </Row>
            <Row>
                <Text>Net position (external)): $</Text><Text strong>{ sums.total - spend }</Text>
            </Row>
        
            {/* { data && <Table dataSource={ dataWithKeys } columns={ columns } /> } */}
        </Row>
    )
}

export default Analyse;