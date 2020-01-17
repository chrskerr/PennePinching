
// Packages
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Form, DatePicker, Switch, Icon, Select, InputNumber, Button } from 'antd'
import moment from 'moment';


// App
import { mealMachine } from '../../helpers/machines';

const { Option } = Select

const IndividualForm = ({ who, formData, setFormData }) => {
    return (
        <>
            <Form.Item label="Meal Type" style={{ marginBottom: "0" }}>
                <Select 
                    defaultValue="salad"
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], mealType: e } }) }
                >
                    <Option value="pizza">Pizza</Option>
                    <Option value="pasta">Pasta</Option>
                    <Option value="salad">Salad</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Menu Cost" style={{ marginBottom: "0" }}>
                <InputNumber 
                    min={ 0 } 
                    max={ 35 } 
                    defaultValue={ 28 }
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], menuCost: e } }) }
                />
            </Form.Item>
        </>
    )
}

const PageOne = () => {
    const [ current, send ] = useMachine( mealMachine );
    const [ formData, setFormData ] = useState( {
        date: moment( new Date().toLocaleDateString(), "DD-MM-YYYY" )._i ,
        katie: {
            active: true,
            mealType: 'salad',
            menuCost: 28,
        },
        chris: {
            active: true,
            mealType: 'salad',
            menuCost: 28,
        },
        shared: true,
    } )

    const handleSubmit = e => {
        e.preventDefault();
        console.log( formData )
    }

    return (
       <Form onSubmit={ handleSubmit } layout="horizontal">
           <Form.Item label="Date" style={{ marginBottom: "0.5em" }}>
                <DatePicker 
                    format="DD-MM-YYYY" 
                    defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
                    onChange={ e => setFormData({ ...formData, date: e._d.toLocaleDateString() }) }
                />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0.5em" }}>
                <Switch
                    checkedChildren="Katie"
                    unCheckedChildren="No Katie"
                    defaultChecked
                    onChange={ e => setFormData({ ...formData, katie: { ...formData.katie, active: e } }) }
                />
                { formData.katie.active && <IndividualForm who="katie" setFormData={ setFormData } formData={ formData } /> }
            </Form.Item>


            <Form.Item style={{ marginBottom: "0.5em" }}>
                <Switch
                    checkedChildren="Chris"
                    unCheckedChildren="No Chris"
                    defaultChecked
                    onChange={ e => setFormData({ ...formData, chris: { ...formData.chris, active: e } }) }
                />
                { formData.chris.active && <IndividualForm who="chris" setFormData={ setFormData } formData={ formData }  /> }
            </Form.Item>

            
            <Form.Item style={{ marginBottom: "0.5em" }}>
                <Switch
                    checkedChildren="Shared"
                    unCheckedChildren="Individual"
                    defaultChecked
                    onChange={ e=> setFormData({ ...formData, shared: e }) }
                />
            </Form.Item>

            <Button htmlType="submit" >Submit</Button>
       </Form>
    )
}

export default PageOne