import { createApp } from 'vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import App from '@/App.vue'
import './sass/app.scss'
import {GenerateErrorService, ValidateError, ValidatePlugin} from '@/index'
import {PermissionError} from '@/exceptions/PermissionError'
import axios, {AxiosError, AxiosResponse} from 'axios'

const app = createApp(App)
app
	.use(BootstrapVue3)
	.use(ValidatePlugin, {
		registerError: [
			{codeCondition: (n) => n == 430, error: PermissionError}
		],
		axios: axios
	})
	.mount('#app')

// axios.interceptors.response.use(
// 	(response: AxiosResponse) => {
// 		return Promise.resolve(response)
// 	},
// 	(error: AxiosError) => {
// 		const e = new GenerateErrorService(error)
// 		return Promise.reject(
// 			e.createError([
// 				{ codeCondition: (n) => n == 422, error: ValidateError },
// 			])
// 		)
// 	}
// )

