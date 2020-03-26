import { useState, useEffect, useMemo, useCallback } from "react";

import fetchCep from "cep-promise";

const INITIAL_CEP = {
  cep: "",
  state: "",
  city: "",
  street: "",
  neighborhood: ""
};

const useCep = search => {
  const cleanCep = useMemo(() => search && search.replace(/\D+/g, ""), [
    search
  ]);

  const [loading, setLoading] = useState(false);

  const [cep, setCep] = useState(INITIAL_CEP);

  const [error, setError] = useState({ hasError: false, message: "" });

  const searchCep = useCallback(async () => {
    setLoading(true);
    setError({ hasError: false, message: "" });

    try {
      const response = await fetchCep(cleanCep);

      setCep(response);

      setLoading(false);
    } catch (error) {
      const message = error instanceof Object ? String(error) : error;

      setCep(INITIAL_CEP);
      setError({ hasError: true, message });
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

export default useCep;
