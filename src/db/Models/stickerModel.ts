import mongoose, { Document, Types } from 'mongoose'

const stickerSchema = new mongoose.Schema(
	{
		number: { type: String, unique: true },
		legend: Boolean,
		name: String,
		img: String
	},
	{
		timestamps: { createdAt: true, updatedAt: false }
	}
)

export interface StickerInterface {
	number: string
	legend: boolean
	name: string
	img: string
}

export interface StickerModelInterface extends StickerInterface, Document {}

export const Sticker = mongoose.model<StickerModelInterface>('Sticker', stickerSchema)
