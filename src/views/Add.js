
// Packages
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';


// App
import { mealMachine } from '../helpers/machines';
import PageOne from '../components/Add/PageOne';
import Success from '../components/Add/Success';
import CenteredSpin from '../components/Shared/CenteredSpin';


const Add = ({ authState }) => {
    const [ current, send ] = useMachine( mealMachine );
    const [ returnedIds, setReturnedIds ] = useState();
    const confirmSave = ( res ) => {
        send( 'SUCCESS' );
        setReturnedIds( res );
    }
    const restart = () => send( 'RESTART' )

    if ( !authState ) return <CenteredSpin />

    return(
        <>
            { current.matches( "pageone" ) && <PageOne confirmSave={ confirmSave } /> }
            { current.matches( "success" ) && <Success restart={ restart } ids={ returnedIds } /> }
        </>
    )
}

export default Add;