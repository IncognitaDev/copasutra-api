import { NextFunction, Request, Response } from 'express'

export const validateFields = (schema: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body

		await schema.validate(body, { abortEarly: false })

		next()
	}
}
