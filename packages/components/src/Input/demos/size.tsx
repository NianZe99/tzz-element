import { Input } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}
  >
    <Input size="large" placeholder="Large" />
    <Input size="middle" placeholder="Middle" />
    <Input size="small" placeholder="Small" />
  </div>
);
