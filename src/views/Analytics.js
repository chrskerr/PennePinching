
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
import Split from '../components/Analytics/Split';
import Weekdays from '../components/Analytics/Weekdays';

const { Text } = Typography;

const Analytics = () => {
    const { data, error } = useQuery( GET_ALL_MEALS );
    const [ current, send ] = useMachine( analyticsMachine );

    if ( error ) {
        console.error( error )
        return <Text type="danger">Hasura error, see Console</Text>
    }

    if ( !data ) return <CenteredSpin />
    const { meals: mealsData } = data;

    return (
        <Row>
            <Col>
                <Row justify="space-between" type="flex" style={{ marginBottom: "1.5em" }}>
                    <Button size="large" icon="left" onClick={ () => send( "PREVIOUS" ) }/>
                    <Button size="large" icon="right" onClick={ () => send( "NEXT" ) }/>
                </Row>
                <Row>
                    <Col>
                        { current.matches( 'summary' ) && <Summary mealsData={ mealsData } /> }
                        { current.matches( 'history' ) && <History mealsData={ mealsData } /> }
                        { current.matches( 'split' ) && <Split mealsData={ mealsData } /> }
                        { current.matches( 'weekdays' ) && <Weekdays mealsData={ mealsData } /> }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Analytics;