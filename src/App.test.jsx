import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';
import { contactEmail, navItems, translations } from './content.js';

const bannedClaims = /millions of players|top grossing|already shipped|global hit|market-leading publisher|proven hitmaker/i;

test('content data keeps the official support email', () => {
  expect(contactEmail).toBe('support@lumio.games');
});

test('content data includes the expected navigation anchors', () => {
  expect(navItems.map((item) => item.href)).toEqual(['#home', '#services', '#games', '#publishing', '#about', '#contact']);
});

test('content avoids fake scale claims', () => {
  expect(JSON.stringify(translations)).not.toMatch(bannedClaims);
});

test('renders the Lumio homepage shell', () => {
  render(<App />);

  expect(screen.getByText('LumioGames')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Original games, global players/i })).toBeInTheDocument();
});

test('switches key visible copy to Chinese', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: '中文' }));

  expect(screen.getByRole('heading', { name: /原创游戏，走向全球玩家/i })).toBeInTheDocument();
  expect(screen.getByText(/美国独立游戏创业公司/i)).toBeInTheDocument();
});

test('renders six service cards', () => {
  render(<App />);

  expect(within(screen.getByTestId('services-grid')).getAllByTestId('service-card')).toHaveLength(6);
});

test('uses support email for contact and subscription fallback', () => {
  render(<App />);

  expect(screen.getByTestId('primary-contact')).toHaveAttribute('href', `mailto:${contactEmail}`);
  expect(screen.getByTestId('subscribe-form')).toHaveAttribute('action', `mailto:${contactEmail}`);
  expect(screen.getByText(contactEmail)).toBeInTheDocument();
});
