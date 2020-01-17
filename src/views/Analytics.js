
// Packages
import React from 'react';
import { Row, Col, Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useMachine } from '@xstate/react';


// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries';
import { analyticsMachine } from '../helpers/machines';
import Summary from '../components/Analytics/Summary';


const Analytics = () => {
    const { loading, data } = useQuery( GET_ALL_MEALS );
    const [ current, send ] = useMachine( analyticsMachine );



    if ( loading ) return null
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