import { AxiosError, AxiosResponse } from 'axios'

export class ApiError extends AxiosError {
  response?: AxiosResponse<{ message: string }>
  enableAutoError = true

  constructor(
    message?: string,
    code?: string,
    config?: any,
    request?: any,
    response?: AxiosResponse<{ message: string }>
  ) {
    super(message, code, config, request, response)
    this.response = response
  }

  getMessage() {
    return this.response?.data.message
  }

  showError() {
    if (this.getMessage()) {
      alert(this.getMessage())
      return
    }
    alert(this.message)
  }
}
