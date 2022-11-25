import { Router } from 'express'
import { RoutesFactory } from '../Factories/routes'

// import { ensureAuth } from '../middlewares/ensureAuth'
import { authRoutes } from './auth.routes'
import { stickerRoutes } from './sticker.routes'
import { userRoutes } from './user.routes'
import { userStickerRoutes } from './userSticker.routes'

const routes = Router()
const factoryRoute = new RoutesFactory({ app: routes })

routes.get('/', (_req, res) => {
	return res.status(200).json({ message: 'Welcome to devlog API!' })
})

routes.use('/auth', authRoutes)
routes.use('/user', userRoutes)
routes.use('/sticker', stickerRoutes)
routes.use('/userSticker', userStickerRoutes)

factoryRoute.doc()

export default routes
