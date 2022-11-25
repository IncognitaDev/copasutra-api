import mongoose, { Document, Types } from 'mongoose'
import { StickerModelInterface } from './stickerModel'
import { UserModelInterface } from './userModel'

const userStickerSchema = new mongoose.Schema(
	{
		sticker: { type: mongoose.SchemaTypes.ObjectId, ref: 'Sticker' },
		quantity: Number,
		user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
		sticky: Boolean,
		change: Boolean
	},
	{
		timestamps: { createdAt: true, updatedAt: false }
	}
)

export interface UserStickerInterface {
	sticker: Types.ObjectId | StickerModelInterface
	quantity: number
	user: Types.ObjectId | UserModelInterface
	sticky: boolean
	change: boolean
}

export interface UserStickerModelInterface extends UserStickerInterface, Document {}

export const UserSticker = mongoose.model<UserStickerModelInterface>(
	'UserSticker',
	userStickerSchema
)
