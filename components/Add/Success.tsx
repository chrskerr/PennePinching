
import React from "react";
import { Row, Button, Result } from "antd";
import { useRouter } from "next/router";

function Success ({ returnToPageOne }: { returnToPageOne: () => void }) {
	const router = useRouter()

	return (
		<Row align="middle">
			<Result
				status="success"
				title="Successfully Added!"
				extra={[
					<Button type="primary" key="console" onClick={ () => router.push( "/" ) } >
                        Go Analytics
					</Button>,
					<Button key="buy" onClick={ () => returnToPageOne() } >Add more</Button>,
				]}
			/>
		</Row>
	);
};

export default Success;