import mongoose, { AggregateOptions, FilterQuery, UpdateQuery } from 'mongoose'

export class Controller<T> {
	Model: mongoose.Model<T>

	constructor(model: mongoose.Model<T>) {
		this.Model = model
	}

	async create(data: T) {
		const newItem = new this.Model(data)

		await newItem.save()

		return newItem
	}

	async index(query?: FilterQuery<T>, populate: string[] = []) {
		const items = await this.Model.find(query).populate(populate)

		return items
	}

	async show(query: FilterQuery<T>, populate: string[] = [], options?: mongoose.QueryOptions) {
		const items = await this.Model.findOne(query, {}, options).populate(populate)

		return items
	}

	async showMany(query: FilterQuery<T> = {}, populate: string[] = []) {
		const items = await this.Model.find(query).populate(populate).exec()

		return items
	}

	async update(filter?: FilterQuery<T>, update?: UpdateQuery<T>) {
		const item = await this.Model.findOneAndUpdate(
			filter,
			{ ...update, updatedAt: new Date() },
			{ timestamps: false }
		).exec()

		return item
	}

	async updateMany(query: FilterQuery<T> = {}, update?: UpdateQuery<T>) {
		const item = await this.Model.updateMany(query, update)

		return item
	}

	async delete(query: FilterQuery<T> = {}) {
		await this.Model.deleteOne(query)
	}

	async deleteMany(query: FilterQuery<T> = {}) {
		await this.Model.deleteMany(query)
	}

	async showById(id: string, populate: string[] = []) {
		const item = await this.Model.findById(id).populate(populate).exec()

		return item
	}

	async aggregate(
		pipeline?: mongoose.PipelineStage[],
		options?: AggregateOptions,
		callback?: mongoose.Callback<any[]>
	) {
		const items = await this.Model.aggregate(pipeline, options, callback)

		return items
	}
}
