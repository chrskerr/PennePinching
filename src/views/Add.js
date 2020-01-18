
// Packages
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Spin } from 'antd';


// App
import { mealMachine } from '../helpers/machines';
import PageOne from '../components/Add/PageOne';
import Success from '../components/Add/Success';


const Add = ({ authState }) => {
    const [ current, send ] = useMachine( mealMachine );
    const [ returnedIds, setReturnedIds ] = useState();
    const confirmSave = ( res ) => {
        send( 'SUCCESS' );
        setReturnedIds( res );
    }
    const restart = () => send( 'RESTART' )

    if ( !authState ) return <Spin />

    return(
        <>
            { current.matches( "pageone" ) && <PageOne confirmSave={ confirmSave } /> }
            { current.matches( "success" ) && <Success restart={ restart } ids={ returnedIds } /> }
        </>
    )
}

export default Add;