
import React, { useState, useContext } from "react";
import { CheckOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, DatePicker, Switch, Select, Button, Typography, Modal, Input, AutoComplete, Form } from "antd";
import moment from "moment";

import { useQuery, useMutation } from "@apollo/client";

import { InsertMealsDocument, InsertMenuItemDocument, GetMenuDocument, GetAllMealsDocument, GetMenuQuery } from 'types/graphql'
import CenteredSpin from "../Shared/CenteredSpin";
import { Auth } from "pages/_app";

const { Title, Text } = Typography;
const { Option, OptGroup } = Select;

interface FormData {
	date: string,
	katie: { menu_id: string },
	chris: { menu_id: string },
	shared: boolean,
	testing: boolean,
	isDinner: boolean,
	incidentals: 0 | null,
}

export default function PageOne ({ goToSuccess }: { goToSuccess: () => void } ) {
	const authState = useContext(Auth)

	const { data } = useQuery( GetMenuDocument );
	const [ insert_meals, { loading }] = useMutation( InsertMealsDocument );
	const [ insert_menu, { loading: menuInsertLoading }] = useMutation( InsertMenuItemDocument );

	const [ addMenuModal, setAddMenuModal ] = useState( false );
	const [ modalData, setModalData ] = useState({
		category: "",
		name: "",
		cost: 0,
	});
	const [ modalError, setModalError ] = useState<string>();

	const [ error, setError ] = useState( false );
	const [ formData, setFormData ] = useState<FormData>({
		date: moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ).toISOString() ,
		katie: { menu_id: "" },
		chris: { menu_id: "" },
		shared: true,
		testing: false,
		isDinner: true,
		incidentals: null,
	});

	const handleSubmit = async () => {
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
				await insert_meals({ variables: { data: output }, refetchQueries: [{ query: GetAllMealsDocument }]});
				goToSuccess();
			} catch ( err ) {
				setError( true );
			}
		}
	};

	const handleAddMenu = async () => {
		const { category, cost, name } = modalData;
		setModalError( undefined );

		if ( !category || !cost || !name ) {
			setModalError( "Fields missing" );
		} else {
			try {
				await insert_menu({ variables: { data: [ modalData ]}, refetchQueries: [{ query: GetMenuDocument }], awaitRefetchQueries: true });
				setAddMenuModal( false );
				setModalData({
					category: "",
					name: "",
					cost: 0,
				});
			}
			catch ( e ) {
				const err = e as { message: string }
				console.error( err?.message );
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
			<Col span={ 24 }>
				<Row justify='space-between'>
					<Col span={ 18 }>
						<Row justify="start">
							<Title level={ 4 }>Add a New Meal</Title>
						</Row>
					</Col>
					<Col span={ 6 }>
						<Row justify="end">
							<Button icon={<PlusOutlined />} onClick={ () => setAddMenuModal( true ) }>Menu</Button>
						</Row>
					</Col>
				</Row>
				
				{ error && <Text type="danger" >Something went wrong...</Text>}
				{ !authState.token && <Text type="warning" >Please log in to make any changes</Text>}
				
				<Form onFinish={ handleSubmit } labelAlign="left">
					<Form.Item label="Date" >
						<DatePicker 
							format="DD-MM-YYYY" 
							defaultValue={ moment( new Date().toLocaleDateString(), "DD-MM-YYYY" ) } 
							onChange={ e => setFormData({ ...formData, date: e?.date().toLocaleString() || "" }) }
						/>
					</Form.Item>

					<MenuItemSelecter who="katie" setFormData={ setFormData } formData={ formData } menu={ sortedMenu } menuCategories={ menuCategories } /> 
					<MenuItemSelecter who="chris" setFormData={ setFormData } formData={ formData } menu={ sortedMenu } menuCategories={ menuCategories } />

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

					<Button type="primary" disabled={ !authState } loading={ loading } icon={<RightOutlined />} htmlType="submit">Submit</Button>

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
				<Form onFinish={ handleAddMenu }>
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
							onChange={ e => setModalData({ ...modalData, cost: Number( e.target.value ) }) }
							value={ modalData.cost }
						/>
					</Form.Item>
					<Button type="primary" loading={ menuInsertLoading } icon={<CheckOutlined />} htmlType="submit" disabled={ !authState }>Submit</Button>

					{ modalError && <Row><Text type="danger">{ modalError }</Text></Row> }
				</Form>
			</Modal>


		</Row>
	);
};

interface MenuItemSelectorProps {
	who: 'katie' | 'chris',
	formData: FormData,
	setFormData: React.Dispatch<React.SetStateAction<FormData>>,
	menu: GetMenuQuery['menu'],
	menuCategories: string[],
}

function MenuItemSelecter({ who, formData, setFormData, menu, menuCategories }: MenuItemSelectorProps ) {
	return <>
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
	</>;
}
