import { Input } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}
  >
    <Input placeholder="Basic Input" />
    <Input placeholder="Disabled" disabled />
    <Input placeholder="Allow Clear" allowClear />
  </div>
);
