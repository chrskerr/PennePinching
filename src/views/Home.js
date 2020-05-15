
// Packages
import React, { useContext, useState } from "react";
import { DotChartOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Row, Col, Menu, Typography, Modal, Form, Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useService } from "@xstate/react";


// App
import { navMachine } from "../helpers/machines";
import Add from "./Add";
import Analytics from "./Analytics";
import logo from "../components/Shared/logo.png";
import { Auth } from "../helpers/services";

const { Title, Text } = Typography;

const Home = () => {
	const [ current, send ] = useService( navMachine );
	const [ modal, setModal ] = useState( false );
	const [ formData, setFormData ] = useState({});
	const [ loginError, setLoginError ] = useState();
	const [ loading, setLoading ] = useState( false );
	const { signIn, signOut, isAuthenticated } = useContext( Auth );    

	const onNavClick = ( key ) => {
		if ( key === "add" ) send( "ADD" );
		if ( key === "analytics" ) send( "ANALYTICS" );
		if ( key === "login" ) setModal( true );
		if ( key === "logout" ) signOut();
	};

	const handleLogin = async () => {
		setLoginError( false );
		const { email, password } = formData;
		try {	
			setLoading( true );
			await signIn( email, password );
			setModal( false );
		} 
		catch ( err ) {
			setLoginError( err );
			setFormData({ ...formData, password: "" });
		} 
		finally {
			setLoading( false );
		}
	};

	return (
		<>
			<Space direction="vertical" size="middle" style={{ width: "100%" }} >
				<Row align='middle' justify="start">
					<Col sm={{ span: 2, offset: 1 }} xs={{ span: 4, offset: 1 }} >
						<img src={ logo } style={{ width: "75%" }} alt="Site logo, knife and fork" />
					</Col>
					<Col sm={ 20 } xs={ 18 }>
						<Title style={{ marginBottom: "0" }}>Penne Pinching</Title>
					</Col>
				</Row>
                    
				<Row>
					<Col span={ 24 }>
						<Menu selectedKeys={ Object.keys( current.value ) } mode="horizontal" onClick={ ({ key }) => onNavClick( key )}>
							<Menu.Item key="add">
								<PlusOutlined />Add
							</Menu.Item>
							<Menu.Item key="analytics">
								<DotChartOutlined />Analytics
							</Menu.Item>
							{ isAuthenticated && <Menu.Item key="logout">Log out
							</Menu.Item> }
							{ !isAuthenticated && <Menu.Item key="login">Log in
							</Menu.Item> }
						</Menu>
					</Col>
				</Row>
            
				<Row justify="center">
					<Col span={ 20 }>
						{ current.matches( "add" ) && <Add authState={ isAuthenticated } /> }
						{ current.matches( "analytics" ) && <Analytics authState={ isAuthenticated } /> }
					</Col>
				</Row>
			</Space>
			<Modal
				title="Log In"
				visible={ modal }
				onCancel={ () => setModal( false ) }
				footer={ null }
			>
				<Form onFinish={ handleLogin }>
					<Form.Item label="Email">
						<Input 
							onChange={ e => setFormData({ ...formData, email: e.target.value }) }
							value={ formData.email }
							autoFocus
						/>
					</Form.Item>
					<Form.Item label="Password">
						<Input.Password 
							onChange={ e => setFormData({ ...formData, password: e.target.value }) }
							value={ formData.password }
						/>
					</Form.Item>
					<Button loading={ loading } icon={<CheckOutlined />} htmlType="submit">Submit</Button>
					{ loginError && <Row><Text type="danger">{ loginError.message }</Text></Row> }
				</Form>
			</Modal>
		</>
	);
};

export default Home;
