import { Button, message } from '@mariotzz/tzz-element';

export default () => (
  <Button
    type="primary"
    onClick={() => message.info('This is a normal message')}
  >
    Display Info
  </Button>
);
