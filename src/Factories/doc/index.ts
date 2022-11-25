import { JsonObject } from 'swagger-ui-express'

interface ConfigDocProps {
	schema?: any
	group: string
	method: string
}

export let swagger: JsonObject = {
	openapi: '3.0.0',
	info: {
		title: 'Logs API Docs',
		description: 'Documentation of Logs API'
	},
	server: [
		{
			url: 'http://localhost:3333'
		}
	],
	paths: {}
}
const generateDoc = (route: string, config: ConfigDocProps) => {
	const { schema, group, method } = config

	const formattedFile = swagger

	const generateItem = (schema) => {
		//todo
	}

	const requestBody = schema
		? {
				content: {
					'application/json': {
						schema: {
							properties: [...Object.keys(schema.fields)].reduce((acc: any, item) => {
								const newItem = {
									...acc,
									[item]: {
										type: schema.fields[item].type,
										items:
											schema.fields[item].type === 'array'
												? {
														type: schema.fields[item].innerType.type
												  }
												: false
									}
								}

								if (!newItem[item].items) delete newItem[item].items
								return newItem
							}, {})
						}
					}
				}
		  }
		: {}

	const pathParams = route.match(/(\(\{(.*?)\})|(\:.[^\/]*)|(\:.*)/g) || []

	const parameters = pathParams.map((item) => {
		return {
			name: item.replace(/\:/, ''),
			in: 'path',
			required: true,
			type: 'string'
		}
	})

	const newMethod = {
		[method]: {
			tags: [group],
			requestBody: schema ? requestBody : {},
			parameters
		}
	}

	const newDoc = {
		...formattedFile,
		paths: {
			...formattedFile.paths,
			[route]: {
				...(formattedFile.paths[route] ?? {}),
				...newMethod
			}
		}
	}

	swagger = newDoc
}

export default generateDoc
