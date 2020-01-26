
// Packages
import React from 'react';
import { Row, Table } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

// App
import { GET_FILTERED_MENU, GET_FILTERED_MEALS } from '../../helpers/apolloQueries';
import CenteredSpin from '../../components/Shared/CenteredSpin';

const tableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '#',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Last eaten',
        dataIndex: 'last',
        key: 'last',
        sorter: (a, b) => {
            if ( moment( a.last, "DD-MM-YYYY" ).isSameOrBefore( b.last, 'DD-MM-YYYY' ) ) return 1;
            return -1;
        },
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend'],
    },
]

const Menu = ({ category, who }) => {
    const { data: menuQueryData } = useQuery( GET_FILTERED_MENU, { variables: { category }} );
    const { data: mealsQueryData } = useQuery( GET_FILTERED_MEALS, { variables: { category }} );

    if ( !menuQueryData || !mealsQueryData ) return <CenteredSpin />;

    const tableData = doFormatData( menuQueryData.menu, mealsQueryData.meals, who );

    return (
        <Row>
            <Table 
                dataSource={ tableData } 
                columns={ tableColumns } 
                pagination={ false /* { size: 'small', simple: true, pageSize: 5 } */ }
            />
        </Row>
    )
}

export default Menu;

function doFormatData ( menuInputData, mealsInputData, who ) {
    return menuInputData.map( item => {
        const filteredMeals = mealsInputData.filter( meal => { return meal.menu.name === item.name });
        const quantities = filteredMeals.map( el => {
            if ( who === "both" ) return 1;
            if ( el.shared ) return 0.5;
            if ( who === el.who ) return 1;
            return 0;
        });
        const quantity = quantities.length > 0 ? quantities.reduce( ( total = 0, curr ) => total + curr ) : 0
        
        const last = filteredMeals.reduce( ( best, curr ) => {
            const currDate = moment( curr.date, "DD-MM-YYYY");
            if ( best.isSameOrBefore( currDate ) ) return currDate;
            return best;
        }, moment( '01/01/2020', 'DD-MM-YYYY' )).format( 'DD-MM-YYYY' );

        return {
            ...item,
            key: item.id,
            quantity,
            last: quantity ? last : '',
        }
    })
}