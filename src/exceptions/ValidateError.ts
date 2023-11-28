import { AxiosResponse } from 'axios'
import { IIndexable } from '@/interfaces/IIndexable'
import { ApiError } from '@/exceptions/ApiError'

export class ValidateError extends ApiError {
	enableAutoError = false
	errors?: IIndexable
	response?: AxiosResponse<{ errors: IIndexable; message: string }>

	constructor(
		message?: string,
		code?: string,
		config?: any,
		request?: any,
		response?: AxiosResponse<{ errors: IIndexable; message: string }>
	) {
		super(message, code, config, request, response)

		this.errors = response?.data.errors
		this.response = response
	}

	hasError(field: string = '') {
		if (!this.response) return false

		if (!field) {
			return !!this.response.data.message
		}

		return !!this.getErrorMessage(field)
	}

	getErrorMessage(field: string = '') {
		if (!this.errors) return null

		if (!field) {
			return this.response?.data.message
		}

		if (this.errors[field]) {
			return this.errors[field].join(`\n`) || null
		}
	}

	getMessages() {
		if (this.hasError()) {
			return Object.keys(this.errors ?? {})
				.map((x) => this.errors![x])
				.join(`\n`)
		}

		return this.response?.data.message
	}
}
