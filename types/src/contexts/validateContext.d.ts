import { InjectionKey, Ref, ComputedRef } from 'vue';
import { ValidateError } from '@/exceptions/ValidateError';
export declare const ValidateKey: InjectionKey<ValidateContext>;
interface ValidateContext {
    validError: Readonly<Ref<ValidateError | undefined>>;
    setValidError: (error: ValidateError) => void;
    errorMessage: ComputedRef<string>;
    validState: ComputedRef<boolean>;
}
export declare function provideValidateContext(): {
    validError: Ref<ValidateError | undefined>;
    setValidError: (error: ValidateError) => void;
    errorMessage: ComputedRef<string>;
    validState: ComputedRef<boolean>;
};
export declare function useValidate(field?: string): {
    errorMessage: ComputedRef<any>;
    validState: ComputedRef<false | null>;
    clearValidate: () => void;
    validError: Readonly<Ref<ValidateError | undefined>>;
    setValidError: (error: ValidateError) => void;
};
export {};
//# sourceMappingURL=validateContext.d.ts.map