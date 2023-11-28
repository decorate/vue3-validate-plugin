import { ApiError } from '@team-decorate/validate-plugin'

export class PermissionError extends ApiError {
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
