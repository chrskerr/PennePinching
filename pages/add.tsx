
import React, { useState } from "react";

import PageOne from "../components/Add/PageOne";
import Success from "../components/Add/Success";

function Add () {
	const [ page, setPage ] = useState<'pageone' | 'success'>( 'pageone' );

	return(
		<>
			{ page === "pageone" && <PageOne goToSuccess={ () => setPage('success') } /> }
			{ page === "success" && <Success returnToPageOne={ () => setPage('pageone') } /> }
		</>
	);
};

export default Add;