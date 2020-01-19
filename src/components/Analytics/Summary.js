
// Packages
import React, { useState } from 'react';
import { Row, Select, Typography } from 'antd';


// App
const { Option } = Select;
const { Title, Text } = Typography;

const dataSummary = ( mode, data, who ) => {
    let output = { total: 0, pizza: 0, pasta: 0, salad: 0 };
    data.forEach( el => {
        if ( ( who === 'both' || who === el.who ) && el.menu ) {
            if ( mode === "count" ) {
                output.total ++;
                output[ el.menu.category.toLowerCase() ] ++;
            }
            if ( mode === "sum" ) {
                output.total += el.menu.cost;
                output[ el.menu.category.toLowerCase() ] += el.menu.cost;
            }
        }
    })
    return output;
};

const Summary = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const originalInvestment = 399;
    const spend = who === 'both' ? originalInvestment * 2 : originalInvestment;
    const counts = dataSummary( "count", mealsData, who );
    const sums = dataSummary( "sum", mealsData, who );

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
            <br />
            <Row>
                <Text>Total spent: $</Text><Text strong>{ spend }</Text>
            </Row>
            <br />
            <Row>
                <Text>Total meals: </Text><Text strong>{ counts.total }</Text>
            </Row>
            <Row>
                <Text>What we would've spent at home: $</Text><Text strong>{ ( counts.total ) * 10 }</Text><Text> at $10 per meal</Text>
            </Row>
            <Row>
                <Text>Total menu-cost: $</Text><Text strong>{ sums.total }</Text>
            </Row>
            <br />
            <Row>
                <Text>Savings against at home: $</Text><Text strong>{ ( counts.total ) * 10 - spend }</Text>
            </Row>
            <br />
            <Row>
                <Text>Total cost to Fratelli Fresh: $</Text><Text strong>{ sums.total - spend }</Text>
            </Row>
        </Row>
    )
}

export default Summary;