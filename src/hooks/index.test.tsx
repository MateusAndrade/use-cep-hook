import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useCep from './index';
import fetchCep from 'cep-promise';

vi.mock('cep-promise');

describe('useCep Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useCep(''));
    const [loading, cep, error] = result.current;

    expect(loading).toBe(false);
    expect(cep).toEqual({
      cep: '',
      state: '',
      city: '',
      street: '',
      neighborhood: '',
    });
    expect(error).toEqual({ hasError: false, message: '' });
  });

  it('should clean CEP input by removing non-digit characters', async () => {
    const mockResponse = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      service: 'viacep',
    };

    vi.mocked(fetchCep).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCep('01001-000'));

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });

    expect(fetchCep).toHaveBeenCalledWith('01001000');
    expect(result.current[1]).toEqual(mockResponse);
  });

  it('should fetch CEP data when valid CEP is provided', async () => {
    const mockResponse = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      service: 'viacep',
    };

    vi.mocked(fetchCep).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCep('01001000'));

    await waitFor(() => {
      expect(result.current[0]).toBe(true);
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });

    const [loading, cep, error] = result.current;

    expect(loading).toBe(false);
    expect(cep).toEqual(mockResponse);
    expect(error).toEqual({ hasError: false, message: '' });
    expect(fetchCep).toHaveBeenCalledWith('01001000');
  });

  it('should handle errors when CEP is invalid', async () => {
    const mockError = new Error('CEP not found');
    vi.mocked(fetchCep).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCep('99999999'));

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });

    const [loading, cep, error] = result.current;

    expect(loading).toBe(false);
    expect(cep).toEqual({
      cep: '',
      state: '',
      city: '',
      street: '',
      neighborhood: '',
    });
    expect(error.hasError).toBe(true);
    expect(error.message).toBeTruthy();
  });

  it('should not fetch when CEP length is less than 8', () => {
    renderHook(() => useCep('01001'));

    expect(fetchCep).not.toHaveBeenCalled();
  });

  it('should not fetch when CEP is empty', () => {
    renderHook(() => useCep(''));

    expect(fetchCep).not.toHaveBeenCalled();
  });

  it('should update when CEP changes', async () => {
    const mockResponse1 = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      service: 'viacep',
    };

    const mockResponse2 = {
      cep: '22041001',
      state: 'RJ',
      city: 'Rio de Janeiro',
      street: 'Avenida Atlântica',
      neighborhood: 'Copacabana',
      service: 'viacep',
    };

    vi.mocked(fetchCep).mockResolvedValueOnce(mockResponse1);

    const { result, rerender } = renderHook(
      ({ cep }) => useCep(cep),
      { initialProps: { cep: '01001000' } }
    );

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });

    expect(result.current[1]).toEqual(mockResponse1);

    // Change the CEP
    vi.mocked(fetchCep).mockResolvedValueOnce(mockResponse2);
    rerender({ cep: '22041001' });

    await waitFor(() => {
      expect(result.current[1]).toEqual(mockResponse2);
    });

    expect(fetchCep).toHaveBeenCalledTimes(2);
  });

  it('should handle numeric CEP input', async () => {
    const mockResponse = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      service: 'viacep',
    };

    vi.mocked(fetchCep).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCep(1001000));

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });

    expect(fetchCep).not.toHaveBeenCalled();
  });

  it('should reset error state when new search starts', async () => {
    const mockError = new Error('CEP not found');
    vi.mocked(fetchCep).mockRejectedValueOnce(mockError);

    const { result, rerender } = renderHook(
      ({ cep }) => useCep(cep),
      { initialProps: { cep: '99999999' } }
    );

    await waitFor(() => {
      expect(result.current[2].hasError).toBe(true);
    });

    const mockResponse = {
      cep: '01001000',
      state: 'SP',
      city: 'São Paulo',
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      service: 'viacep',
    };

    vi.mocked(fetchCep).mockResolvedValueOnce(mockResponse);
    rerender({ cep: '01001000' });

    await waitFor(() => {
      expect(result.current[2].hasError).toBe(false);
    });

    expect(result.current[1]).toEqual(mockResponse);
  });
});
