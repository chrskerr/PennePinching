
// Packages
import React, { useState } from "react";
import { useService } from "@xstate/react";


// App
import { navMachine } from "../helpers/machines";
import PageOne from "../components/Add/PageOne";
import Success from "../components/Add/Success";


const Add = ( { authState } ) => {
	const [ current ] = useService( navMachine );
	const [ returnedIds, setReturnedIds ] = useState();

	return(
		<>
			{ current.matches( { add: "pageone" } ) && <PageOne confirmSave={ res => setReturnedIds( res ) } authState={ authState } /> }
			{ current.matches( { add: "success" } ) && <Success ids={ returnedIds } /> }
		</>
	);
};

export default Add;