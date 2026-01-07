import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
  >
    <Button asChild variant="link">
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Link asChild
      </a>
    </Button>

    <Button asChild variant="primary" disabled>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Disabled Link
      </a>
    </Button>
  </div>
);
