import { useState, useEffect, useMemo, useCallback } from "react";

import fetchCep from "cep-promise";

const INITIAL_CEP = {
  cep: "",
  state: "",
  city: "",
  street: "",
  neighborhood: ""
};

const useViaCep = search => {
  const cleanCep = useMemo(() => search && search.replace(/\D+/g, ""), [
    search
  ]);

  const [loading, setLoading] = useState(false);

  const [cep, setCep] = useState(INITIAL_CEP);

  const [error, setError] = useState(null);

  const searchCep = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCep(cleanCep);

      const responseJson = await response.json();

      const hasError = responseJson.erro;

      if (hasError) {
        throw new Error(`Cep not found`);
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
