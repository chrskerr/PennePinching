
// Packages
import React from "react";
import { DotChartOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Row, Col, Menu, Typography } from "antd";
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
		<Space direction="vertical" size="middle">
			<Row align='middle' justify="start">
				<Col sm={{ span: 2, offset: 1 }} xs={{ span: 4, offset: 1 }} >
					<img src={ logo } style={{ width: "75%" }} alt="Site logo, knife and fork" />
				</Col>
				<Col sm={ 20 } xs={ 18 }>
					<Title style={{ marginBottom: "0" }}>Penne Pinching</Title>
				</Col>
			</Row>
                    
			<Row>
				<Col>
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
				</Col>
			</Row>
            
			<Row justify="center">
				<Col span={ 20 }>
					{ current.matches( "add" ) && <Add authState={ authState } /> }
					{ current.matches( "analytics" ) && <Analytics authState={ authState } /> }
				</Col>
			</Row>
		</Space>
	);
};

export default Home;
