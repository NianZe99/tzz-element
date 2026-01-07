import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
  >
    <Button size="sm" variant="primary">
      Small
    </Button>
    <Button size="md" variant="primary">
      Medium
    </Button>
    <Button size="lg" variant="primary">
      Large
    </Button>
    <Button size="md" block>
      Block Button
    </Button>
  </div>
);
