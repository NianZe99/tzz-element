import { Select } from '@mariotzz/tzz-element';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Elderberry', value: 'elderberry' },
];

export default () => (
  <div style={{ maxWidth: 240 }}>
    <Select options={options} showSearch placeholder="Search fruit" />
  </div>
);
