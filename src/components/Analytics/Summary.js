
// Packages
import React, { useMemo } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import moment from 'moment'

import CountUp from 'react-countup';
import { blue, geekblue } from '@ant-design/colors'

// App
const { Title, Text } = Typography;

const Summary = ({ mealsData, who }) => {
    const { position, originalInvestment, totalMeals, savings, totalMenuCost } = useMemo( () => doFormatData( mealsData, who ), [ mealsData, who ]);

    const daysElapsed = moment().diff( moment( "2020/01/15" ), 'day' );
    const daysRemainingToBreakEven = ( position * -1 ) / ( savings / daysElapsed );
    const averageWeekly = totalMeals / ( daysElapsed / 7 );

    const rowStructure = { type: 'flex', justify: 'center', gutter: 20 };
    const smallColProps = { span: 12 };

    return (
        <Row>
            {/* <Row>
                <Title level={ 3 }>Summary</Title>
            </Row> */}
            <Row style={{ width: "100%", paddingBottom: "2em" }} type='flex' justify='center' >
                <Col xs={ 24 } md={ 18 } >
                    <Row { ...rowStructure } >
                        <Col span={ 24 } >
                            <Card title='Net Financial Position' bordered={ false } >
                                <Title level={ 2 }>
                                    <CountUp start={ originalInvestment } end={ position } duration={ 5 } prefix="$" />
                                </Title>
                            </Card>
                        </Col>
                    </Row>
                    <Row { ...rowStructure }>
                        <Col { ...smallColProps } >
                            <Card title='Saved' size="small"  bordered={ false }>
                                <Title level={ 4 }>
                                    <CountUp start={ 0 } end={ savings } duration={ 3 } prefix="$" />
                                </Title>
                            </Card>
                        </Col>
                        <Col { ...smallColProps } >
                            <Card title='Spent' size="small"  bordered={ false }>
                                <Title level={ 4 } >
                                    <CountUp start={ 0 } end={ originalInvestment } duration={ 3 } prefix="$" />
                                </Title>
                            </Card>
                        </Col>
                    </Row>

                    <Row { ...rowStructure } >
                        <Col { ...smallColProps } >
                            <Card title='Breakeven' size="small"  bordered={ false }>
                                <Title level={ 4 }>
                                    <CountUp start={ 0 } end={ daysRemainingToBreakEven } duration={ 3 } suffix=" days" />
                                </Title>
                            </Card>
                        </Col>
                        <Col { ...smallColProps } >
                            <Card title='Avg Meals' size="small"  bordered={ false }>
                                <Title level={ 4 }>
                                    <CountUp start={ 0 } end={ averageWeekly } duration={ 3 } decimals={ 1 } suffix=" / wk" />
                                </Title>
                            </Card>
                        </Col>
                    </Row>

                    <Row { ...rowStructure } >
                        <Col { ...smallColProps } >
                            <Card title='Cost to FF' size="small"  bordered={ false }>
                                <Title level={ 4 }>
                                    <CountUp start={ 0 } end={ totalMenuCost } duration={ 3 } prefix="$" />
                                </Title>
                            </Card>
                        </Col>
                        <Col { ...smallColProps } >
                            <Card title='FF p/l' size="small"  bordered={ false }>
                                <Title level={ 4 }>
                                    <CountUp start={ originalInvestment * -1 } end={ ( originalInvestment * -1 ) - totalMenuCost } duration={ 3 } prefix="$" />
                                </Title>
                            </Card>
                        </Col>
                    </Row>
                </Col>
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
    const savings = totalMeals * 10;
    const position = originalInvestment + savings;
    const totalMenuCost = mealCosts.reduce( ( total, curr ) => total + curr );

    return {
        originalInvestment,
        position,
        totalMeals,
        savings,
        totalMenuCost,
    }
};
