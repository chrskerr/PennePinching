
// Packages
import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useMachine } from '@xstate/react';


// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries';
import { analyticsMachine } from '../helpers/machines';
import Summary from '../components/Analytics/Summary';

const { Text } = Typography;

const Analytics = () => {
    const { loading, data, error } = useQuery( GET_ALL_MEALS );
    const [ current, send ] = useMachine( analyticsMachine );

    if ( error ) {
        console.error( error )
        return (
            <Text type="danger">Hasura error, see Console</Text>
        )
    }

    if ( loading || error ) return null
    const { meals: mealsData } = data;

    return (
        <Row gutter={[ 8, 8 ]}>
            <Col span={ 2 }>
                <Button size="large" icon="left" onClick={ () => send( "PREVIOUS" ) }/>
            </Col>
            <Col span={ 20 }>
                { current.matches( 'summary' ) && <Summary mealsData={ mealsData } /> }
            </Col>
            <Col span={ 2 }>
                <Button size="large" icon="right" onClick={ () => send( "PREVIOUS" ) }/>
            </Col>
        </Row>
    )
}

export default Analytics;