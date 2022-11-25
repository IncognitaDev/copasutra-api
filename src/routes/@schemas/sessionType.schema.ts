import * as yup from 'yup'

export const sessionTypeCreateSchema = yup.object().shape({
	name: yup.string().required()
})
