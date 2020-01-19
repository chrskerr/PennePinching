
// Packages
import { Machine, interpret } from 'xstate';


export const homeMachine = new Machine({
	id: "home",
	initial: "analytics",
	states: {
		add: {
			on: { ANALYTICS: 'analytics' },
		},
		analytics: {
			on: { ADD: 'add' },
		},
	},
});
interpret( homeMachine ).start();


export const mealMachine = new Machine({
    id: "meals",
    initial: "pageone",
    states: {
        pageone: {
			on: { SUCCESS: 'success' },
		},
		success: {
			on: { RESTART: 'pageone' },
		},
    },
});
interpret( mealMachine ).start();


export const analyticsMachine = new Machine({
    id: "meals",
    initial: "history",
    states: {
        summary: {
			on: { PREVIOUS: 'split', NEXT: 'history' },
		},
		history: {
			on: { PREVIOUS: 'summary', NEXT: 'split' },
		},
		split: {
			on: { PREVIOUS: 'history', NEXT: 'summary' },
		},
    },
});
interpret( mealMachine ).start();