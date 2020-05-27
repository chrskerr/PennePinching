
// Packages
import React from "react";
import { Spin } from "antd";

const style = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: -1,
};

const CenteredSpin = () => {
	return (
		<div style={ style }>
			<Spin size="large" />
		</div>
	);
};

export default CenteredSpin;