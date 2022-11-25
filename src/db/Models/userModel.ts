import mongoose, { Document, Types } from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		packages: { type: Number, default: 0 }
	},
	{
		timestamps: { createdAt: true, updatedAt: false }
	}
)

export interface UserInterface {
	email: string
	name: string
	packages: number
}

export interface UserModelInterface extends UserInterface, Document {}

export const User = mongoose.model<UserModelInterface>('User', userSchema)
