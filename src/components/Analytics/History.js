// Packages
import React, { useMemo } from "react";
import { Row } from "antd";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import moment from "moment";
import { blue, gold } from "@ant-design/colors";

// App

const History = ({ mealsData, who }) => {
    const formattedData = useMemo(() => doFormatData(mealsData, who), [
        mealsData,
        who,
    ]);
    return (
        <Row>
            <Row
                justify="center"
                type="flex"
                style={{ width: "100%", paddingTop: "2.5em" }}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart
                        data={formattedData}
                        margin={{ top: 0, right: -20, bottom: 0, left: -20 }}
                    >
                        <Tooltip />
                        <Legend
                            verticalAlign="top"
                            wrapperStyle={{ top: "-1em" }}
                        />
                        <XAxis
                            dataKey="week"
                            padding={{ left: 15, right: 15 }}
                        />
                        <XAxis
                            dataKey="year"
                            xAxisId="year"
                            axisLine={false}
                            interval={12}
                            padding={{ left: 15, right: 15 }}
                            label="Week #"
                        />
                        <YAxis yAxisId="left" dataKey="quantity" />
                        <YAxis
                            yAxisId="right"
                            dataKey="netPosition"
                            orientation="right"
                        />
                        <Bar
                            yAxisId="left"
                            fill={blue[5]}
                            dataKey="quantity"
                            barSize={20}
                            name="# of Meals"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="netPosition"
                            stroke={gold[5]}
                            name="Net $"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Row>
        </Row>
    );
};
export default History;

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
    const weekList = [...new Set(datedData.map(el => el.weekId))];
    weekList.unshift("202001", "202002");

    const initialFinancialPosition = who === "both" ? -399 * 2 : -399;
    let mutableFinancialPosition = initialFinancialPosition;

    return weekList.sort().map(weekId => {
        const thisWeeksData = filteredData.filter(el => {
            return weekId === el.weekId;
        });

        const quantity = thisWeeksData.length;
        const incrementalSave = quantity * 10;
        const incrementalSpend = thisWeeksData.reduce((total, curr) => {
            return total + curr.incidentals;
        }, 0);

        const netPosition =
            weekId === "202001" || weekId === "202002"
                ? 0
                : mutableFinancialPosition - incrementalSpend + incrementalSave;

        // indexing variable, running total of netPosition. This should be improved later.
        mutableFinancialPosition =
            weekId === "202001" || weekId === "202002"
                ? mutableFinancialPosition
                : netPosition;

        return {
            weekId,
            week: weekId.slice(4),
            year: weekId.slice(0, 4),
            quantity,
            netPosition,
        };
    });
}
