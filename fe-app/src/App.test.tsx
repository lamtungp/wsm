import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders project', () => {
  render(<App />);
  // const linkElement = screen.getByText('Login');
  // expect(linkElement).toBeInTheDocument();
});
