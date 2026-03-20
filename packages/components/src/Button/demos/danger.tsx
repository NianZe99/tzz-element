import { Button } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Button type="primary" danger>
      Primary Danger
    </Button>
    <Button danger>Default Danger</Button>
    <Button type="dashed" danger>
      Dashed Danger
    </Button>
    <Button type="text" danger>
      Text Danger
    </Button>
    <Button type="link" danger>
      Link Danger
    </Button>
  </div>
);
