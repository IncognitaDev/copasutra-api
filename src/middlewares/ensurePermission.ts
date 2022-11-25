import { NextFunction, Request, Response } from 'express'
import { userController } from '../db/controllers/userController'
import { permissionLevelMatches } from '../utils/permissionLevelMatches'

export const ensurePermission = (permissionLevel: string, publicToSameUser = false) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.body

		const user = await userController.showById(userId)

		if (publicToSameUser) {
			const { id } = req.params

			if (id === userId) return next()
		}

		if (!user?.permission || !permissionLevelMatches(user.permission, permissionLevel)) {
			return res.status(403).json({ message: 'User doesn`t have permission.' })
		}

		return next()
	}
}
