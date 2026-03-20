import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '@mariotzz/tzz-element';

describe('Input', () => {
  test('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('handles value change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(onChange).toHaveBeenCalled();
  });

  test('disabled input', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  test('renders prefix and suffix', () => {
    render(
      <Input
        prefix={<span data-testid="prefix">$</span>}
        suffix={<span data-testid="suffix">.00</span>}
      />,
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });
});
