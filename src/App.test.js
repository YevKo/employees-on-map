import { render, screen } from '@testing-library/react';
import App from './App';

test('renders H1', () => {
  render(<App />);
  const h1Element = screen.getByText(/Exoveans/i);
  expect(h1Element).toBeInTheDocument();
});
