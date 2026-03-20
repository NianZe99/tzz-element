import type { UploadFile } from '@mariotzz/tzz-element';
import { Button, Upload } from '@mariotzz/tzz-element';
import { useState } from 'react';

const defaultFiles: UploadFile[] = [
  {
    uid: '1',
    name: 'image.png',
    status: 'done',
    url: 'https://example.com/image.png',
  },
  {
    uid: '2',
    name: 'report.pdf',
    status: 'done',
    url: 'https://example.com/report.pdf',
  },
];

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFiles);

  return (
    <Upload
      action="https://httpbin.org/post"
      fileList={fileList}
      onChange={({ fileList: newList }) => setFileList(newList)}
    >
      <Button type="primary">Upload</Button>
    </Upload>
  );
};
