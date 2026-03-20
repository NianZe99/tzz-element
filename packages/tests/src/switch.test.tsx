import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from '@mariotzz/tzz-element';

describe('Switch', () => {
  test('renders with role switch', () => {
    render(<Switch aria-label="toggle" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  test('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch onChange={onChange} aria-label="toggle" />);
    const sw = screen.getByRole('switch');

    await user.click(sw);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());

    await user.click(sw);
    expect(onChange).toHaveBeenCalledWith(false, expect.anything());
  });

  test('disabled prevents toggle', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch disabled onChange={onChange} aria-label="toggle" />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  test('aria-checked reflects state', () => {
    render(<Switch defaultChecked aria-label="toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});
