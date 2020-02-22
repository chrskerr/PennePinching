
// Packages
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, DatePicker, Switch, Select, Button, Typography, Modal, Input, AutoComplete } from "antd";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useService } from "@xstate/react";


// App
import { navMachine } from "../../helpers/machines";
import { INSERT_MEALS, INSERT_MENU_ITEM } from "../../helpers/apolloMutations";
import { GET_MENU, GET_ALL_MEALS } from "../../helpers/apolloQueries";
import CenteredSpin from "../../components/Shared/CenteredSpin";


const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

const PageOne = ({ confirmSave, authState }) => {
	const [ , send ] = useService( navMachine );
	const { data } = useQuery( GET_MENU );
	const [ insert_meals, { loading }] = useMutation( INSERT_MEALS );
	const [ insert_menu, { loading: menuInsertLoading }] = useMutation( INSERT_MENU_ITEM );

	const [ addMenuModal, setAddMenuModal ] = useState( false );
	const [ modalData, setModalData ] = useState({
		category: "",
		name: "",
		cost: null,
	});
	const [ modalError, setModalError ] = useState( false );

	const [ error, setError ] = useState( false );
	const [ formData, setFormData ] = useState({
		date: moment( new Date().toLocaleDateString(), "DD-MM-YYYY" )._i ,
		katie: { menu_id: "" },
		chris: { menu_id: "" },
		shared: true,
		testing: false,
		isDinner: true,
		incidentals: null,
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setError( false );

		const { date, shared, katie, chris, testing, isDinner, incidentals } = formData;
        
		const updatedShared = ( katie.menu_id && !chris.menu_id ) || ( !katie.menu_id && chris.menu_id ) ? false : shared;
		const splitIncidentals = !incidentals ? 0 : 
			katie.menu_id && chris.menu_id ? incidentals / 2 : incidentals;
		// const date_eaten = moment( date, "DD-MM-YYYY" ).toDate();

		const output = [];
		if ( katie.menu_id ) {
			output.push({
				menu_id: katie.menu_id,
				shared: updatedShared, 
				who: "Katie", 
				date,
				// date_eaten,
				test: testing,
				isDinner,
				incidentals: splitIncidentals,
			});
		}
		if ( chris.menu_id ) {
			output.push({
				menu_id: chris.menu_id,  
				shared: updatedShared, 
				who: "Chris", 
				date,
				// date_eaten,
				test: testing,
				isDinner,
				incidentals: splitIncidentals,
			});
		}

		if ( output.length ) {
			try {
				const res = await insert_meals({ variables: { data: output }, refetchQueries: [{ query: GET_ALL_MEALS }]});
				confirmSave( res.data.insert_meals.returning );
				send( "SUCCESS" );
			} catch ( err ) {
				setError( true );
			}
		}
	};

	const handleAddMenu = async e => {
		e.preventDefault();

		const { category, cost, name } = modalData;
		setModalError( false );

		if ( !category || !cost || !name ) {
			setModalError( "Fields missing" );
		} else {
			try {
				await insert_menu({ variables: { data: [ modalData ]}, refetchQueries: [{ query: GET_MENU }], awaitRefetchQueries: true });
				setAddMenuModal( false );
				setModalData({
					category: "",
					name: "",
					cost: "",
				});
			}
			catch ( err ) {
				console.error( err.message );
				// setModalError( err )
			}
		}
	};

	if ( !data ) return <CenteredSpin />;

	const { menu } = data;
	const sortedMenu = menu.sort(( a, b ) => { return a.name < b.name ? -1 : 1; });
	const menuCategories = [ ...new Set( menu.map( menu_item => menu_item.category )) ].sort();

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
					<Form.Item label="Date" >
						<DatePicker 
							format="DD-MM-YYYY" 
							defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
							onChange={ e => setFormData({ ...formData, date: e._d.toLocaleDateString() }) }
						/>
					</Form.Item>

					<MenuItemSelecter who="katie" setFormData={ setFormData } formData={ formData } menu={ sortedMenu } menuCategories={ menuCategories } /> 
					<MenuItemSelecter who="chris" setFormData={ setFormData } formData={ formData }  menu={ sortedMenu } menuCategories={ menuCategories } />

					{/* <Form.Item label="Incidentals">
						<Input 
							type='number'
							prefix="$"
							onChange={ e => setFormData({ ...formData, incidentals: e.target.value }) }
							value={ formData.incidentals }
						/>
					</Form.Item> */}

					<Row gutter={ 16 }>
						<Col xs={ 8 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
							<Form.Item >
								<Switch
									checkedChildren="Dinner"
									unCheckedChildren="Lunch"
									defaultChecked
									onChange={ e => setFormData({ ...formData, isDinner: e }) }
								/>
							</Form.Item>
						</Col>
						<Col xs={ 8 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
							<Form.Item >
								<Switch
									checkedChildren="Shared"
									unCheckedChildren="Shared"
									defaultChecked
									onChange={ e => setFormData({ ...formData, shared: e }) }
								/>
							</Form.Item>
						</Col>
					</Row>

					<Button type="primary" disabled={ !authState } loading={ loading } icon={ "right" } htmlType="submit">Submit</Button>

					<Form.Item style={{ marginTop: "2em" }}>
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
							autoFocus
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
							prefix="$"
							onChange={ e => setModalData({ ...modalData, cost: e.target.value }) }
							value={ modalData.cost }
						/>
					</Form.Item>
					<Button type="primary" loading={ menuInsertLoading } icon="check" htmlType="submit" disabled={ !authState }>Submit</Button>

					{ modalError && <Row><Text type="danger">{ modalError.message }</Text></Row> }
				</Form>
        	</Modal>


		</Row>
	);
};
PageOne.propTypes = {
	confirmSave: PropTypes.func,
	authState: PropTypes.any,
};

export default PageOne;


function MenuItemSelecter({ who, formData, setFormData, menu, menuCategories }) {
	return (
		<>
			<Form.Item label={ `What did ${ who.replace( /^(.)/, v => v.toUpperCase()) } order?` } colon={ false }>
				<Select 
					onChange={ e => setFormData({ ...formData, [ who ]: { ...formData[ who ], menu_id: e }}) }
					defaultValue="Did not eat"
				>
					<OptGroup key={ "groupNothing" } label='Did not eat'>
						<Option key={ "nothing" } value={ 0 }>Did not eat</Option>
					</OptGroup>
					{ menuCategories.map( category => {
						return (
							<OptGroup key={ category } label={ category }>
								{ menu.map( menuItem => {
									return (
										menuItem.category === category && menuItem.active &&
                                        <Option key={ menuItem.id } value={ menuItem.id }>{ menuItem.name } - ${ menuItem.cost }</Option>
									);
								})}
							</OptGroup>
						);
					}) }
				</Select>
			</Form.Item>
		</>
	);
}
