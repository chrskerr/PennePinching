
// Packages
import React from "react";
import { Row, Button, Result } from "antd";
import { useService } from "@xstate/react";

// App
import { navMachine } from "../../helpers/machines";

const Success = ( { restart, ids, addService, homeService } ) => {
	const [ , send ] = useService( navMachine );
	return (
		<Row align="middle">
			<Result
				status="success"
				title="Successfully Added!"
				extra={[
					<Button type="primary" key="console" onClick={ () => send( "ANALYTICS" ) } >
                        Go Analytics
					</Button>,
					<Button key="buy" onClick={ () => send( "RESTART" ) } >Add more</Button>,
				]}
			/>
		</Row>
	);
};

export default Success;