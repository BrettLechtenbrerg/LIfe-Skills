import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders life skills training app', () => {
  render(<App />);
  const academyTitle = screen.getByText(/PMMA Academy/i);
  expect(academyTitle).toBeInTheDocument();
});
