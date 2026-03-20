import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{
      background: 'rgb(190, 200, 200)',
      padding: 24,
      borderRadius: 8,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
    }}
  >
    <Button type="primary" ghost>
      Primary Ghost
    </Button>
    <Button ghost>Default Ghost</Button>
    <Button type="dashed" ghost>
      Dashed Ghost
    </Button>
    <Button type="primary" danger ghost>
      Danger Ghost
    </Button>
  </div>
);
