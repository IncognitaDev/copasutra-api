import { Request, Response } from 'express'
import { stickerController } from '../db/controllers/stickerController'
import { userController } from '../db/controllers/userController'
import { userStickerController } from '../db/controllers/userStickerController'

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const userStickerService = {
	async index(_req: Request, res: Response) {
		try {
			const stickers = await userStickerController.index({}, ['team'])

			return res.status(200).json({ message: 'success', stickers })
		} catch (err) {
			return res.status(500).json({ message: 'unknown error' })
		}
	},

	async show(req: Request, res: Response) {
		const { id } = req.params

		const sticker = await userStickerController.showById(id)

		if (!sticker) return res.status(404).json({ message: 'sticker not found.' })

		return res.status(200).json(sticker)
	},

	async showWhoAmI(req: Request, res: Response) {
		const { stickerId } = req.body

		const sticker = await userStickerController.showById(stickerId)

		if (!sticker) return res.status(404).json({ message: 'sticker not found.' })

		return res.status(200).json(sticker)
	},

	async update(req: Request, res: Response) {
		const { id } = req.params
		const stickerUpdateData = req.body

		try {
			const sticker = await userStickerController.update({ _id: id }, stickerUpdateData)

			return res.status(200).json(sticker)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	},

	async raffle(req: Request, res: Response) {
		const { id: userId } = req.params

		try {
			const user = await userController.showById(userId)

			if (user.packages <= 0) {
				return res.status(500).json({ message: 'Unknown error.' })
			}

			await userController.update({ _id: userId }, { packages: user.packages - 1 })

			const possibleStickers = await stickerController.index()

			const legend = possibleStickers.filter((sticker: any) => sticker.legend)
			const comum = possibleStickers.filter((sticker: any) => !sticker.legend)

			const stickerProbability = []

			for (let i = 0; i < 5; i++) {
				stickerProbability.push(...comum)
			}

			stickerProbability.push(...legend)

			const prized = []

			for (let i = 0; i < 3; i++) {
				let prize
				const stickerPrize =
					stickerProbability[randomIntFromInterval(0, stickerProbability.length - 1)]
				const alreadyHas = await userStickerController.show({
					user: userId,
					sticker: stickerPrize._id
				})

				if (alreadyHas) {
					prize = await userStickerController.update(
						{ user: userId, sticker: stickerPrize._id },
						{ quantity: alreadyHas.quantity + 1 }
					)
				} else {
					prize = await userStickerController.create({
						user: userId,
						sticker: stickerPrize._id,
						quantity: 1,
						sticky: false
					})
				}

				prized.push(prize)
			}

			return res.status(200).json(prized)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	},

	async create(req: Request, res: Response) {
		return res.status(200)
	},

	async listChange(req: Request, res: Response) {
		const changePossible = await userStickerController.show({ change: true, legend: false })

		if (!changePossible) return res.status(404).json({ message: 'stickers not found.' })

		return res.status(200).json(changePossible)
	},

	async realizeChange(req: Request, res: Response) {
		const { stickerId1, stickerId2 } = req.body

		try {
			const sticker1 = await userStickerController.showById(stickerId1)
			const sticker2 = await userStickerController.showById(stickerId2)
			const sticker = await userStickerController.update(
				{ _id: stickerId1 },
				{ user: sticker2.user }
			)

			await userStickerController.update({ _id: stickerId2 }, { user: sticker1.user })

			return res.status(200).json(sticker)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	}
}
