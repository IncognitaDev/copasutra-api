import mongoose from 'mongoose'
import { logSuccess } from '../utils/log'

const startDatabase = () => {
	mongoose.connect(
		process.env.NODE_ENV === 'test'
			? process.env.TEST_DB_CONNECTION_URL
			: process.env.DB_CONNECTION_URL
	)

	const db = mongoose.connection

	db.on('error', console.error.bind(console, 'connection error: '))
	db.once('open', function () {
		logSuccess('server', 'database connected')
	})
}

export { startDatabase }
