import { Button, Tooltip } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Tooltip title="Hover trigger" trigger="hover">
      <Button>Hover</Button>
    </Tooltip>
    <Tooltip title="Click trigger" trigger="click">
      <Button>Click</Button>
    </Tooltip>
    <Tooltip title="Focus trigger" trigger="focus">
      <Button>Focus</Button>
    </Tooltip>
  </div>
);
