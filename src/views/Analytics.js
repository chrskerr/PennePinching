
// Packages
import React, { useState } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { useMachine } from '@xstate/react';
import { Select } from 'antd';

// App
import { GET_ALL_MEALS } from '../helpers/apolloQueries';
import { analyticsMachine } from '../helpers/machines';
import CenteredSpin from '../components/Shared/CenteredSpin';
import Summary from '../components/Analytics/Summary';
import History from '../components/Analytics/History';
import Split from '../components/Analytics/Split';
import Weekdays from '../components/Analytics/Weekdays';

const { Text, Title } = Typography;

const titleMap = {
    summary: 'Summary',
    history: 'History',
    split: 'Meal Split',
    weekdays: 'Weekday Split',
}

const Analytics = () => {
    const { data, error } = useQuery( GET_ALL_MEALS );
    const [ current, send ] = useMachine( analyticsMachine );
    const [ who, setWho ] = useState( 'both' );

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
                    <Title level={ 3 }>{ titleMap[ current.value ] }</Title>
                    <Button size="large" icon="right" onClick={ () => send( "NEXT" ) }/>
                </Row>
                <Row>
                    <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                        <Select.Option value='both'>Both</Select.Option>
                        <Select.Option value='Katie'>Katie</Select.Option>
                        <Select.Option value='Chris'>Chris</Select.Option>
                    </Select>
                </Row>
                <Row>
                    <Col>
                        { current.matches( 'summary' ) && <Summary mealsData={ mealsData } who={ who }/> }
                        { current.matches( 'history' ) && <History mealsData={ mealsData } who={ who }/> }
                        { current.matches( 'split' ) && <Split mealsData={ mealsData } who={ who }/> }
                        { current.matches( 'weekdays' ) && <Weekdays mealsData={ mealsData } who={ who }/> }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Analytics;