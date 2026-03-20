import { Select } from '@mariotzz/tzz-element';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

export default () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 240 }}
  >
    <Select options={options} size="large" placeholder="Large" />
    <Select options={options} size="middle" placeholder="Middle" />
    <Select options={options} size="small" placeholder="Small" />
  </div>
);
