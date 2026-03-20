import { render, screen } from '@testing-library/react';

import { Select } from '@mariotzz/tzz-element';

describe('Select', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ];

  test('renders with combobox role', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('shows placeholder', () => {
    render(<Select options={options} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  test('disabled prevents interaction', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toHaveAttribute('tabindex', '-1');
  });
});
