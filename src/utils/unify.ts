export const unifyArray = (arr: Array<any>): Array<any> => {
	const unique = arr.filter((value, index) => {
		const _value = JSON.stringify(value)
		return (
			index ===
			arr.findIndex((obj) => {
				return JSON.stringify(obj) === _value
			})
		)
	})

	return unique
}
