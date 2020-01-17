
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
    return(
        <Col>
            <Title level={ 4 }>Add a New Meal</Title>
            { ( current.value === "initial" || current.value === "submittingInitial" ) && <PageOne /> }
            { ( current.value === "secondPage" || current.value === "submittingSecondPage" ) && <PageTwo /> }
        </Col>
    )
}

export default AddMeal;