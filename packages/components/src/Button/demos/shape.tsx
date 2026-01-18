import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
  >
    <Button variant="primary" shape="default">
      Default
    </Button>
    <Button variant="primary" shape="rounded">
      Rounded
    </Button>
    <Button variant="primary" shape="pill">
      Pill
    </Button>

    {/* 语法糖 rounded（等同 shape="rounded"） */}
    <Button variant="secondary" rounded>
      rounded=true
    </Button>
  </div>
);
