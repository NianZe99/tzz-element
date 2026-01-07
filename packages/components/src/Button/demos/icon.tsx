import { Button } from '@mariotzz/tzz-element';

const PlusIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default () => (
  <div
    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
  >
    <Button variant="primary" startIcon={PlusIcon}>
      Add
    </Button>
    <Button variant="secondary" endIcon={PlusIcon}>
      Next
    </Button>

    {/* icon-only：建议提供 aria-label */}
    <Button
      size="icon"
      variant="ghost"
      aria-label="Add item"
      startIcon={PlusIcon}
    />
  </div>
);
