import * as yup from 'yup'

export const manualCreateSchema = yup.object().shape({
	project: yup.string().required(),
	session: yup
		.object({
			user: yup.string().required(),
			type: yup.string().required(),
			ticketNumber: yup.string(),
			createdAt: yup.date(),
			closedAt: yup.date()
		})
		.required()
})
