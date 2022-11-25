import * as yup from 'yup'

export const projectCreateSchema = yup.object().shape({
	repoURL: yup.string(),
	name: yup.string().required(),
	obs: yup.string()
})
