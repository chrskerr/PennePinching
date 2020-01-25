
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

const Analytics = ({ offsetTop }) => {
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
                {/* <Row justify="space-between" type="flex" style={{ marginBottom: "1.5em" }}>
                    <Button size="large" icon="left" onClick={ () => send( "PREVIOUS" ) }/>
                    <Title level={ 3 }>{ titleMap[ current.value ] }</Title>
                    <Button size="large" icon="right" onClick={ () => send( "NEXT" ) }/>
                </Row> */}
                <Row>
                    <Select defaultValue={ who } onChange={ value => setWho( value ) }>
                        <Select.Option value='both'>Both</Select.Option>
                        <Select.Option value='Katie'>Katie</Select.Option>
                        <Select.Option value='Chris'>Chris</Select.Option>
                    </Select>
                </Row>
                <Row>
                    <Col>
                        <InfoCard label="Summary" >
                            <Summary mealsData={ mealsData } who={ who } />
                        </InfoCard>
                        <InfoCard label="History">
                            <History mealsData={ mealsData } who={ who } />
                        </InfoCard>
                        <InfoCard label="Meal Split">
                            <Split mealsData={ mealsData } who={ who } />
                        </InfoCard>
                        <InfoCard label="Weekday Split">
                            <Weekdays mealsData={ mealsData } who={ who } />
                        </InfoCard>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Analytics;

function InfoCard({ children, label }) {



    return (
            <Row style={{ height: '600px' }}>
                <Title level={ 4 } style={{ marginBottom: '1em', marginLeft: '3em' }}>{ label }</Title>
                { children }
            </Row>
    )
}