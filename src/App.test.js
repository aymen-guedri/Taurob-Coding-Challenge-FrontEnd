import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders Mission List heading', () => {
  act(() => {
    render(<App />);
  });
  const headingElement = screen.getByText(/Mission List/i);
  expect(headingElement).toBeInTheDocument();
});