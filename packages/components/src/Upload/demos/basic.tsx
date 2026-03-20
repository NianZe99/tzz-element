import { Button, Upload } from '@mariotzz/tzz-element';

export default () => (
  <Upload action="https://httpbin.org/post">
    <Button type="primary">Click to Upload</Button>
  </Upload>
);
