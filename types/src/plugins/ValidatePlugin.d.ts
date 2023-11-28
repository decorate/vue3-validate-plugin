import { App } from 'vue';
import { AxiosStatic } from 'axios';
import { IRegisterError } from '@/services/GenerateErrorService';
type IValidateOption = {
    manual?: boolean;
    registerError?: IRegisterError[];
    axios?: AxiosStatic;
};
interface IValidatePlugin {
    install(app: App, options?: IValidateOption): any;
    attachAxiosInterceptor(options?: IValidateOption): void;
}
export declare const ValidatePlugin: IValidatePlugin;
export {};
//# sourceMappingURL=ValidatePlugin.d.ts.map