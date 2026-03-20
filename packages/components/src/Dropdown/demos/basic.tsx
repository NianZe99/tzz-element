import { Button, Dropdown } from '@mariotzz/tzz-element';

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
  { key: '3', label: 'Action 3', disabled: true },
  { key: 'd1', type: 'divider' as const, label: '' },
  { key: '4', label: 'Danger Action', danger: true },
];

export default () => (
  <Dropdown items={items}>
    <Button>Hover me</Button>
  </Dropdown>
);
