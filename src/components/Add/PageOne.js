
// Packages
import React, { useState } from 'react';
import { Row, Col, Form, DatePicker, Switch, Select, Button, Typography, Spin, Modal, Input, Icon, AutoComplete } from 'antd'
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/react-hooks';

// App
import { INSERT_MEALS, INSERT_MENU_ITEM } from '../../helpers/apolloMutations'
import { GET_MENU } from '../../helpers/apolloQueries'

const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

const PageOne = ({ confirmSave }) => {
    const { data: initialMenuData } = useQuery( GET_MENU, { pollInterval: 1000 } );
    const [ insert_meals, { loading } ] = useMutation( INSERT_MEALS );
    const [ insert_menu, { loading: menuInsertLoading } ] = useMutation( INSERT_MENU_ITEM );

	const [ addMenuModal, setAddMenuModal ] = useState( false );
	const [ modalData, setModalData ] = useState({
		category: '',
		name: '',
		cost: '',
	});
	const [ modalError, setModalError ] = useState( false );

    const [ error, setError ] = useState( false );
    const [ formData, setFormData ] = useState( {
        date: moment( new Date().toLocaleDateString(), "DD-MM-YYYY" )._i ,
        katie: {
            active: true,
            meal_id: '',
        },
        chris: {
            active: true,
            meal_id: '',
        },
        shared: true,
        testing: false,
    } )

    const handleSubmit = async e => {
        e.preventDefault();
        setError( false );

        const { date, shared, katie, chris, testing } = formData
        const output = [];
        if ( katie.active ) {
            if ( ( shared && !chris.active ) || !katie.menu_id ) {
                setError( true );
                return
            }
            output.push({
                menu_id: katie.menu_id,
                shared: shared, 
                who: "Katie", 
                date: date,
                test: testing,
            })
        }
        if ( chris.active ) {
            if ( ( shared && !katie.active ) || !chris.menu_id ) {
                setError( true );
                return
            }
            output.push({
                menu_id: chris.menu_id,  
                shared: shared, 
                who: "Chris", 
                date: date,
                test: testing,
            })
        }

        if ( output.length ) {
            const res = await insert_meals({ variables: { data: output } });
            try {
                confirmSave( res.data.insert_meals.returning );
            }
            catch {
                setError( true );
            }
        }
    }

	const handleAddMenu = async e => {
		e.preventDefault();

		const { category, cost, name } = modalData;
		setModalError( false );

		if ( !category || !cost || !name ) {
			setModalError( "Fields missing" )
		} else {
			try {
				await insert_menu({ variables: { data: [ modalData ] } });
				setAddMenuModal( false );
				setModalData({
					category: '',
					name: '',
					cost: '',
				})
			}
			catch ( err ) {
				console.error( err.message )
				// setModalError( err )
			}
		}
	};

    if ( !initialMenuData ) return <Spin />

    const { menu } = initialMenuData
    const menuCategories = [ ...new Set( menu.map( menu_item => menu_item.category )) ]

    return (
        <Row>
            <Col>
				<Row justify='space-between'>
					<Col span={ 23 }>
                		<Title level={ 4 }>Add a New Meal</Title>
					</Col>
					<Col span={ 1 }>
						<Icon type="setting" onClick={ () => setAddMenuModal( true ) } label="Add to menu"/>
					</Col>
				</Row>
                
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

                    { formData.katie.active && <IndividualForm who="katie" setFormData={ setFormData } formData={ formData } menu={ menu } menuCategories={ menuCategories } /> }

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Chris"
                            unCheckedChildren="Chris"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, chris: { ...formData.chris, active: e } }) }
                        />
                    </Form.Item>

                    { formData.chris.active && <IndividualForm who="chris" setFormData={ setFormData } formData={ formData }  menu={ menu } menuCategories={ menuCategories } /> }

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
                            onChange={ e => setFormData({ ...formData, testing: e }) }
                        />
                    </Form.Item>

                    <Button loading={ loading } icon={ loading ? "poweroff" : "right" } htmlType="submit" >Submit</Button>
                </Form>
            </Col>

			<Modal
				title="Add Menu Item"
				visible={ addMenuModal }
				onCancel={ () => setAddMenuModal( false ) }
				footer={ null }
			>
				<Form onSubmit={ e => handleAddMenu( e ) }>
					<Form.Item label="Category">
						<AutoComplete
							dataSource={ menuCategories }
							onChange={ val => setModalData({ ...modalData, category: val }) }
							value={ modalData.category }
						/>
					</Form.Item>
					<Form.Item label="Name">
						<Input 
							onChange={ e => setModalData({ ...modalData, name: e.target.value }) }
							value={ modalData.name }
						/>
					</Form.Item>
					<Form.Item label="Cost">
						<Input 
							onChange={ e => setModalData({ ...modalData, cost: e.target.value }) }
							value={ modalData.cost }
						/>
					</Form.Item>
					<Button loading={ menuInsertLoading } icon="check" htmlType="submit">Submit</Button>

					{ modalError && <Row><Text type="danger">{ modalError.message }</Text></Row> }
				</Form>
        	</Modal>


        </Row>
    )
}

export default PageOne


function IndividualForm({ who, formData, setFormData, menu, menuCategories }) {
    return (
        <>
            <Form.Item label="Menu Item" style={{ marginBottom: "0" }}>
                <Select 
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], menu_id: e } }) }
                >
                    { menuCategories.map( category => {
                        return (
							<OptGroup key={ category} label={ category }>
								{ menu.map( menuItem => {
									return (
										menuItem.category === category && menuItem.active &&
										<Option key={ menuItem.id } value={ menuItem.id }>{ menuItem.name } - ${ menuItem.cost }</Option>
									)
								})}
							</OptGroup>
						)
                    }) }
                </Select>
            </Form.Item>
        </>
    )
}


// mutation MyMutation {
//   __typename
//   insert_menu(objects: {category: "", cost: 10, name: ""}) {
//     returning {
//       id
//     }
//   }
// }

