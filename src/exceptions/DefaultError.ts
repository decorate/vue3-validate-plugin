import { ApiError } from '@/exceptions/ApiError'

export class DefaultError extends ApiError {
  enableAutoError = true

  constructor(
    message?: string,
    code?: string,
    config?: any,
    request?: any,
    response?: any
  ) {
    super(message, code, config, request, response)
  }
}
