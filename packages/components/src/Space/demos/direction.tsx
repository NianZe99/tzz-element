import { Button, Space } from '@mariotzz/tzz-element';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
  </Space>
);
