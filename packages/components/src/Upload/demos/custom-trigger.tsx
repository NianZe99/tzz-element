import { Upload } from '@mariotzz/tzz-element';

export default () => (
  <Upload action="https://httpbin.org/post" accept="image/*">
    <div
      style={{
        width: 104,
        height: 104,
        border: '1px dashed #d9d9d9',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#999',
        fontSize: 14,
        gap: 4,
      }}
    >
      <span style={{ fontSize: 24 }}>+</span>
      <span>Upload</span>
    </div>
  </Upload>
);
