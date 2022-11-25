import { permissionLevels } from '../mocks/permissionLevels'

export const permissionLevelMatches = (permission: string, targetPermission: string) => {
	const indexOfPermission = permissionLevels.indexOf(permission)
	const indexOfTargetPermission = permissionLevels.indexOf(targetPermission)

	return indexOfPermission >= indexOfTargetPermission
}
