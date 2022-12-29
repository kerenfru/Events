import React from 'react';
import { render, screen } from '@testing-library/react';
import Chip from './Chip';

it('renders Chip component', () => {
  render(<Chip severity='low' />);
  expect(screen.getByText('LOW')).toBeInTheDocument();
});
