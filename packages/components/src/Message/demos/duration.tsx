import { Button, Space, message } from '@mariotzz/tzz-element';

export default () => (
  <Space>
    <Button onClick={() => message.success('Closes in 1s', 1)}>1 second</Button>
    <Button onClick={() => message.info('Closes in 5s', 5)}>5 seconds</Button>
    <Button
      onClick={() =>
        message.loading({
          content: 'Manual close...',
          duration: 0,
          key: 'manual',
        })
      }
    >
      Manual close
    </Button>
    <Button onClick={() => message.destroy('manual')}>Close manual</Button>
  </Space>
);
