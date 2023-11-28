import { AxiosError } from 'axios';
import { ApiError } from '@/exceptions/ApiError';
export type IRegisterError = {
    codeCondition: (code: number) => boolean;
    error: {
        new (message?: string, code?: string, config?: any, request?: any, response?: any): ApiError;
    };
};
export declare class GenerateErrorService {
    error: AxiosError;
    response: any;
    constructor(error?: AxiosError);
    createError(errors: IRegisterError[]): AxiosError<unknown, any>;
}
//# sourceMappingURL=GenerateErrorService.d.ts.map