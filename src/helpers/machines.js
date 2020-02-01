
// Packages
import { Machine, interpret } from "xstate";

export const navMachine = interpret( 
	new Machine({
		id: "home",
		initial: "analytics",
		states: {
			add: {
				on: { ANALYTICS: "analytics" },
				initial: "pageone",
				states: {
					pageone: {
						on: { SUCCESS: "success" },
					},
					success: {
						on: { RESTART: "pageone" },
					},
				},
			},
			analytics: {
				on: { ADD: "add" },
				initial: "summary",
				states: {
					summary: {
						on: { PREVIOUS: "meals", NEXT: "history" },
					},
					history: {
						on: { PREVIOUS: "summary", NEXT: "split" },
					},
					split: {
						on: { PREVIOUS: "history", NEXT: "weekdays" },
					},
					weekdays: {
						on: { PREVIOUS: "split", NEXT: "meals" },
					},
					meals: {
						on: { PREVIOUS: "weekdays", NEXT: "summary" },
					},
				},
			},
		},
	}),
).start();
