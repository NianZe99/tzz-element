import { Button, Dropdown } from '@mariotzz/tzz-element';

const items = [
  { key: '1', label: 'Item 1' },
  { key: '2', label: 'Item 2' },
];

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Dropdown items={items} placement="bottomLeft">
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown items={items} placement="bottomRight">
      <Button>bottomRight</Button>
    </Dropdown>
    <Dropdown items={items} placement="topLeft">
      <Button>topLeft</Button>
    </Dropdown>
  </div>
);
