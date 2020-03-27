import { useState, useEffect, useMemo, useCallback } from "react";

import fetchCep from "cep-promise";

export type Cep = {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
};

export type ErrorCep = { hasError: boolean, message: string };

export type HookReturn = [boolean, Cep, ErrorCep];

const INITIAL_CEP: Cep = {
  cep: "",
  state: "",
  city: "",
  street: "",
  neighborhood: ""
};

const useCep = (search: string | number): HookReturn => {
  const cleanCep: string = useMemo(() => String(search).replace(/\D+/g, ""), [
    search
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [cep, setCep] = useState<Cep>(INITIAL_CEP);

  const [error, setError] = useState<ErrorCep>({ hasError: false, message: "" });

  const searchCep = useCallback(async () => {
    setLoading(true);
    setError({ hasError: false, message: "" });

    try {
      const response = await fetchCep(cleanCep);

      setCep(response);

      setLoading(false);
    } catch (error) {
      const message: string = error instanceof Object ? String(error) : error;

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
