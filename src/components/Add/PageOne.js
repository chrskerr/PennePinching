
// Packages
import React, { useState } from 'react';
import { Row, Col, Form, DatePicker, Switch, Select, Button, Typography, Modal, Input, AutoComplete } from 'antd'
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useService } from '@xstate/react';

// App
import { INSERT_MEALS, INSERT_MENU_ITEM } from '../../helpers/apolloMutations'
import { GET_MENU } from '../../helpers/apolloQueries'
import CenteredSpin from '../../components/Shared/CenteredSpin';


const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

const PageOne = ({ confirmSave, authState, addService }) => {
    const [ , send ] = useService( addService );
    const { data } = useQuery( GET_MENU );
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
        katie: { menu_id: '' },
        chris: { menu_id: '' },
        shared: true,
        testing: false,
    } )

    const handleSubmit = async e => {
        e.preventDefault();
        setError( false );

        const { date, shared, katie, chris, testing } = formData;
        
        let updatedShared = shared;
        if ( ( katie.menu_id && !chris.menu_id ) || ( !katie.menu_id && chris.menu_id ) ) updatedShared = false;

        const output = [];
        if ( katie.menu_id ) {
            output.push({
                menu_id: katie.menu_id,
                shared: updatedShared, 
                who: "Katie", 
                date: date,
                test: testing,
            })
        }
        if ( chris.menu_id ) {
            output.push({
                menu_id: chris.menu_id,  
                shared: updatedShared, 
                who: "Chris", 
                date: date,
                test: testing,
            })
        }

        if ( output.length ) {
            try {
                const res = await insert_meals({ variables: { data: output } });
                confirmSave( res.data.insert_meals.returning );
                send( "SUCCESS" );
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
				await insert_menu({ variables: { data: [ modalData ] }, refetchQueries: [{ query: GET_MENU }], awaitRefetchQueries: true });
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

    if ( !data ) return <CenteredSpin />

    const { menu } = data
    const menuCategories = [ ...new Set( menu.map( menu_item => menu_item.category )) ]

    return (
        <Row>
            <Col>
				<Row justify='space-between'>
					<Col span={ 18 }>
                        <Row  type="flex" justify="start">
                		    <Title level={ 4 }>Add a New Meal</Title>
                        </Row>
					</Col>
					<Col span={ 6 }>
                        <Row  type="flex" justify="end">
						    <Button icon="plus" onClick={ () => setAddMenuModal( true ) }>Menu</Button>
                        </Row>
					</Col>
				</Row>
                
				{ error && <Text type="danger" >Something went wrong...</Text>}
				{ !authState && <Text type="warning" >Please log in to make any changes</Text>}
                
				<Form onSubmit={ handleSubmit } labelAlign="left">
                    <Form.Item label="Date" style={{ marginBottom: "0.5em" }}>
                        <DatePicker 
                            format="DD-MM-YYYY" 
                            defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
                            onChange={ e => setFormData({ ...formData, date: e._d.toLocaleDateString() }) }
                        />
                    </Form.Item>

                    <IndividualForm who="katie" setFormData={ setFormData } formData={ formData } menu={ menu } menuCategories={ menuCategories } /> 

                    <IndividualForm who="chris" setFormData={ setFormData } formData={ formData }  menu={ menu } menuCategories={ menuCategories } />

                    <Form.Item style={{ marginBottom: "0.5em" }}>
                        <Switch
                            checkedChildren="Shared"
                            unCheckedChildren="Shared"
                            defaultChecked
                            onChange={ e => setFormData({ ...formData, shared: e }) }
                        />
                    </Form.Item>

                    <Button type="primary" disabled={ !authState } loading={ loading } icon={ "right" } htmlType="submit"  style={{ marginBottom: "1em" }}>Submit</Button>

                    <Form.Item>
                        <Switch
                            checkedChildren="Testing"
                            unCheckedChildren="Testing"
                            onChange={ e => setFormData({ ...formData, testing: e }) }
                        />
                    </Form.Item>

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
                            type='number'
							onChange={ e => setModalData({ ...modalData, cost: e.target.value }) }
							value={ modalData.cost }
						/>
					</Form.Item>
					<Button type="primary" loading={ menuInsertLoading } icon="check" htmlType="submit" disabled={ !authState }>Submit</Button>

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
            <Form.Item label={ `What did ${ who.replace( /^(.)/, v => v.toUpperCase()) } order?` } style={{ marginBottom: "0" }} colon={ false }>
                <Select 
                    onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], menu_id: e } }) }
                    defaultValue="Did not eat"
                >
                    <OptGroup key={ 'groupNothing' } label='Did not eat'>
                        <Option key={ 'nothing' } value={ 0 }>Did not eat</Option>
                    </OptGroup>
                    { menuCategories.map( category => {
                        return (
                            <OptGroup key={ category } label={ category }>
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
