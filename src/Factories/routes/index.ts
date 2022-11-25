import { Express, Router } from 'express'
import { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import generateDoc, { swagger } from '../doc'
import type { ObjectSchema } from 'yup'
import { validateFields } from '../middlewares/validadeFields'

interface IRoutesFactory {
	app: Express | Router
	group?: string
	prefix?: string
}

interface IRouterProp {
	path: string
	schema: ObjectSchema<any>
}

type RouterPath = string | IRouterProp

interface IGetMethod {
	method: string
	group: string
	app: Express | Router
	routerProps: RouterPath
	prefix: string
	handler: (req: Request, res: Response, next: NextFunction) => void
}

interface ICreateDoc {
	app: Express | Router
	path: string
	schema: ObjectSchema<any>
	group: string
	method: string
	prefix: string
}

const createDoc = ({ app, path, schema, group, method, prefix }: ICreateDoc) => {
	generateDoc(`${prefix ?? ''}${path}`, { schema, group, method })
}

const getMethod = ({ method, app, routerProps, handler, group, prefix }: IGetMethod) => {
	if (typeof routerProps === 'string') {
		createDoc({ app, path: routerProps, schema: null, group, method, prefix })
		return app[method](routerProps, handler)
	}

	const { path, schema } = routerProps

	const middlewares = [schema && validateFields(schema)].filter(Boolean)

	createDoc({ app, path, schema, group, method, prefix })

	return app[method](path, ...middlewares, handler)
}

export class RoutesFactory {
	app: Router
	group: string
	prefix: string

	constructor({ app, group, prefix }: IRoutesFactory) {
		this.app = app
		this.group = group
		this.prefix = prefix
	}

	public doc() {
		return this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
	}

	public get(routerProps: RouterPath, ...handler: any) {
		getMethod({
			method: 'get',
			app: this.app,
			routerProps,
			handler,
			prefix: this.prefix,
			group: this.group
		})
	}

	public post(routerProps: RouterPath, ...handler: any) {
		getMethod({
			method: 'post',
			app: this.app,
			routerProps,
			handler,
			prefix: this.prefix,
			group: this.group
		})
	}

	public delete(routerProps: RouterPath, ...handler: any) {
		getMethod({
			method: 'delete',
			app: this.app,
			routerProps,
			handler,
			prefix: this.prefix,
			group: this.group
		})
	}

	public put(routerProps: RouterPath, ...handler: any) {
		getMethod({
			method: 'put',
			app: this.app,
			routerProps,
			handler,
			prefix: this.prefix,
			group: this.group
		})
	}
}
