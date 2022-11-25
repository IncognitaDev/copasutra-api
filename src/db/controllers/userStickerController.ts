import { UserSticker, UserStickerModelInterface } from '../Models/userStickerModel'

import { Controller } from './abstract'

export const userStickerController = new Controller<UserStickerModelInterface>(UserSticker)

export type userStickerControllerType = typeof userStickerController
