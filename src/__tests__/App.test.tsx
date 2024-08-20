import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App/App'; // Adjust the import path as necessary

describe('App component', () => {
  test('renders Vite and React logos', () => {
    render(<App />);

    const viteLogo = screen.getByAltText('Vite logo');
    const reactLogo = screen.getByAltText('React logo');

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test('increments count when button is clicked', () => {
    render(<App />);

    const countButton = screen.getByRole('button')
    fireEvent.click(countButton);

    expect(screen.getByText(/count is\s1/)).toBeInTheDocument();
  });

  test('renders links to Vite and React websites', () => {
    render(<App />);

    const viteLink = screen.getByRole('link', { name: /vite/i });
    const reactLink = screen.getByRole('link', { name: /react/i });

    expect(viteLink).toBeInTheDocument();
    expect(reactLink).toBeInTheDocument();
  });
});