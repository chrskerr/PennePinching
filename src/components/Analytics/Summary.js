
// Packages
import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Select, Typography, Statistic } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import CountUp from 'react-countup';


// App
const { Option } = Select;
const { Title } = Typography;

const Summary = ({ mealsData }) => {
    const [ who, setWho ] = useState( 'both' );
    const { weekCount, position, originalInvestment, totalMeals,  internalCost, totalMenuCost } = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);

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

                <Row justify='space-around' type='flex' >
                    <Col span={ 7 } style={{ minWidth: '200px', margin: '1em' }}>
                        <Card title='Net Financial Position' headStyle={{ backgroundColor: "#bae7ff" }}  bodyStyle={{ backgroundColor: "#e6f7ff" }}>
                            <Title level={ 3 }>
                                <CountUp start={ originalInvestment } end={ position } duration={ 5 } prefix="$" />
                            </Title>
                        </Card>
                    </Col>
                    <Col span={ 7 } style={{ minWidth: '200px', margin: '1em' }}>
                        <Card title='Original Spend' headStyle={{ backgroundColor: "#d9f7be" }} bodyStyle={{ backgroundColor: "#f6ffed" }}>
                            <Title level={ 3 }>
                                <CountUp start={ 0 } end={ originalInvestment } duration={ 3 } prefix="$" />
                            </Title>
                        </Card>
                    </Col>
                </Row>

                <Row justify='space-around' type='flex' >
                    <Col span={ 7 } style={{ minWidth: '200px', margin: '1em' }}>
                        <Card title='Meals Eaten' size="small" headStyle={{ backgroundColor: "#fff1b8" }}  bodyStyle={{ backgroundColor: "#fffbe6" }}>
                            <Title level={ 3 }>
                                <CountUp start={ 0 } end={ totalMeals } duration={ 3 } />
                            </Title>
                        </Card>
                    </Col>
                    <Col span={ 7 } style={{ minWidth: '200px', margin: '1em' }}>
                        <Card title='Average' size="small" headStyle={{ backgroundColor: "#ffe7ba" }} bodyStyle={{ backgroundColor: "#fff7e6" }}>
                            <Title level={ 3 }>
                                <CountUp start={ 0 } end={ totalMeals / weekCount } duration={ 3 } decimals={ 1 } suffix=" /week" />
                            </Title>
                        </Card>
                    </Col>
                </Row>


                <Row justify="space-around" type="flex" style={{ marginBottom: '1em' }}>
                    <Col span={ 8 }>
                        <Statistic title="Meals Eaten" value={ totalMeals } />
                    </Col>
                    <Col span={ 8 }>
                        <Statistic title="Average Peals per Week" value={ totalMeals / weekCount } suffix={ `/ ${ who === 'both' ? 14 : 7 }` } />
                    </Col>
                </Row>
                <Row justify="space-around" type="flex" style={{ marginBottom: '1em' }}>
                    <Col span={ 8 }>
                        <Statistic title="What That Would've Cost At Home" value={ `$${ internalCost }` } />
                    </Col>
                    <Col span={ 8 }>
                        <Statistic title="Total cost to Fratelli Fresh" value={ `$${ totalMenuCost }` } />
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
    const filteredData = _.filter( datedData, el => who === 'both' || who === el.who );
    const mealCosts = _.map( filteredData, el => el.menu.cost );
    const originalInvestment = who === "both" ? -399 * 2 : -399;
    const totalMeals = filteredData.length;
    const internalCost = totalMeals * 10;
    const position = originalInvestment + internalCost;
    const totalMenuCost = _.reduce( mealCosts, ( total, curr ) => total + curr );
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
