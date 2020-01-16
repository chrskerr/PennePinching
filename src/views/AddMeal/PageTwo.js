
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';

// App
import { mealMachine } from '../../helpers/machines';


const PageTwo = () => {
    const [ current, send ] = useMachine( mealMachine );
    return (
        <>
            <p>Hello, World!</p>
            <p>PageTwo</p>
        </>
    )
}

export default PageTwo