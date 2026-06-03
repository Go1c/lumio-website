import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';

test('renders the Lumio homepage shell', () => {
  render(<App />);

  expect(screen.getByText('LumioGames')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Original games, global players/i })).toBeInTheDocument();
});
