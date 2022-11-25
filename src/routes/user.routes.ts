import { Router } from 'express'
import { ensurePermission } from '../middlewares/ensurePermission'
import { userService } from '../services/userService'

const userRoutes = Router()

userRoutes.get('/', userService.index)
userRoutes.post('/', userService.create)
userRoutes.put('/addPackage/:id', userService.addPackage)
userRoutes.get('/me', userService.showWhoAmI)
userRoutes.get('/:id', userService.show)
userRoutes.put('/:id', ensurePermission('admin', true), userService.update)

export { userRoutes }
