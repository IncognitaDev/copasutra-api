import nodemailer from 'nodemailer'
import { Address } from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

interface SendEmailOptions {
	to: string | Address | (string | Address)[]
	from?: string | Address | (string | Address)
	replyTo: string
	text?: string
	subject: string
	html: string
}

export const sendEmail = ({
	to,
	from,
	replyTo,
	text,
	subject,
	html
}: SendEmailOptions): Promise<SMTPTransport.SentMessageInfo> => {
	const user = process.env.EMAIL_USER
	const pass = process.env.EMAIL_PASS
	const SMTP = 'smtp.umbler.com'

	const transporter = nodemailer.createTransport({
		host: SMTP,
		port: 587,
		auth: { user, pass }
	})

	return transporter.sendMail({
		// from: from ?? user,
		from: from ?? {
			name: 'PlusLab',
			address: user as string
		},
		to,
		replyTo,
		subject,
		text,
		html
	})
}
