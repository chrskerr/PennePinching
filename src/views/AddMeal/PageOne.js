
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';
// import { Formik } from 'formik';
import { Form, FormField } from 'grommet';

// App
import { mealMachine } from '../../helpers/machines';


const PageOne = () => {
    const [ current, send ] = useMachine( mealMachine );
    return (
        <Form>
            <FormField label="Date">
                <input type='date' />
            </FormField>
        </Form>
    )
}

export default PageOne