import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button type="primary" asChild>
      <a href="https://github.com" target="_blank" rel="noreferrer">
        GitHub (asChild)
      </a>
    </Button>
    <Button type="primary" href="https://github.com" target="_blank">
      GitHub (href)
    </Button>
  </div>
);
