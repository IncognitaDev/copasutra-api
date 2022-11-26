import { Request, Response } from 'express'
import { userController } from '../db/controllers/userController'

export const userService = {
	async index(_req: Request, res: Response) {
		try {
			const users = await userController.index({})

			return res.status(200).json({ message: 'success', users })
		} catch (err) {
			return res.status(500).json({ message: 'unknown error' })
		}
	},

	async show(req: Request, res: Response) {
		const { id } = req.params

		const user = await userController.showById(id)

		if (!user) return res.status(404).json({ message: 'User not found.' })

		return res.status(200).json(user)
	},

	async showWhoAmI(req: Request, res: Response) {
		const { userId } = req.body

		const user = await userController.showById(userId)

		if (!user) return res.status(404).json({ message: 'User not found.' })

		return res.status(200).json(user)
	},

	async create(req: Request, res: Response) {
		const userData = req.body

		try {
			const user = await userController.create(userData)

			return res.status(200).json(user)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	},

	async addPackage(req: Request, res: Response) {
		const { id } = req.params

		try {
			const user = await userController.showById(id)

			const updateUser = await userController.update({ _id: id }, { packages: user.packages + 1 })

			return res.status(200).json(updateUser)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	},

	async update(req: Request, res: Response) {
		const { id } = req.params
		const userUpdateData = req.body

		try {
			const user = await userController.update({ _id: id }, userUpdateData)

			return res.status(200).json(user)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	}
}
