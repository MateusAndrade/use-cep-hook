import { useState, useEffect, useMemo, useCallback } from "react";

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

const getViaCep = (cep) => `https://viacep.com.br/ws/${cep}/json`;

const useViaCep = (search) => {
  const cleanCep = useMemo(() => search && search.replace(/\D+/g, ""), [
    search
  ]);

  const [loading, setLoading] = useState(false);

  const [cep, setCep] = useState(INITIAL_CEP);

  const [error, setError] = useState(null);

  const searchCep = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(getViaCep(cleanCep));

      const responseJson = await response.json();

      const hasError = responseJson.erro;

      if (hasError) {
        throw new Error(`Cep: ${cep} not found`)
      }

      setCep(responseJson);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
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