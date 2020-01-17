
// Packages
import React, { useState } from 'react';
import { Row, Select, Typography } from 'antd';


// App
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

const Summary = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const originalInvestment = 399;
    const spend = who === 'both' ? originalInvestment * 2 : originalInvestment;
    const counts = dataSummary( "count", mealsData, who );
    const sums = dataSummary( "sum", mealsData, who );

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
                <Text>Total spent: $</Text><Text strong>{ spend }</Text>
            </Row>
            <Row>
                <Text>Total meals: </Text><Text strong>{ counts.total }</Text>
            </Row>
            <br />
            <Row>
                <Text>Total savings (internal): $</Text><Text strong>{ ( counts.total ) * 10 }</Text><Text> at $10 per meal</Text>
            </Row>
            <Row>
                <Text>Total savings (external): $</Text><Text strong>{ sums.total }</Text>
            </Row>
            <br />
            <Row>
                <Text>Net position (internal): $</Text><Text strong>{ ( counts.total ) * 10 - spend }</Text>
            </Row>
            <Row>
                <Text>Net position (external)): $</Text><Text strong>{ sums.total - spend }</Text>
            </Row>
        </Row>
    )
}

export default Summary;