
// Packages
import React from 'react';
import { useMachine } from '@xstate/react';
import { Form, DatePicker } from 'antd'
import moment from 'moment';


// App
import { mealMachine } from '../../helpers/machines';


const PageOne = () => {
    const [ current, send ] = useMachine( mealMachine );
    return (
       <Form>
           <Form.Item label="Date">
                <DatePicker format="DD-MM-YYYY" defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } />
            </Form.Item>
       </Form>
    )
}

export default PageOne