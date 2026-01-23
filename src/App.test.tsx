import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the CEP input field', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/000000-000/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the CEP label', () => {
    render(<App />);
    const labelElement = screen.getByText('CEP:', { selector: 'label' });
    expect(labelElement).toBeInTheDocument();
  });

  it('displays loading state initially as false', () => {
    render(<App />);
    const loadingElement = screen.getByText(/Loading: false/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays initial empty CEP data', () => {
    render(<App />);
    const cepElement = screen.getByText(/"cep":""/i);
    expect(cepElement).toBeInTheDocument();
  });

  it('displays error state initially as no error', () => {
    render(<App />);
    const errorElement = screen.getByText(/Error:/i);
    expect(errorElement).toBeInTheDocument();
  });
});
