
// Packages
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';


// App
import { mealMachine } from '../helpers/machines';
import PageOne from '../components/Add/PageOne';
import Success from '../components/Add/Success';


const Add = ({ authState, homeService }) => {
    const [ current, , addService ] = useMachine( mealMachine );
    const [ returnedIds, setReturnedIds ] = useState();

    return(
        <>
            { current.matches( "pageone" ) && <PageOne addService={ addService } confirmSave={ res => setReturnedIds( res ) } authState={ authState } /> }
            { current.matches( "success" ) && <Success addService={ addService } homeService={ homeService } ids={ returnedIds } /> }
        </>
    )
}

export default Add;