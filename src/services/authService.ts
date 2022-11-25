import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

import { userController } from '../db/controllers/userController'
import { UserInterface, UserModelInterface } from '../db/Models/userModel'
import { Person } from '../types/google'

export const authService = {
	redirect: (req: Request, res: Response) => {
		const oAuth2Client = new OAuth2Client(
			process.env.LOGS_CLIENT_ID,
			process.env.LOGS_CLIENT_SECRET,
			`${process.env.LOGS_URL_HOST}/auth/callback`
		)

		const authorizeURL = oAuth2Client.generateAuthUrl({
			prompt: 'consent',
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
			]
		})

		return res.redirect(authorizeURL)
	},

	callback: async (req: Request, res: Response) => {
		const { code } = req.query

		const oAuth2Client = new OAuth2Client(
			process.env.LOGS_CLIENT_ID,
			process.env.LOGS_CLIENT_SECRET,
			`${process.env.LOGS_URL_HOST}/auth/callback`
		)

		const { tokens } = await oAuth2Client.getToken(code as string)
		oAuth2Client.setCredentials(tokens)
		const url =
			'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos'
		const { data }: { data: Person } = await oAuth2Client.request({ url })

		const userData = {
			email: data.emailAddresses[0].value,
			name: data.names[0].displayName
		} as UserInterface

		let user: UserModelInterface | null

		user = await userController.show({ email: userData.email })

		if (!user) {
			user = await userController.create({
				...userData
			})
		} else {
			await userController.update({ email: userData.email })
		}

		const token = jwt.sign({ userId: user._id }, process.env.LOGS_SECRET, {
			expiresIn: 1000 * 60 * 60 * 24 * 7 // 7 days
		})

		res.redirect(`${process.env.LOGS_AUTH_FRONT_CALLBACK}?token=${token}`)
	}
}
