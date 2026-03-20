import { TextArea } from '@mariotzz/tzz-element';

export default () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}
  >
    <TextArea placeholder="Basic TextArea" rows={4} />
    <TextArea placeholder="Auto-size" autoSize={{ minRows: 2, maxRows: 6 }} />
    <TextArea placeholder="With count" showCount maxLength={100} />
  </div>
);
