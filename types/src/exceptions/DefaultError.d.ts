import { ApiError } from '@/exceptions/ApiError';
export declare class DefaultError extends ApiError {
    enableAutoError: boolean;
    constructor(message?: string, code?: string, config?: any, request?: any, response?: any);
}
//# sourceMappingURL=DefaultError.d.ts.map