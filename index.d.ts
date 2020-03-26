declare module "use-cep-hook" {
  export type Cep = {
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
  };

  export type ErrorCep = { hasError: boolean, message: string };

  export type HookReturn = [boolean, Cep, ErrorCep];

  export default function(postalCode: string | number): HookReturn;
}
