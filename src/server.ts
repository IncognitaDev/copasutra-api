import express from 'express'

import cors from 'cors'

import 'express-async-errors'

import http from 'http'

import * as dotenv from 'dotenv'

import routes from './routes/index.routes'

import { startDatabase } from './db'

import { logSuccess } from './utils/log'

// import errorCatcher from './errors'

dotenv.config()

export const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

const server = http.createServer(app)

startDatabase()

const port = process.env.DEV_LOG_PORT || 3333

if (process.env.NODE_ENV !== 'test') {
	server.listen(port, () => {
		logSuccess('server', `started on port ${port} 😎`)
	})
}
