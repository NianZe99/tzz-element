import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link">Link</Button>
  </div>
);
