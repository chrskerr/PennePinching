
// Packages
import React from "react";
import { Row, Spin } from "antd";



const CenteredSpin = () => {
	return (
		<Row style={{ flexGrow: "1", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Spin size="large" />
		</Row>
	);
};

export default CenteredSpin;