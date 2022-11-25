import { Router } from 'express'
import { authService } from '../services/authService'

const authRoutes = Router()

authRoutes.get('/', authService.redirect)
authRoutes.get('/callback', authService.callback)

export { authRoutes }
