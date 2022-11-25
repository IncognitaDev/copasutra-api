import { SessionModelInterface } from '../db/Models/sessionModel'
import { UserModelInterface } from '../db/Models/userModel'

export const getSessionsUsers = (sessions: SessionModelInterface[]): UserModelInterface[] => {
	const sessionsUsersIdsSet = sessions.reduce((acc, cur) => {
		acc.add(cur.user.id)

		return acc
	}, new Set())

	const users = Array.from(sessionsUsersIdsSet).map(
		(userId) => sessions.find((session) => session.user.id === userId).user
	)

	return users
}
