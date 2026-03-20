import { render, screen } from '@testing-library/react';

import { Space } from '@mariotzz/tzz-element';

describe('Space', () => {
  test('renders children', () => {
    render(
      <Space>
        <span>A</span>
        <span>B</span>
      </Space>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('renders with split separator', () => {
    render(
      <Space split={<span data-testid="sep">|</span>}>
        <span>A</span>
        <span>B</span>
      </Space>,
    );
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });

  test('Space.Compact renders children', () => {
    render(
      <Space.Compact>
        <button type="button">A</button>
        <button type="button">B</button>
      </Space.Compact>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
