import { AxiosResponse } from 'axios';
import { IIndexable } from '@/interfaces/IIndexable';
import { ApiError } from '@/exceptions/ApiError';
export declare class ValidateError extends ApiError {
    enableAutoError: boolean;
    errors?: IIndexable;
    response?: AxiosResponse<{
        errors: IIndexable;
        message: string;
    }>;
    constructor(message?: string, code?: string, config?: any, request?: any, response?: AxiosResponse<{
        errors: IIndexable;
        message: string;
    }>);
    hasError(field?: string): boolean;
    getErrorMessage(field?: string): any;
    getMessages(): string | undefined;
}
//# sourceMappingURL=ValidateError.d.ts.map