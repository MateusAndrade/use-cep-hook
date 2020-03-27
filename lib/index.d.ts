export declare type Cep = {
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
};
export declare type ErrorCep = {
    hasError: boolean;
    message: string;
};
export declare type HookReturn = [boolean, Cep, ErrorCep];
declare const useCep: (search: string | number) => HookReturn;
export default useCep;
