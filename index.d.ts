declare module "use-cep-hook" {
  export type Cep = {
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
  };

  export type HookReturn = [boolean, Cep, unknown];

  export default function(postalCode: string | number): HookReturn;
}
