import { Button, Space, message } from '@mariotzz/tzz-element';

export default () => (
  <Space>
    <Button onClick={() => message.success('Operation successful')}>
      Success
    </Button>
    <Button onClick={() => message.error('Something went wrong')}>Error</Button>
    <Button onClick={() => message.warning('This is a warning')}>
      Warning
    </Button>
    <Button onClick={() => message.info('Informational message')}>Info</Button>
    <Button onClick={() => message.loading('Loading...', 2.5)}>Loading</Button>
  </Space>
);
