import { Upload } from '@mariotzz/tzz-element';

export default () => (
  <Upload.Dragger action="https://httpbin.org/post" multiple>
    <p>Click or drag file to this area to upload</p>
  </Upload.Dragger>
);
