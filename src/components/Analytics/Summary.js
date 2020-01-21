
// Packages
import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Select, Typography } from 'antd';
import moment from 'moment';
import CountUp from 'react-countup';
import { red, volcano, yellow, green, cyan, blue, geekblue } from '@ant-design/colors'

// App
const { Option } = Select;
const { Title, Text } = Typography;

const Summary = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const { weekCount, position, originalInvestment, totalMeals,  internalCost, totalMenuCost } = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);
    
    const rowStructure = { type: 'flex', justify: 'center' };
    const smallColProps = { span: 7, offset: 1, style: { minWidth: '140px', marginBottom: '1em' } };


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

            <Row style={{ width: "100%", paddingTop: "2.5em" }}>

                <Row { ...rowStructure } >
                    <Col xs={ 22 } md={ 15 } offset={ 1 } style={{ marginBottom: '1em' }}>
                        <Card title='Net Financial Position' headStyle={{ backgroundColor: geekblue[1] }}  bodyStyle={{ backgroundColor: geekblue[0] }}>
                            <Title level={ 4 }>
                                <CountUp start={ originalInvestment } end={ position } duration={ 5 } prefix="$" />
                            </Title>
                        </Card>
                    </Col>
                </Row>
                <Row { ...rowStructure }>
                    <Col { ...smallColProps } >
                        <Card title='Saved' size="small" headStyle={{ backgroundColor: blue[1] }}  bodyStyle={{ backgroundColor: blue[0] }}>
                            <Text strong>
                                <CountUp start={ 0 } end={ internalCost } duration={ 3 } prefix="$" />
                            </Text>
                        </Card>
                    </Col>
                    <Col { ...smallColProps } >
                        <Card title='Spent' size="small" headStyle={{ backgroundColor: cyan[1] }} bodyStyle={{ backgroundColor: cyan[0] }}>
                            <Text strong >
                                <CountUp start={ 0 } end={ originalInvestment } duration={ 3 } prefix="$" />
                            </Text>
                        </Card>
                    </Col>
                </Row>

                <Row { ...rowStructure } >
                    <Col { ...smallColProps } >
                        <Card title='Meals Eaten' size="small" headStyle={{ backgroundColor: green[1] }}  bodyStyle={{ backgroundColor: green[0] }}>
                            <Text strong>
                                <CountUp start={ 0 } end={ totalMeals } duration={ 3 } />
                            </Text>
                        </Card>
                    </Col>
                    <Col { ...smallColProps } >
                        <Card title='Average' size="small" headStyle={{ backgroundColor: yellow[1] }} bodyStyle={{ backgroundColor: yellow[0] }}>
                            <Text strong>
                                <CountUp start={ 0 } end={ totalMeals / weekCount } duration={ 3 } decimals={ 1 } suffix=" / wk" />
                            </Text>
                        </Card>
                    </Col>
                </Row>

                <Row { ...rowStructure } >
                    <Col { ...smallColProps } >
                        <Card title='Cost to FF' size="small" headStyle={{ backgroundColor: red[1] }}  bodyStyle={{ backgroundColor: red[0] }}>
                            <Text strong>
                                <CountUp start={ 0 } end={ totalMenuCost } duration={ 3 } prefix="$" />
                            </Text>
                        </Card>
                    </Col>
                    <Col { ...smallColProps } >
                        <Card title='FF p/l' size="small" headStyle={{ backgroundColor: volcano[1] }} bodyStyle={{ backgroundColor: volcano[0] }}>
                            <Text strong>
                                <CountUp start={ originalInvestment * -1 } end={ ( originalInvestment * -1 ) - totalMenuCost } duration={ 3 } prefix="$" />
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Row>
    )
}

export default Summary;


function doFormatData( inputData, who ) {
    const datedData = inputData.map( el => {
        return {
            ...el,
            weekId: `${ moment( el.date, "DD-MM-YYYY" ).year() }${ moment( el.date, "DD-MM-YYYY" ).format('ww') }`,
        }
    });
    const filteredData = datedData.filter( el => who === 'both' || who === el.who );
    const mealCosts = filteredData.map( el => el.menu.cost );
    const originalInvestment = who === "both" ? -399 * 2 : -399;
    const totalMeals = filteredData.length;
    const internalCost = totalMeals * 10;
    const position = originalInvestment + internalCost;
    const totalMenuCost = mealCosts.reduce( ( total, curr ) => total + curr );
    const weekCount = [ ...new Set( datedData.map( el => el.weekId )) ].length;

    return {
        originalInvestment,
        weekCount,
        position,
        totalMeals,
        internalCost,
        totalMenuCost,
    }


};
