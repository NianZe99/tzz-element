import { render, screen } from '@testing-library/react';

import { Card } from '@mariotzz/tzz-element';

describe('Card', () => {
  test('renders title and children', () => {
    render(
      <Card title="My Card">
        <p>Card content</p>
      </Card>,
    );
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders extra content', () => {
    render(<Card title="Title" extra={<a href="#">More</a>} />);
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  test('renders Card.Meta', () => {
    render(
      <Card>
        <Card.Meta title="Meta Title" description="Description" />
      </Card>,
    );
    expect(screen.getByText('Meta Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('renders actions', () => {
    render(
      <Card
        actions={[<span key="edit">Edit</span>, <span key="del">Delete</span>]}
      >
        Content
      </Card>,
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('loading shows skeleton', () => {
    const { container } = render(<Card loading>Content</Card>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });
});
