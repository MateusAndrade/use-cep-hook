declare module "use-via-cep" {
  export type Cep = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
  };

  export type HookReturn = [boolean, Cep, unknown];

  export function useViaCep(postalCode: string): HookReturn;
}
