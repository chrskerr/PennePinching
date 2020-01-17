
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';
import { Col, Typography } from 'antd';

// App
import { mealMachine } from '../helpers/machines';
import PageOne from './AddMeal/PageOne';
import PageTwo from './AddMeal/PageTwo';

const { Title } = Typography;


const AddMeal = () => {
    const [ current ] = useMachine( mealMachine );

    console.log( current.value )

    return(
        <Col>
            <Title level={ 4 }>Add a New Meal</Title>
            { current.matches( "pageOne" ) && <PageOne /> }
            { current.matches( "pageTwo" ) && <PageTwo /> }
            { current.matches( "success" ) && <p>Success</p> }
        </Col>
    )
}

export default AddMeal;