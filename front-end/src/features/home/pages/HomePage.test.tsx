import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

test('loads and displays greeting', async () => {
	// ARRANGE
	render(<HomePage />);

	// ACT
	// await userEvent.click(screen.getByText('Load Greeting'))
	// await screen.findByRole('heading')

	// ASSERT
	expect(screen.getByRole('heading')).toHaveTextContent('Left Panel');
	// expect(screen.getByRole('button')).toBeDisabled()
});
