declare module "use-cep-hook" {
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
