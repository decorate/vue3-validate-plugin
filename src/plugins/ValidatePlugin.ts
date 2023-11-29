import { App } from 'vue'
import {provideValidateContext, ValidateKey} from '@/contexts/validateContext'
import {AxiosError, AxiosResponse, AxiosStatic} from 'axios'
import {GenerateErrorService, IRegisterError} from '@/services/GenerateErrorService'
import {ValidateError} from '@/exceptions/ValidateError'
import {DefaultError} from '@/exceptions/DefaultError'

type IValidateOption = {
	manual?: boolean,
	registerError?: IRegisterError[],
	axios?: AxiosStatic
}

interface IValidatePlugin  {
	install(app: App, options?: IValidateOption): any
	attachAxiosInterceptor(options?: IValidateOption):void
}

export const ValidatePlugin: IValidatePlugin = {
	install(app, options) {
		if(!options?.manual) {
			app.provide(ValidateKey, provideValidateContext())
			this.attachAxiosInterceptor(options)
		}
	},
	attachAxiosInterceptor(options?: IValidateOption) {
		if(!options?.axios) {
			throw new Error('Pass axios to option. or set option.manual = true to provide it manually')
		}
		options?.axios?.interceptors.response.use(
			(response: AxiosResponse) => {
				return Promise.resolve(response)
			},
			(error: AxiosError) => {
				const e = new GenerateErrorService(error)
				
				const errors = new Set<IRegisterError>()
				errors.add(
					{ codeCondition: (n) => n == 422, error: ValidateError },
				)
				options?.registerError?.forEach(x => {
					errors.add(x)
				})
				errors.add(
					{ codeCondition: (n) => n != 422, error: DefaultError },
				)
				
				return Promise.reject(
					e.createError([...errors.values()])
				)
			}
		)
	}
}