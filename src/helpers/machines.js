
// Packages
import { Machine, interpret } from 'xstate';


export const homeMachine = new Machine({
	id: "home",
	initial: "addmeal",
	states: {
		addmeal: {
			on: { ANALYSE: 'analyse' },
		},
		analyse: {
			on: { ADDMEAL: 'addmeal' },
		},
	},
});
interpret( homeMachine ).start();


export const mealMachine = new Machine({
    id: "meals",
    initial: "pageOne",
    states: {
        pageOne: {
			on: { SUCCESS: 'pageTwo' },
		},
		pageTwo: {
			on: { SUCCESS: 'success' },
		},
		success: {},
    },
})
interpret( mealMachine ).start();