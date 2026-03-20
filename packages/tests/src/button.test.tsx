import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button } from '@mariotzz/tzz-element';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  test('renders with type variants', () => {
    const { rerender } = render(<Button type="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-type', 'primary');

    rerender(<Button type="dashed">Dashed</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-type', 'dashed');
  });

  test('renders with size variants', () => {
    render(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'large');
  });

  test('defaults to htmlType="button" (should not submit forms)', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button>Save</Button>
      </form>,
    );

    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('htmlType="submit" should submit forms', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button htmlType="submit">Submit</Button>
      </form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('disabled prevents click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('loading sets aria-busy and prevents click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );

    const btn = screen.getByRole('button', { name: 'Saving' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('danger sets data-danger', () => {
    render(<Button danger>Delete</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-danger', 'true');
  });

  test('renders as <a> when href is provided', () => {
    render(<Button href="https://example.com">Link</Button>);
    const el = screen.getByRole('link', { name: 'Link' });
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', 'https://example.com');
  });

  test('asChild injects props and respects disabled', async () => {
    const user = userEvent.setup();
    const childClick = vi.fn();

    render(
      <Button asChild disabled>
        <a href="https://example.com" onClick={childClick}>
          Link
        </a>
      </Button>,
    );

    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');

    await user.click(link);
    expect(childClick).not.toHaveBeenCalled();
  });

  test('icon-only without aria-label warns in dev', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Button icon={<span aria-hidden="true">+</span>} />);

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
