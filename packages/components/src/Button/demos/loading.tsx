import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
  >
    <Button variant="primary" loading>
      Saving
    </Button>
    <Button variant="primary" loading loadingText="Saving...">
      Save
    </Button>
    <Button variant="secondary" loading spinnerPlacement="end">
      Loading End
    </Button>
    <Button disabled>Disabled</Button>
  </div>
);
