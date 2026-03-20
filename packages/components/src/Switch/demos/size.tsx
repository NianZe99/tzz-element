import { Switch } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Switch defaultChecked />
    <Switch defaultChecked size="small" />
  </div>
);
