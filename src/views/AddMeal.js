
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';

// App
import { mealMachine } from '../helpers/machines';


const AddMeal = () => {
    const [ current, send ] = useMachine( mealMachine );
    return(
        <p>Hello</p>
    )
}

export default AddMeal;