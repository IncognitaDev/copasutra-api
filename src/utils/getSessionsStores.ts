import { SessionModelInterface } from '../db/Models/sessionModel'
import { StoreModelInterface } from '../db/Models/storeModel'

export const getSessionsStores = (sessions: SessionModelInterface[]): StoreModelInterface[] => {
	const sessionsStoresIdSet = sessions.reduce((acc, cur) => {
		acc.add(cur.store.id)

		return acc
	}, new Set())

	const stores = Array.from(sessionsStoresIdSet).map(
		(storeId) => sessions.find((session) => session.store.id === storeId).store
	)

	return stores
}
