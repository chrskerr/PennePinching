
// Packages
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Row, Col, Form, DatePicker, Switch, Select, InputNumber, Button } from 'antd'
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';

// App
import { mealMachine } from '../../helpers/machines';
import { INSERT_MEALS } from '../../helpers/apolloMutations'


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
    const [ , send ] = useMachine( mealMachine );
    const [ insert_meals, { error, loading } ] = useMutation( INSERT_MEALS );
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

    const handleSubmit = async e => {
        e.preventDefault();
        const output = [];
        if ( formData.katie ) {
            output.push({
                meal_category: formData.katie.mealType, 
                menu_cost: formData.katie.menuCost, 
                shared: formData.shared, 
                who: "Katie", 
                date: formData.date,
            })
        }
        if ( formData.chris ) {
            output.push({
                meal_category: formData.chris.mealType, 
                menu_cost: formData.chris.menuCost, 
                shared: formData.shared, 
                who: "Chris", 
                date: formData.date,
            })
        }

        const res = await insert_meals({ variables: {data: output }});
        if ( res ) {
            send( "SUCCESS" );
        }
    }

    return (
        <Row>
            <Col>
                <Form onSubmit={ handleSubmit } labelCol={{ span: 0 }} wrapperCol={{ span: 14 }}>
                    <Form.Item label="Date" style={{ marginBottom: "0.5em" }} labelAlign="left">
                        <DatePicker 
                            format="DD-MM-YYYY" 
                            defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
                            onChange={ e => setFormData({ ...formData, date: e._d.toLocaleDateString() }) }
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0.5em" }} >
                        <Switch
                            checkedChildren="Katie"
                            unCheckedChildren="No Katie"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, katie: { ...formData.katie, active: e } }) }
                        />
                    </Form.Item>

                    { formData.katie.active && <IndividualForm who="katie" setFormData={ setFormData } formData={ formData } /> }

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Chris"
                            unCheckedChildren="No Chris"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, chris: { ...formData.chris, active: e } }) }
                        />
                    </Form.Item>

                    { formData.chris.active && <IndividualForm who="chris" setFormData={ setFormData } formData={ formData }  /> }

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Shared"
                            unCheckedChildren="Individual"
                            defaultChecked
                            onChange={ e=> setFormData({ ...formData, shared: e }) }
                        />
                    </Form.Item>

                    <Button loading={ loading } icon={ loading ? "poweroff" : "right" } htmlType="submit" >Submit</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default PageOne