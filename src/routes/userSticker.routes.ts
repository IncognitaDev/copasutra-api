import { Router } from 'express'
import { userStickerService } from '../services/userStickerService'

const userStickerRoutes = Router()

userStickerRoutes.get('/', userStickerService.index)
userStickerRoutes.post('/', userStickerService.create)
userStickerRoutes.get('/change', userStickerService.listChange)
userStickerRoutes.put('/change', userStickerService.realizeChange)
userStickerRoutes.get('/user/:id', userStickerService.listUserSticker)
userStickerRoutes.get('/:id', userStickerService.show)
userStickerRoutes.put('/:id', userStickerService.update)
userStickerRoutes.get('/raffle/:id', userStickerService.raffle)

export { userStickerRoutes }
