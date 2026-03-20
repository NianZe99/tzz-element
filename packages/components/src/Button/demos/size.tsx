import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Button type="primary" size="large">
      Large
    </Button>
    <Button type="primary" size="middle">
      Middle
    </Button>
    <Button type="primary" size="small">
      Small
    </Button>
  </div>
);
