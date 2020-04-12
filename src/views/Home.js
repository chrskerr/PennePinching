
// Packages
import React from "react";
import { DotChartOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Typography } from "antd";
import { useService } from "@xstate/react";


// App
import { navMachine } from "../helpers/machines";
import Add from "./Add";
import Analytics from "./Analytics";
import logo from "../components/Shared/logo.png";

const { Title } = Typography;

const Home = ({ setModal, authState, logOut }) => {
	const [ current, send ] = useService( navMachine );

	const onNavClick = ( key ) => {
		if ( key === "add" ) send( "ADD" );
		if ( key === "analytics" ) send( "ANALYTICS" );
		if ( key === "login" ) setModal( true );
		if ( key === "logout" ) logOut();
	};

	return (
		<Row style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: "1em" }}>
			<Row align='middle' type="flex" justifcation="start">
				<Col sm={{ span: 2, offset: 1 }} xs={{ span: 4, offset: 1 }} >
					<img src={ logo } style={{ width: "75%" }} alt="Site logo, knife and fork" />
				</Col>
				<Col sm={ 20 } xs={ 18 }>
					<Title style={{ marginBottom: "0" }}>Penne Pinching</Title>
				</Col>
			</Row>
                    
			<Row>
				<Menu selectedKeys={ Object.keys( current.value ) } mode="horizontal" onClick={ ({ key }) => onNavClick( key )}>
					<Menu.Item key="add">
						<PlusOutlined />Add
					</Menu.Item>
					<Menu.Item key="analytics">
						<DotChartOutlined />Analytics
					</Menu.Item>
					{ authState && <Menu.Item key="logout">Log out
					</Menu.Item> }
					{ !authState && <Menu.Item key="login">Log in
					</Menu.Item> }
				</Menu>
			</Row>
            
			<Row style={{ padding: "2em", flexGrow: "1", display: "flex", flexDirection: "column" }}>	
				{ current.matches( "add" ) && <Add authState={ authState } /> }
				{ current.matches( "analytics" ) && <Analytics authState={ authState } /> }
			</Row>
		</Row>
	);
};

export default Home;
