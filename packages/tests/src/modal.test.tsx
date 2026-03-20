import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '@mariotzz/tzz-element';

describe('Modal', () => {
  test('does not render when closed', () => {
    render(
      <Modal open={false} title="Test">
        Content
      </Modal>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('renders when open', () => {
    render(
      <Modal open title="Test Modal">
        Content
      </Modal>,
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('has dialog role', () => {
    render(
      <Modal open title="Test">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('close button calls onCancel', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <Modal open title="Test" onCancel={onCancel}>
        Content
      </Modal>,
    );
    await user.click(screen.getByLabelText('Close'));
    expect(onCancel).toHaveBeenCalled();
  });
});
