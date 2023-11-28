import { AxiosError, AxiosResponse } from 'axios';
export declare class ApiError extends AxiosError {
    response?: AxiosResponse<{
        message: string;
    }>;
    enableAutoError: boolean;
    constructor(message?: string, code?: string, config?: any, request?: any, response?: AxiosResponse<{
        message: string;
    }>);
    getMessage(): string | undefined;
    showError(): void;
}
