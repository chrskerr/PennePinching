
// Packages
import { Machine, interpret } from 'xstate';


export const homeMachine = new Machine({
	id: "home",
	initial: "addmeal",
	states: {
		addmeal: {
			on: {
				ANALYSE: 'analyse',
			},
		},
		analyse: {
			on: {
				ADDMEAL: 'addmeal'
			},
		},
	},
});
interpret( homeMachine ).start();


export const mealMachine = new Machine({
    id: "meals",
    initial: "initial",
    states: {
        initial: {},
		submittingInitial: {},
		errorInitial: {},
		secondPage: {},
		submittingSecondPage: {},
		errorSecondPage: {},
		success: {},
    },
})
interpret( mealMachine ).start();