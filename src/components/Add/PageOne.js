
// Packages
import React, { useState } from 'react';
import { Row, Col, Form, DatePicker, Switch, Select, Slider, Button, Typography } from 'antd'
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';

// App
import { INSERT_MEALS } from '../../helpers/apolloMutations'

const { Title, Text } = Typography;
const { Option } = Select


const PageOne = ({ confirmSave }) => {
    const [ insert_meals, { loading } ] = useMutation( INSERT_MEALS );
    const [ error, setError ] = useState( false )
    const [ formData, setFormData ] = useState( {
        date: moment( new Date().toLocaleDateString(), "DD-MM-YYYY" )._i ,
        katie: {
            active: true,
            mealType: '',
            menuCost: 0,
        },
        chris: {
            active: true,
            mealType: '',
            menuCost: 0,
        },
        shared: true,
        testing: true,
    } )

    const handleSubmit = async e => {
        e.preventDefault();
        setError( false );

        const { date, shared, katie, chris, testing } = formData
        const output = [];
        if ( katie.active ) {
            if ( ( shared && !chris.active ) || !katie.mealType || !katie.menuCost ) {
                setError( true );
                return
            }
            output.push({
                meal_category: katie.mealType, 
                menu_cost: katie.menuCost, 
                shared: shared, 
                who: "Katie", 
                date: date,
                testing: testing,
            })
        }
        if ( chris.active ) {
            if ( ( shared && !katie.active ) || !chris.mealType || !chris.menuCost ) {
                setError( true );
                return
            }
            output.push({
                meal_category: chris.mealType, 
                menu_cost: chris.menuCost, 
                shared: shared, 
                who: "Chris", 
                date: date,
                testing: testing,
            })
        }

        if ( output.length ) {
            const res = await insert_meals({ variables: {data: output }});
            try {
                confirmSave( res.data.insert_meals.returning );
            }
            catch {
                setError( true );
            }
        }
    }

    return (
        <Row>
            <Col>
                <Title level={ 4 }>Add a New Meal</Title>
                { error && <Text type="danger" >Something went wrong, are you missing a field or shared while alone?</Text>}
                <Form onSubmit={ handleSubmit } labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} labelAlign="left">
                    <Form.Item label="Date" style={{ marginBottom: "0.5em" }}>
                        <DatePicker 
                            format="DD-MM-YYYY" 
                            defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
                            onChange={ e => setFormData({ ...formData, date: e._d.toLocaleDateString() }) }
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0.5em" }} >
                        <Switch
                            checkedChildren="Katie"
                            unCheckedChildren="Katie"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, katie: { ...formData.katie, active: e } }) }
                        />
                    </Form.Item>

                    { formData.katie.active && <IndividualForm who="katie" setFormData={ setFormData } formData={ formData } /> }

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Chris"
                            unCheckedChildren="Chris"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, chris: { ...formData.chris, active: e } }) }
                        />
                    </Form.Item>

                    { formData.chris.active && <IndividualForm who="chris" setFormData={ setFormData } formData={ formData }  /> }

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Shared"
                            unCheckedChildren="Shared"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, shared: e }) }
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Testing"
                            unCheckedChildren="Testing"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, testing: e }) }
                        />
                    </Form.Item>

                    <Button loading={ loading } icon={ loading ? "poweroff" : "right" } htmlType="submit" >Submit</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default PageOne


function IndividualForm({ who, formData, setFormData }) {
    return (
        <>
            <Form.Item label="Meal Type" style={{ marginBottom: "0" }}>
                <Select 
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], mealType: e } }) }
                >
                    <Option value="pizza">Pizza</Option>
                    <Option value="pasta">Pasta</Option>
                    <Option value="salad">Salad</Option>
                </Select>
            </Form.Item>

            <Form.Item label={ `Menu Cost: $${ formData[ who ].menuCost }` } style={{ marginBottom: "0" }}>
                <Slider 
                    min={ 20 } 
                    max={ 40 } 
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], menuCost: e } }) }
                />
            </Form.Item>
        </>
    )
}
