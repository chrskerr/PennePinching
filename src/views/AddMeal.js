
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';

// App
import { mealMachine } from '../helpers/machines';
import PageOne from './AddMeal/PageOne';
import PageTwo from './AddMeal/PageTwo';


const AddMeal = () => {
    const [ current ] = useMachine( mealMachine );
    return(
        <>
            { ( current.value === "initial" || current.value === "submittingInitial" ) && <PageOne /> }
            { ( current.value === "secondPage" || current.value === "submittingSecondPage" ) && <PageTwo /> }
        </>
    )
}

export default AddMeal;