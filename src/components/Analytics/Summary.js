// Packages
import React, { useMemo } from "react";
import { Row, Col, Card, Typography } from "antd";
import moment from "moment";
import CountUp from "react-countup";

// App
const { Title } = Typography;

const Summary = ({ mealsData, who }) => {
    const {
        position,
        spend,
        totalMeals,
        savings,
        totalMenuCost,
    } = useMemo(() => doFormatData(mealsData, who), [mealsData, who]);

    const daysElapsed = moment().diff(
        moment("15/01/2020", "DD-MM-YYYY"),
        "day"
    );
    const daysRemainingToBreakEven = (position * -1) / (savings / daysElapsed);
    const averageWeekly = totalMeals / (daysElapsed / 7);

    const rowStructure = { type: "flex", justify: "center", gutter: 10 };
    const smallColProps = { span: 12 };

    return (
        <Row>
            <Row
                style={{ width: "100%", paddingTop: "2em" }}
                type="flex"
                justify="center"
            >
                <Col xs={24} md={18}>
                    <Row {...rowStructure}>
                        <Col span={24}>
                            <Card
                                title="Net Financial Position"
                                bordered={false}
                            >
                                <Title level={2}>
                                    <CountUp
                                        start={spend}
                                        end={position}
                                        duration={5}
                                        prefix="$"
                                    />
                                </Title>
                            </Card>
                        </Col>
                    </Row>
                    <Row {...rowStructure}>
                        <Col {...smallColProps}>
                            <Card title="Saved" size="small" bordered={false}>
                                <Title level={4}>
                                    <CountUp
                                        start={0}
                                        end={savings}
                                        duration={3}
                                        prefix="$"
                                    />
                                </Title>
                            </Card>
                        </Col>
                        <Col {...smallColProps}>
                            <Card title="Spent" size="small" bordered={false}>
                                <Title level={4}>
                                    <CountUp
                                        start={0}
                                        end={spend}
                                        duration={3}
                                        prefix="$"
                                    />
                                </Title>
                            </Card>
                        </Col>
                    </Row>

                    <Row {...rowStructure}>
                        <Col {...smallColProps}>
                            <Card
                                title="Breakeven"
                                size="small"
                                bordered={false}
                            >
                                <Title level={4}>
                                    <CountUp
                                        start={0}
                                        end={daysRemainingToBreakEven}
                                        duration={3}
                                        suffix=" days"
                                    />
                                </Title>
                            </Card>
                        </Col>
                        <Col {...smallColProps}>
                            <Card
                                title="Avg meals"
                                size="small"
                                bordered={false}
                            >
                                <Title level={4}>
                                    <CountUp
                                        start={0}
                                        end={averageWeekly}
                                        duration={3}
                                        decimals={1}
                                        suffix=" / wk"
                                    />
                                </Title>
                            </Card>
                        </Col>
                    </Row>

                    <Row {...rowStructure}>
                        <Col {...smallColProps}>
                            <Card
                                title="Cost to FF"
                                size="small"
                                bordered={false}
                            >
                                <Title level={4}>
                                    <CountUp
                                        start={0}
                                        end={totalMenuCost}
                                        duration={3}
                                        prefix="$"
                                    />
                                </Title>
                            </Card>
                        </Col>
                        <Col {...smallColProps}>
                            <Card title="FF p/l" size="small" bordered={false}>
                                <Title level={4}>
                                    <CountUp
                                        start={spend * -1}
                                        end={spend * -1 - totalMenuCost}
                                        duration={3}
                                        prefix="$"
                                    />
                                </Title>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    );
};

export default Summary;

function doFormatData(inputData, who) {
    const datedData = inputData.map(el => {
        return {
            ...el,
            weekId: `${moment(el.date, "DD-MM-YYYY").year()}${moment(
                el.date,
                "DD-MM-YYYY"
            ).format("ww")}`,
        };
    });
    const filteredData = datedData.filter(
        el => who === "both" || who === el.who
    );
    const incidentals =
        filteredData.reduce((total, curr) => total + curr.incidentals, 0) * -1;
    const mealCosts = filteredData.map(el => el.menu.cost);
    const originalInvestment = who === "both" ? -399 * 2 : -399;
    const totalMeals = filteredData.length;
    const savings = totalMeals * 10;
    const position = originalInvestment + savings;
    const totalMenuCost = mealCosts.reduce((total, curr) => total + curr);

    return {
        spend: originalInvestment + incidentals,
        position,
        totalMeals,
        savings,
        totalMenuCost,
    };
}
