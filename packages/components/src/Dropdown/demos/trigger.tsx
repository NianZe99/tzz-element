import { Button, Dropdown } from '@mariotzz/tzz-element';

const items = [
  { key: '1', label: 'Click Item 1' },
  { key: '2', label: 'Click Item 2' },
];

export default () => (
  <Dropdown items={items} trigger={['click']}>
    <Button>Click me</Button>
  </Dropdown>
);
