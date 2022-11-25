import { Router } from 'express'
import { ensurePermission } from '../middlewares/ensurePermission'
import { stickerService } from '../services/stickerService'

const stickerRoutes = Router()

stickerRoutes.get('/', stickerService.index)
stickerRoutes.post('/', stickerService.create)
stickerRoutes.get('/:id', stickerService.show)
stickerRoutes.put('/:id', ensurePermission('admin', true), stickerService.update)

export { stickerRoutes }
