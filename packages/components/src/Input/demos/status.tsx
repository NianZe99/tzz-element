import { Input } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}
  >
    <Input status="error" placeholder="Error status" />
    <Input status="warning" placeholder="Warning status" />
  </div>
);
