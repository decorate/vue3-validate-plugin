import {
  InjectionKey,
  provide,
  inject,
  ref,
  Ref,
  computed,
  ComputedRef,
} from 'vue'
import { ValidateError } from '@/exceptions/ValidateError'

export const ValidateKey: InjectionKey<ValidateContext> =
  Symbol('ValidateContext')

interface ValidateContext {
  validError: Readonly<Ref<ValidateError | undefined>>
  setValidError: (error: ValidateError) => void
  errorMessage: ComputedRef<string>
  validState: ComputedRef<boolean>
}

export function provideValidateContext() {
  const validError = ref<ValidateError>()

  const setValidError = (error: ValidateError) => {
    validError.value = error
  }

  const errorMessage = computed(() => {
    return ''
  })

  const validState = computed(() => {
    return false
  })
	
	return {
		validError,
		setValidError,
		errorMessage,
		validState
	}
  // provide(ValidateKey, {
  //   validError,
  //   setValidError,
  //   errorMessage,
  //   validState,
  // })
}

export function useValidate(field?: string) {
  const context = inject(ValidateKey)

  if (!context) {
    throw new Error()
  }

  const errorMessage = computed(() => {
    if (context.validError.value?.hasError(field)) {
      return context.validError.value?.getErrorMessage(field)
    }
    return ''
  })

  const validState = computed(() => {
    return context.validError.value?.hasError(field) ? false : null
  })

  const clearValidate = () => {
    context.setValidError(new ValidateError())
  }

  return {
    ...context,
    errorMessage,
    validState,
    clearValidate,
  }
}
