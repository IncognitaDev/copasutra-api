import { Sticker, StickerModelInterface } from '../Models/stickerModel'

import { Controller } from './abstract'

export const stickerController = new Controller<StickerModelInterface>(Sticker)

export type stickerControllerType = typeof stickerController
