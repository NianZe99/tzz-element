// 写一个冒烟测试
import { Button } from '@mariotzz/tzz-element';
import { render, screen } from '@testing-library/react';

test('library can be imported and Button renders', () => {
  render(<Button type="primary">Hello</Button>);
  expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
});
