import { Card } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ background: '#f5f5f5', padding: 24, borderRadius: 8 }}>
    <Card title="No Border" bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
    </Card>
  </div>
);
