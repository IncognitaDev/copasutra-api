import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { logInfo } from '../utils/log'

interface decodedBearerToken extends JwtPayload {
	userId: string
}

export const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers

	if (process.env.LOGS_IS_DEVELOPMENT && process.env.LOGS_DEV_USER_ID) {
		req.body.userId = process.env.LOGS_DEV_USER_ID

		return next()
	}

	if (!authorization) {
		return res.status(401).json({ message: 'Authorization header is missing.' })
	}

	if (!authorization.includes('Bearer ')) {
		return res.status(401).json({ message: 'JWT Token is missing.' })
	}

	const token = authorization.split(' ')[1]

	try {
		jwt.verify(token, process.env.LOGS_SECRET)
		const { userId } = jwt.decode(token) as decodedBearerToken

		req.body.userId = userId

		return next()
	} catch {
		return res.status(401).json({ message: 'JWT Token is not valid.' })
	}
}
