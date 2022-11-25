export const socketEvents = {
	session: {
		begin: 'SESSION:BEGIN',
		begun: 'SESSION:BEGUN'
	},
	any: {
		session: {
			watch: 'ANY:SESSION:WATCH',
			begun: 'ANY:SESSION:BEGUN',
			ended: 'ANY:SESSION:ENDED',
			error: 'ANY:SESSION:WATCH:ERROR'
		}
	}
}
