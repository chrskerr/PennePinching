
// Packages
import React from 'react';
import { Row, Col, Table } from 'antd';
import { useQuery } from '@apollo/react-hooks';


// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries'


const Analyse = () => {
    const { loading, error, data } = useQuery( GET_ALL_MEALS );
    console.log( data );
    const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Who',
        dataIndex: 'who',
        key: 'who',
    },
    {
        title: 'Meal Category',
        dataIndex: 'meal_category',
        key: 'meal_category',
    },
    {
        title: 'Menu Cost',
        dataIndex: 'menu_cost',
        key: 'menu_cost',
    },
    {
        title: 'Shared?',
        dataIndex: 'shared',
        key: 'shared',
    },
    ]

    return (
        <Row>
            <Col>
                { data && <Table dataSource={ data.meals } columns={ columns } /> }
            </Col>
        </Row>
    )
}

export default Analyse;