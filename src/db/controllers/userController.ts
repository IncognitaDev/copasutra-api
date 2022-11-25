import { User, UserModelInterface } from '../Models/userModel'

import { Controller } from './abstract'

export const userController = new Controller<UserModelInterface>(User)

export type userControllerType = typeof userController
