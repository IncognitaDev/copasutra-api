import * as yup from 'yup'

export const sessionCreateSchema = yup.object().shape({
	socketId: yup.string(),
	status: yup.string().matches(/(open|closed)/, { excludeEmptyString: true }),
	user: yup.string().required(),
	store: yup.string().required(),
	type: yup.string().required(),
	ticketNumber: yup.string(),
	createdAt: yup.date(),
	closedAt: yup.date()
})
