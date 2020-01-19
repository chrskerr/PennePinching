
// Packages
import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useMachine } from '@xstate/react';


// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries';
import { analyticsMachine } from '../helpers/machines';
import CenteredSpin from '../components/Shared/CenteredSpin';
import Summary from '../components/Analytics/Summary';
import History from '../components/Analytics/History';

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

    if ( loading || error ) return <CenteredSpin />
    const { meals: mealsData } = data;

    return (
        <Row>
            <Row justify="space-between" type="flex" style={{ marginBottom: "0.5em" }}>
                <Col span={ 2 }>
                    <Button size="large" icon="left" onClick={ () => send( "PREVIOUS" ) }/>
                </Col>
                <Col span={ 2 }>
                    <Button size="large" icon="right" onClick={ () => send( "NEXT" ) }/>
                </Col>
            </Row>
            <Row>
                <Col span={ 20 }>
                    { current.matches( 'summary' ) && <Summary mealsData={ mealsData } /> }
                    { current.matches( 'history' ) && <History mealsData={ mealsData } /> }
                </Col>
            </Row>
        </Row>
    )
}

export default Analytics;