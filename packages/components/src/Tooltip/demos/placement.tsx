import { Button, Tooltip } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 60 }}>
    <Tooltip title="Top" placement="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip title="Bottom" placement="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip title="Left" placement="left">
      <Button>Left</Button>
    </Tooltip>
    <Tooltip title="Right" placement="right">
      <Button>Right</Button>
    </Tooltip>
  </div>
);
