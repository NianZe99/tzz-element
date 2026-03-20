import { Button, Space } from '@mariotzz/tzz-element';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Space size="small">
      <Button>Small</Button>
      <Button>Small</Button>
      <Button>Small</Button>
    </Space>
    <Space size="middle">
      <Button>Middle</Button>
      <Button>Middle</Button>
      <Button>Middle</Button>
    </Space>
    <Space size="large">
      <Button>Large</Button>
      <Button>Large</Button>
      <Button>Large</Button>
    </Space>
    <Space size={32}>
      <Button>Custom (32px)</Button>
      <Button>Custom (32px)</Button>
    </Space>
  </div>
);
