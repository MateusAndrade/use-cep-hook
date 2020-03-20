import { useState, useEffect, useMemo, useCallback } from "react";

type Cep = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

const INITIAL_CEP = {
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
  unidade: "",
  ibge: "",
  gia: ""
};

const getViaCep = (cep: string) => `https://viacep.com.br/ws/${cep}/json`;

const useViaCep = (search: string) => {
  const cleanCep: string = useMemo(() => search && search.replace(/\D+/g, ""), [
    search
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [cep, setCep] = useState<Cep>(INITIAL_CEP);

  const [error, setError] = useState<unknown>(null);

  const searchCep = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(getViaCep(cleanCep));

      const responseJson = await response.json();

      setCep(responseJson);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setCep(INITIAL_CEP);
    }
  }, [cleanCep]);

  useEffect(() => {
    if (cleanCep.length === 8) {
      searchCep();
    }
  }, [cleanCep, searchCep]);

  return [loading, cep, error];
};

export default useViaCep;