import { AxiosError } from 'axios'
import { ApiError } from '@/exceptions/ApiError'

export type IRegisterError = {
  codeCondition: (code: number) => boolean
  error: {
    new (
      message?: string,
      code?: string,
      config?: any,
      request?: any,
      response?: any
    ): ApiError
  }
}

export class GenerateErrorService {
  error: AxiosError = new AxiosError()
  response: any = null

  constructor(error?: AxiosError) {
    if (!error) return
    this.error = error
    this.response = error.response
  }

  createError(errors: IRegisterError[]) {
    const e = errors
      .filter((x) => x.codeCondition(this.response.status))
      .map(
        (x) =>
          new x.error(
            this.error.message,
            this.error.code,
            this.error.config,
            this.error.request,
            this.error.response
          )
      )

    if (e.length) {
      return e[0]
    }
    return this.error
  }
}
