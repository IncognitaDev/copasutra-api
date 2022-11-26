import { Request, Response } from 'express'
import { stickerController } from '../db/controllers/stickerController'

export const stickerService = {
	async index(_req: Request, res: Response) {
		try {
			const stickers = await stickerController.index({})

			return res.status(200).json({ message: 'success', stickers })
		} catch (err) {
			return res.status(500).json({ message: 'unknown error' })
		}
	},

	async show(req: Request, res: Response) {
		const { id } = req.params

		const sticker = await stickerController.showById(id)

		if (!sticker) return res.status(404).json({ message: 'sticker not found.' })

		return res.status(200).json(sticker)
	},

	async update(req: Request, res: Response) {
		const { id } = req.params
		const stickerUpdateData = req.body

		try {
			const sticker = await stickerController.update({ _id: id }, stickerUpdateData)

			return res.status(200).json(sticker)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	},

	async create(req: Request, res: Response) {
		const stickerData = req.body

		try {
			const sticker = await stickerController.create(stickerData)

			return res.status(200).json(sticker)
		} catch {
			return res.status(500).json({ message: 'Unknown error.' })
		}
	}
}
