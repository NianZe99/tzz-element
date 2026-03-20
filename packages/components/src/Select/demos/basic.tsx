import { Select } from '@mariotzz/tzz-element';

const options = [
  { label: 'Jack', value: 'jack' },
  { label: 'Lucy', value: 'lucy' },
  { label: 'Tom', value: 'tom' },
  { label: 'Jerry (disabled)', value: 'jerry', disabled: true },
];

export default () => (
  <div style={{ maxWidth: 240 }}>
    <Select options={options} placeholder="Select a person" allowClear />
  </div>
);
